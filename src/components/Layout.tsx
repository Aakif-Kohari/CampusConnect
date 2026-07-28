import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { createClient } from "@/lib/supabase/client";
import { ThemeProvider } from "@/components/theme-provider";
import TopProgressBar from "@/components/TopProgressBar";
import ShortcutsModal from "@/components/ShortcutsModal";
import { WebRTCProvider } from "@/components/VideoCall/WebRTCProvider";
import { OfflineBanner } from "@/components/OfflineBanner";

export default function Layout() {
  const location = useLocation();

  const [userId, setUserId] = useState<string | null>(null);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Maintain lightweight auth state
  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);

      if (event === "SIGNED_IN" && session) {
        const checkedKey = `device_checked_${session.user.id}`;
        if (!sessionStorage.getItem(checkedKey)) {
          supabase.functions
            .invoke("device-fingerprint-alert", {
              headers: {
                Authorization: `Bearer ${session.access_token}`,
              },
            })
            .then(({ data, error }) => {
              if (!error && data?.isNewDevice) {
                toast.warning(
                  `New Login Detected: Unrecognized device (${data.browser} on ${data.os}). We sent you a security email alert.`,
                );
              }
              if (!error) {
                sessionStorage.setItem(checkedKey, "true");
              }
            });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Track DAU
  useEffect(() => {
    if (!userId) return;

    const todayUTC = new Date().toISOString().split("T")[0];
    const storageKey = `session_recorded_${userId}`;

    if (localStorage.getItem(storageKey) !== todayUTC) {
      const supabase = createClient();

      supabase.rpc("record_daily_session").then(({ error }) => {
        if (!error) {
          localStorage.setItem(storageKey, todayUTC);
        }
      });
    }
  }, [location.pathname, userId]);

  // Keyboard shortcut (Shift + /)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "?") {
        event.preventDefault();
        setShortcutsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <WebRTCProvider>
          <OfflineBanner />
          <TopProgressBar />

          <ShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />

          <Outlet />
          <Toaster />
          <ScrollToTop />
        </WebRTCProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
