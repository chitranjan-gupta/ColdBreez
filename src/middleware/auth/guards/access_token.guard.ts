import jwt from "jsonwebtoken";
import type { Request, Response } from "../../types";
import Log from "../../log";
import ConfigService from "../../config";

const AccessTokenGuard = (handler, method) => {
  return async (req: Request, res: Response) => {
    if (req.method !== method) {
      return new Promise<void>((resolve) => {
        res.status(405).json({ message: "Method Not Allowed" });
        res.end();
        return resolve();
      });
    }
    const logger = new Log();
    const configService = new ConfigService();
    try {
      const access_token = req.cookies.access_token;
      if (!access_token) {
        return new Promise<void>((resolve) => {
          res
            .status(401)
            .json({ message: "Unauthorized: No Access token provided" });
          res.end();
          return resolve();
        });
      }
      const data = jwt.verify(
        access_token,
        configService.get().auth.access_token_secret,
      );
      let user = {
        userId: (data as any).userId,
        email: (data as any).email,
        name: (data as any).name,
      };
      (req as any).user = user;
      return handler(req, res);
    } catch (err) {
      let statusCode = 500,
        message = "Error In Server Access";
      if (err instanceof jwt.TokenExpiredError) {
        statusCode = 401;
        message = "TOKEN_EXPIRED";
      } else if (err instanceof jwt.JsonWebTokenError) {
        statusCode = 401;
        message = "TOKEN_INVALID";
      } else if (err instanceof jwt.NotBeforeError) {
        statusCode = 401;
        message = "TOKEN_NOT_YET_INVALID";
      }
      logger.error(err);
      return new Promise<void>((resolve) => {
        res.status(statusCode).json({ message: message });
        res.end();
        return resolve();
      });
    }
  };
};

export default AccessTokenGuard;
