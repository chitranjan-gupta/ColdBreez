import { AccessTokenGuard } from "middleware/auth";
import { CommentController } from "middleware/comment";

export default AccessTokenGuard(CommentController, "POST");
