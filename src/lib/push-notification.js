import webpush from "web-push";
import { log } from 'next-axiom';

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:admin@coldbreez.me",
  publicVapidKey,
  privateVapidKey
);

export async function push(subscription, payload) {
  const result = await webpush.sendNotification(subscription, payload);
  log.debug("web-push", result);
}
