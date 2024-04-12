import mongoose from "mongoose";

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

const CommentSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
  children: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export default CommentSchema;
