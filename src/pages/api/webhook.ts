import type { NextApiRequest, NextApiResponse } from "next";
import { NotifyAll } from "@/lib/push-notification";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
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
    NotifyAll(subscriptions.rows, payload)
      .then(() => {
        res.status(200).json({ status: "OK" });
      })
      .catch((reason) => {
        res.status(200).json({ status: `Not OK, ${reason}` });
      });
  }
}
