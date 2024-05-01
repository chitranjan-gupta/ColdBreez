import type { Request, Response } from "../../types";
import Log from "../../log";
import { AuthService } from "../service";
import { UserService } from "../../user/service";
import ConfigService from "../../config";
import { Cookies } from "../../lib";
import { mongodbConnect } from "../../db";

const AuthController = async (req: Request, res: Response) => {
  const logger = new Log();
  const configService = new ConfigService();
  try {
    if (req.url) {
      const url = new URL(req.url, `https://${req.headers.host}`);
      switch (url.pathname) {
        case "/api/auth": {
          return new Promise<void>((resolve) => {
            res.status(200).json((req as any).user);
            res.end();
            return resolve();
          });
        }
        case "/api/auth/login": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const usersService = new UserService(logger);
          const authService = new AuthService(
            usersService,
            configService,
            logger,
          );
          const response = await authService.validateUserByPassword(req.body);
          if (response.httperror && response.httperror.statusCode) {
            return new Promise<void>((resolve) => {
              res
                .status(response.httperror.statusCode)
                .json({ message: response.httperror.message });
              res.end();
              return resolve();
            });
          } else {
            const cookies = new Cookies(req, res);
            cookies.set("access_token", response.tokens.access_token, {
              httpOnly: true,
              sameSite: "lax",
            });
            cookies.set("refresh_token", response.tokens.refresh_token, {
              httpOnly: true,
              sameSite: "lax",
            });
            delete response.httperror;
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          }
        }
        case "/api/auth/refresh": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const usersService = new UserService(logger);
          const authService = new AuthService(
            usersService,
            configService,
            logger,
          );
          const response = await authService.validateRefreshToken(
            (req as any).user,
          );
          if (response.httperror && response.httperror.statusCode) {
            return new Promise<void>((resolve) => {
              res
                .status(response.httperror.statusCode)
                .json({ message: response.httperror.message });
              res.end();
              return resolve();
            });
          } else {
            const cookies = new Cookies(req, res);
            cookies.set("access_token", response.tokens.access_token, {
              httpOnly: true,
              sameSite: "lax",
            });
            cookies.set("refresh_token", response.tokens.refresh_token, {
              httpOnly: true,
              sameSite: "lax",
            });
            delete response.httperror;
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          }
        }
        case "/api/auth/logout": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const usersService = new UserService(logger);
          const authService = new AuthService(
            usersService,
            configService,
            logger,
          );
          const response = await authService.logout((req as any).user);
          if (response.httperror && response.httperror.statusCode) {
            return new Promise<void>((resolve) => {
              res
                .status(response.httperror.statusCode)
                .json({ message: response.httperror.message });
              res.end();
              return resolve();
            });
          } else {
            const cookies = new Cookies(req, res);
            cookies.set("access_token", response.tokens.access_token, {
              httpOnly: true,
              sameSite: "lax",
            });
            cookies.set("refresh_token", response.tokens.refresh_token, {
              httpOnly: true,
              sameSite: "lax",
            });
            delete response.httperror;
            return new Promise<void>((resolve) => {
              res.status(200).json(response);
              res.end();
              return resolve();
            });
          }
        }
        default: {
          return new Promise<void>((resolve) => {
            res.status(401).json({ message: "Unauthorized Default" });
            res.end();
            return resolve();
          });
        }
      }
    }
  } catch (err) {
    logger.error(err);
    return new Promise<void>((resolve) => {
      res.status(500).json({ message: "Error In Server Auth" });
      res.end();
      return resolve();
    });
  }
};

export default AuthController;
