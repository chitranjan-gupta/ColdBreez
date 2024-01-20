import { sql } from "@vercel/postgres";
import { push } from "@/lib/push-notification";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const payload = JSON.stringify({
      title: `${req.body.title}`,
      data: {
        slug: `${req.body.slug.current}`,
        category: `${req.body.categories[0]}`,
        subcategory: `${req.body.subcategories[0]}`,
      },
    });
    const subscriptions = await sql`SELECT * FROM Subscriptions;`;
    subscriptions.rows.forEach((subscription) => {
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
