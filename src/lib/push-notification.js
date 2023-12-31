import webpush from "web-push";

export function push(subscription, payload) {
  const publicVapidKey =
    "BDxb3Jt4H0sZrPK_X3UyU9nthpQIVCml89qxbuMsqvbgXne6aj-h4eHS6DDfEsBcggJIRKPoL8dloDGjqL3LZF0";
  const privateVapidKey = process.env.NEXT_PUBLIC_VAPID_PRIVATE_KEY;

  webpush.setVapidDetails(
    "mailto:admin@coldbreez.me",
    publicVapidKey,
    privateVapidKey
  );

  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
}
