import type { Request, Response } from "../../types";
import Log from "../../log";
import ConfigService from "../../config";
import { ContactService } from "../service";
import { mongodbConnect } from "../../db";

const ContactController = async (req: Request, res: Response) => {
  const logger = new Log();
  const configService = new ConfigService();
  try {
    if (req.url) {
      const url = new URL(req.url, `https://${req.headers.host}`);
      switch (url.pathname) {
        case "/api/contact": {
          await mongodbConnect(configService.get().db.mongodb_url);
          const contactService = new ContactService(logger);
          const response = await contactService.submitForm(req.body);
          if (response) {
            return new Promise<void>((resolve) => {
              res.status(200).json({ message: "Successfully submitted." });
              res.end();
              return resolve();
            });
          } else {
            return new Promise<void>((resolve) => {
              res
                .status(500)
                .json({ message: "Error saving the contact form." });
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
      res.status(500).json({ message: "Error In Server Contact" });
      res.end();
      return resolve();
    });
  }
};

export default ContactController;
