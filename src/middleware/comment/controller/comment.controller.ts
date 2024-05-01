import type { Request, Response } from "../../types";
import Log from "../../log";
import ConfigService from "../../config";
import { CommentService } from "../service";
import { mongodbConnect } from "../../db";

const CommentController = async (req: Request, res: Response) => {
  const logger = new Log();
  const configService = new ConfigService();
  try {
    if (req.url) {
      const url = new URL(req.url, `https://${req.headers.host}`);
      switch (url.pathname) {
        case "/api/comment/create": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const commentService = new CommentService(logger);
          const response = await commentService.create(req.body);
          if (response) {
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          } else {
            return new Promise<void>((resolve) => {
              res.status(400).json({ message: "COMMENT_NOT_SAVED" });
              res.end();
              return resolve();
            });
          }
        }
        case "/api/comment/update": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const commentService = new CommentService(logger);
          const response = await commentService.update(req.body);
          if (response) {
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          } else {
            return new Promise<void>((resolve) => {
              res.status(404).json({ message: "COMMENT_NOT_PRESENT" });
              res.end();
              return resolve();
            });
          }
        }
        case "/api/comment/read": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const commentService = new CommentService(logger);
          const response = await commentService.read(req.body);
          if (response) {
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          } else {
            return new Promise<void>((resolve) => {
              res.status(404).json({ message: "COMMENT_NOT_PRESENT" });
              res.end();
              return resolve();
            });
          }
        }
        case "/api/comment/delete": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const commentService = new CommentService(logger);
          const response = await commentService.delete(req.body);
          if (response) {
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          } else {
            return new Promise<void>((resolve) => {
              res.status(404).json({ message: "COMMENT_NOT_PRESENT" });
              res.end();
              return resolve();
            });
          }
        }
        default: {
          return new Promise<void>((resolve) => {
            res.status(400).json({ message: "Something is fishy" });
            res.end();
            return resolve();
          });
        }
      }
    }
  } catch (err) {
    logger.error(err);
    return new Promise<void>((resolve) => {
      res.status(500).json({ message: "Error In Server Comment" });
      res.end();
      return resolve();
    });
  }
};

export default CommentController;
