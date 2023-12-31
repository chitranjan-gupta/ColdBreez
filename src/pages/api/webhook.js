import { sql } from "@vercel/postgres";
import { push } from "@/lib/push-notification";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const payload = JSON.stringify({ title: `${req.body.title}`, slug: `${req.body.slug.current}` });
    res.status(200).json({});
    const subscriptions = await sql`SELECT * FROM Subscriptions;`;
    subscriptions.rows.forEach((subscription) => {
      push(subscription.json_column, payload);
    });
  }
}
