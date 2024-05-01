import jwt from "jsonwebtoken";
import type { Request, Response } from "../../types";
import Log from "../../log";
import ConfigService from "../../config";

const RefreshTokenGuard = (handler, method) => {
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
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token) {
        return new Promise<void>((resolve) => {
          res
            .status(401)
            .json({ message: "Unauthorized: No Refresh token provided" });
          res.end();
          return resolve();
        });
      }
      const verifyRefreshToken = jwt.verify(
        refresh_token,
        configService.get().auth.refresh_token_secret,
      ) as jwt.JwtPayload;
      let user = {
        userId: verifyRefreshToken.userId,
        email: verifyRefreshToken.email,
        name: verifyRefreshToken.name,
        refresh_token: refresh_token,
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

export default RefreshTokenGuard;
