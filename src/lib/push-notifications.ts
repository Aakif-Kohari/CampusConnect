import { supabase } from "./supabase";

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully.");
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPushNotifications() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("Push notifications are not supported by the browser.");
  }

  const registration = await navigator.serviceWorker.ready;
  const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  if (!vapidPublicKey) {
    throw new Error("VAPID public key is missing.");
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  const subJSON = subscription.toJSON();
  if (!subJSON.endpoint || !subJSON.keys?.p256dh || !subJSON.keys?.auth) {
    throw new Error("Invalid subscription object created.");
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { error } = await supabase.from("push_subscriptions").upsert(
    {
      profile_id: user.id,
      endpoint: subJSON.endpoint,
      p256dh: subJSON.keys.p256dh,
      auth: subJSON.keys.auth,
    },
    { onConflict: "profile_id,endpoint" }
  );

  if (error) {
    throw error;
  }
  return true;
}

export async function unsubscribeFromPushNotifications() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return;
  }
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();

  if (subscription) {
    await subscription.unsubscribe();

    const subJSON = subscription.toJSON();
    if (subJSON.endpoint) {
      await supabase
        .from("push_subscriptions")
        .delete()
        .eq("endpoint", subJSON.endpoint);
    }
  }
}

export async function checkPushSubscription() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  return !!subscription;
}
