import { sql } from "@vercel/postgres";
import { push } from "@/lib/push-notification";

export default async function handler(req, res) {
  if (req.method == "GET") {
    res.status(200).json({});
    const subscriptions = await sql`SELECT * FROM Subscriptions;`;
    subscriptions.rows.forEach((subscription) => {
      const payload = JSON.stringify({ title: "Push test" });
      push(subscription.json_column, payload);
    })
  }
}
