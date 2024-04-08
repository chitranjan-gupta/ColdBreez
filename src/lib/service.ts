export default async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    console.log("Checking for permission");
    const check = await requestPermission();
    if (!check) {
      return false;
    }
    console.log("Checking service is already registered or not");
    const registrations = await navigator.serviceWorker.getRegistrations();
    let installed = false;
    if (registrations.length > 0) {
      installed = registrations.some(function (registers) {
        return (
          registers.active &&
          registers.active.scriptURL ==
            `${window.location.origin}/serviceworker.js`
        );
      });
    }
    if (installed) {
      console.log("Service Worker already registered");
      return true;
    }
    console.log("Service worker starts loading");
    const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    console.log("Registering Service Worker");
    const registration = await navigator.serviceWorker.register(
      "/serviceworker.js",
      {
        scope: "/",
      },
    );
    registration.addEventListener("updatefound", (event) => {
      window.setTimeout(async () => {
        console.log("Registerd");
        console.log("Registering Push Notification");
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        console.log("Sending push");
        await fetch("/api/subscribe", {
          method: "POST",
          body: JSON.stringify(subscription),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }, 5000);
    });
    navigator.serviceWorker.addEventListener("message", async (event) => {
      const { data } = event;
      if (data.type === "RESPONSE") {
      }
    });
  } else {
    console.log("No service worker");
  }
}

async function requestPermission() {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      console.log("Notification permision is default. Asking for permission.");
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        return true;
      } else {
        console.log("Notification permission denied.");
        return false;
      }
    } else if (Notification.permission === "granted") {
      console.log("Notification permission already granted.");
      return true;
    } else {
      console.log("Notification permission denied.");
      return false;
    }
  } else {
    console.log("Notification not supported in this browser.");
    return false;
  }
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
