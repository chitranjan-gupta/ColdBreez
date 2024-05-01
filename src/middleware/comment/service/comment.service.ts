import { Comment } from "../model";

export default class CommentService {
  private logger;

  constructor(logger) {
    this.logger = logger;
  }

  async create(payload) {
    try {
      if (payload.parentId) {
        const comments = await Comment.findById(payload.parentId);
        if (comments && comments.postId == payload.postId) {
          const comment = new Comment({
            message: payload.message,
            postId: payload.postId,
            userId: payload.userId,
            parentId: payload.parentId,
          });
          await comment.save();
          comments.children.push(comment._id);
          await comments.save();
          return comments;
        }
      } else {
        const comment = new Comment({
          message: payload.message,
          postId: payload.postId,
          userId: payload.userId,
        });
        await comment.save();
        return comment;
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async update(payload) {
    try {
      if (payload.commentId) {
        const existingComment = await Comment.findById(payload.commentId);
        if (existingComment) {
          if (existingComment.userId == payload.userId) {
            const comment = await Comment.findOneAndUpdate(
              { _id: payload.commentId },
              { message: payload.message },
              { new: true },
            );
            return comment;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async read(payload) {
    try {
      if (payload.commentId && payload.postId) {
        const comment = await Comment.findOne({
          _id: payload.commentId,
          postId: payload.postId,
        }).populate("userId", "name");
        return comment;
      } else {
        const comments = await Comment.find({
          postId: payload.postId,
          parentId: null,
        })
          .populate("userId", "name")
          .sort({ updatedAt: -1 });
        return comments;
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async delete(payload) {
    try {
      if (payload.commentId) {
        const existingComment = await Comment.findById(payload.commentId);
        if (existingComment) {
          if (existingComment.userId == payload.userId) {
            if (payload.parentId) {
              await Comment.findOneAndUpdate(
                { _id: payload.parentId },
                { $pull: { children: payload.commentId } },
              );
            }
            const comment = await Comment.findOne({ _id: payload.commentId });
            if (comment) {
              await this.recursiveDelete(payload.commentId);
              return comment;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  private async recursiveDelete(commentId) {
    const comment = await Comment.findOne({ _id: commentId });
    if (comment) {
      if (comment.children && comment.children.length > 0) {
        for (let i = 0; i < comment.children.length; i++) {
          await this.recursiveDelete(comment.children[i]);
        }
      }
      return await Comment.findOneAndDelete({ _id: commentId });
    }
  }
}
