import webpush from "web-push";

const publicVapidKey = String(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);
const privateVapidKey = String(process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY);

webpush.setVapidDetails(
  "mailto:admin@coldbreez.me",
  publicVapidKey,
  privateVapidKey,
);

export async function push(
  subscription: webpush.PushSubscription,
  payload: string | Buffer,
) {
  await webpush.sendNotification(subscription, payload);
}
