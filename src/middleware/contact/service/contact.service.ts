import { Contact } from "../model";

export default class ContactService {
  private logger;

  constructor(logger) {
    this.logger = logger;
  }

  async submitForm(payload) {
    try {
      const contact = new Contact({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        policy: payload.policy,
      });
      await contact.save();
      return true;
    } catch (err) {
      this.logger.error(err);
      return false;
    }
  }
}
