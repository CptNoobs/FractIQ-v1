self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const options = {
    body: data.message,
    icon: "/path/to/icon.png",
    badge: "/path/to/badge.png",
    data: data.data,
    actions: data.actions,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "view") {
    const urlToOpen = new URL("/journal", self.location.origin).href;
    event.waitUntil(
      clients.matchAll({ type: "window" }).then((windowClients) => {
        for (const client of windowClients) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      }),
    );
  }
});
