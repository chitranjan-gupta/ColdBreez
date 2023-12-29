export default function Index() {
  const publicVapidKey =
    "BDxb3Jt4H0sZrPK_X3UyU9nthpQIVCml89qxbuMsqvbgXne6aj-h4eHS6DDfEsBcggJIRKPoL8dloDGjqL3LZF0";
  async function send() {
    console.log("Registering service worker");
    const register = await navigator.serviceWorker.register("/worker.js", {
      scope: "/test",
    });
    console.log("Registed");
    console.log("Registering push");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: publicVapidKey,
    });
    console.log("push registered");
    console.log("sending push");
    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <>
      <button onClick={send}> Push not</button>
    </>
  );
}
