import { sql } from "@vercel/postgres";
import { push } from "@/lib/push-notification";
import { withAxiom } from "next-axiom";

async function handler(req, res) {
  if (req.method == "GET") {
    req.log.info("web-notify api/notify");
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
    });
  }
}

export default withAxiom(handler);
