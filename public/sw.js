console.log("Service worker loaded");
self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Push Received");
  self.registration.showNotification(data.title, {
    body: "ColdBreez",
    icon: "https://coldbreez.me/android-chrome-192x192.png",
    data: data,
  });
});
self.addEventListener("notificationclick", (event) => {
  const slug = event.notification.data.slug;
  self.clients.openWindow(`/news/${slug}`);
});
self.addEventListener("install", () => {
  console.log("service worker installed");
});

self.addEventListener("activate", () => {
  console.log("service worker activated");
});

self.addEventListener("message", (event) => {
  const { data } = event;
  if (data.type == "REQUEST") {
    console.log(`Requested data from main thread: ${data.data}`);
  }
  self.clients.matchAll().then((clients) => {
    console.log(clients);
    clients.forEach((client) => {
      client.postMessage({ type: "RESPONSE", data: "Hello from SW" });
    });
  });
});
