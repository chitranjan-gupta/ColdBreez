import { WEBSITE_TITLE } from "@/lib/name";
export default function handler(req, res) {
  res.status(200).json({ name: WEBSITE_TITLE });
}
