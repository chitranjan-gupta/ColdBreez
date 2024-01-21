import { push } from "@/lib/webpush";

export async function NotifyAll(subscriptions, payload){
    await Promise.all(subscriptions.map(subscription => push(subscription.json_column, payload)));
}