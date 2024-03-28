import { push } from "@/lib/webpush";

export async function NotifyAll(subscriptions: any[], payload: string) {
  await Promise.all(
    subscriptions.map((subscription: { json_column: any }) =>
      push(subscription.json_column, payload),
    ),
  );
}
