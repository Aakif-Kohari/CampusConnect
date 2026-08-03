self.addEventListener("push", (event) => {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || "CampusConnect Announcement";
    
    const options = {
      body: data.message,
      icon: "/favicon.png",
      badge: "/favicon.png",
      data: {
        url: data.url || "/",
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error("Error processing push event:", error);
    // Fallback if data is not JSON
    event.waitUntil(
      self.registration.showNotification("CampusConnect Announcement", {
        body: event.data.text(),
        icon: "/favicon.png",
        badge: "/favicon.png",
        data: { url: "/" }
      })
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  // This looks to see if the current is already open and focuses if it is
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // If so, just focus it.
        if (client.url.includes(urlToOpen) && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
