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
        if(comments && comments.postId == payload.postId){
          const comment = new Comment({
            message: payload.message,
            postId: payload.postId,
            userId: payload.userId,
            parentId: payload.parentId
          });
          await comment.save();
          comments.children.push(comment._id);
          await comments.save();
        }
      } else {
        const comment = new Comment({
          message: payload.message,
          postId: payload.postId,
          userId: payload.userId,
        });
        await comment.save();
      }
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async update(payload) {
    try {
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async read(payload) {
    try {
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }

  async delete(payload) {
    try {
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }
}
