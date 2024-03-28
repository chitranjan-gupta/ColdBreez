import type { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method == "POST") {
      const subscription = req.body;
      await sql`INSERT INTO Subscriptions (json_column) VALUES (${subscription});`;
      return res.status(200).json({ status: "OK" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
}
