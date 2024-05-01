import { AccessTokenGuard } from "middleware/auth";
import { CommentController } from "middleware/comment";
import { NextApiRequest, NextApiResponse } from "next";

export default function Handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    if (req.body) {
      if (req.body.userId) {
        if (req.body.userId == "661540dcc9dd75cc41f93879") {
          return CommentController(req, res);
        } else {
          return AccessTokenGuard(CommentController, "POST")(req, res);
        }
      }
    }
  } else {
    return new Promise<void>((resolve) => {
      res.status(405).json({ message: "Method Not Allowed" });
      res.end();
      return resolve();
    });
  }
}
