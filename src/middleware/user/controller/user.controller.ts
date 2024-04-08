import type { Request, Response } from "../../types";
import { UserService } from "../service";
import ConfigService from "../../config";
import Log from "../../log";
import { mongodbConnect } from "../../db";

const UserController = async (req: Request, res: Response) => {
  const logger = new Log();
  const configService = new ConfigService();
  try {
    if (req.url) {
      const url = new URL(req.url, `https://${req.headers.host}`);
      switch (url.pathname) {
        case "/api/user": {
          return new Promise<void>((resolve) => {
            res
              .status(200)
              .json({ message: "OK" });
            res.end();
            return resolve();
          });
        }
        case "/api/user/register": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const usersService = new UserService(logger);
          const response = await usersService.create(req.body);
          if (response.httperror) {
            return new Promise<void>((resolve) => {
              res
                .status(response.httperror.statusCode)
                .json({ message: response.httperror.message });
              res.end();
              return resolve();
            });
          } else {
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          }
        }
        default: {
          return new Promise<void>((resolve) => {
            res
              .status(200)
              .json({ message: "OK Default" });
            res.end();
            return resolve();
          });
        }
      }
    }
  } catch (err) {
    logger.error(err);
    return new Promise<void>((resolve) => {
      res.status(500).json({ message: "Error In Server User" });
      res.end();
      return resolve();
    });
  }
};

export default UserController;
