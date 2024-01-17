import { sql } from "@vercel/postgres";
import { push } from "@/lib/push-notification";
import { log } from "next-axiom";

export default async function handler(req, res) {
  if (req.method == "GET") {
    log.debug("web-notify", { test: "Testing web-notify"});
    res.status(200).json({});
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
      push(subscription.json_column, payload);
    })
  }
}
