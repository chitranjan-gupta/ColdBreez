import type { NextApiRequest, NextApiResponse } from "next";
import { NotifyAll } from "@/lib/push-notification";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "GET") {
    const subscriptions = await sql`SELECT * FROM Subscriptions;`;
    const payload = JSON.stringify({
      title: `New Notification`,
      data: {
        slug: `test`,
        category: `test`,
        subcategory: `test`,
      },
    });
    NotifyAll(subscriptions.rows, payload)
      .then(() => {
        res.status(200).json({ status: "OK" });
      })
      .catch((reason) => {
        res.status(200).json({ status: "Not OK" });
      });
  }
}
