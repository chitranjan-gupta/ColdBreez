import mongoose from "mongoose";
import CommentSchema from "../schema/comment.schema";

export default mongoose.models.Comment ||
  mongoose.model("Comment", CommentSchema);
