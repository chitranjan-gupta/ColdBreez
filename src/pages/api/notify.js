import { sql } from "@vercel/postgres";
import { push } from "@/lib/push-notification";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const subscriptions = await sql`SELECT * FROM Subscriptions;`;
    subscriptions.rows.forEach((subscription) => {
      const payload = JSON.stringify({
        title: `New Notification`,
        data: {
          slug: `test`,
          category: `test`,
          subcategory: `test`,
        },
      });
      push(subscription.json_column, payload)
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(200).json({ err: err });
        });
    });
  }
}
