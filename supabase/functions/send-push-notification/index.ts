/**
 * Supabase Edge Function: Send Push Notification
 *
 * Handles both direct message notifications (to a specific user)
 * and campus-wide announcements (to all users, requiring admin access).
 */

// @ts-ignore: Deno imports
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore: Deno imports
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// @ts-ignore: Deno imports
import webpush from "https://esm.sh/web-push@3.6.0";

declare const Deno: any;

// Initialize Supabase client with service role key for admin access
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Configure web-push with VAPID details
const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY")!;
const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY")!;
const vapidSubject = Deno.env.get("VAPID_SUBJECT") || "mailto:admin@campusconnect.com";

webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));

    // -------------------------------------------------------------------------
    // DM Notification Branch (requires user_id)
    // -------------------------------------------------------------------------
    if (body.user_id) {
      const { user_id, message, sender_name } = body;

      if (!message) {
        return new Response(JSON.stringify({ error: "message is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fetch all push subscriptions for the target user
      const { data: subscriptions, error: fetchError } = await supabase
        .from("push_subscriptions")
        .select("endpoint, p256dh, auth")
        .eq("user_id", user_id);

      if (fetchError || !subscriptions) {
        console.error("Error fetching subscriptions:", fetchError);
        return new Response(JSON.stringify({ error: "Failed to fetch user subscriptions" }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (subscriptions.length === 0) {
        return new Response(
          JSON.stringify({ success: true, message: "No subscriptions found for user" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Construct the push payload
      const payload = JSON.stringify({
        title: `New message from ${sender_name || "CampusConnect"}`,
        body: message,
        icon: "/icon-192x192.png",
        data: { url: "/messages" },
        tag: "campusconnect-dm",
      });

      // Send push notification to all active endpoints
      const sendPromises = subscriptions.map(async (sub: any) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        try {
          await webpush.sendNotification(pushSubscription as any, payload);
          return { success: true, endpoint: sub.endpoint };
        } catch (err: any) {
          if (err.statusCode === 410 || err.statusCode === 404) {
            await supabase.from("push_subscriptions").delete().eq("endpoint", sub.endpoint);
          }
          console.error(`Failed to send push to ${sub.endpoint}:`, err);
          return { success: false, endpoint: sub.endpoint, error: err.message };
        }
      });

      const results = await Promise.all(sendPromises);
      const successCount = results.filter((r: any) => r.success).length;

      return new Response(
        JSON.stringify({
          success: true,
          message: `Sent to ${successCount} of ${subscriptions.length} devices`,
          details: results,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // -------------------------------------------------------------------------
    // Campus Announcement Branch (requires title and message)
    // -------------------------------------------------------------------------
    else if (body.title && body.message) {
      const { title, message, url } = body;

      // Authorize admin
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      // Verify JWT using the caller's auth context
      const jwt = authHeader.replace("Bearer ", "");
      const { data: userData, error: userError } = await supabase.auth.getUser(jwt);

      if (userError || !userData.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check if the user is an admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        return new Response(JSON.stringify({ error: "Forbidden: Admin access required" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Fetch all push subscriptions globally
      const { data: subscriptions, error: subError } = await supabase
        .from("push_subscriptions")
        .select("*");

      if (subError) {
        throw new Error(`Failed to fetch subscriptions: ${subError.message}`);
      }

      const payload = JSON.stringify({
        title,
        message,
        url: url || "/dashboard",
      });

      const results = await Promise.allSettled(
        (subscriptions || []).map(async (sub: any) => {
          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          };

          try {
            await webpush.sendNotification(pushSubscription as any, payload);
            return { status: "success", endpoint: sub.endpoint };
          } catch (error: any) {
            if (error.statusCode === 410 || error.statusCode === 404) {
              await supabase
                .from("push_subscriptions")
                .delete()
                .eq("endpoint", sub.endpoint);
              return { status: "removed", endpoint: sub.endpoint };
            }
            console.error("Push Error for", sub.endpoint, error);
            return { status: "error", endpoint: sub.endpoint, error: error.message };
          }
        })
      );

      const successCount = results.filter((r) => r.status === "fulfilled" && r.value.status === "success").length;
      const removedCount = results.filter((r) => r.status === "fulfilled" && r.value.status === "removed").length;
      const errorCount = results.filter((r) => r.status === "fulfilled" && r.value.status === "error").length;

      return new Response(
        JSON.stringify({
          success: true,
          message: "Push notifications processed",
          successCount,
          removedCount,
          errorCount,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } 
    
    // -------------------------------------------------------------------------
    // Invalid Payload
    // -------------------------------------------------------------------------
    else {
      return new Response(JSON.stringify({ error: "Invalid payload format. Expected DM payload or Announcement payload." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: unknown) {
    console.error("send-push-notification error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
