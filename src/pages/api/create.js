// import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    // const result =
    //   await sql`CREATE TABLE Subscriptions ( id SERIAl PRIMARY KEY, json_column JSONB );`;
    return res.status(200).json({ status: "ok" });
  } catch (err) {
    return res.status(500).json({ err });
  }
}
