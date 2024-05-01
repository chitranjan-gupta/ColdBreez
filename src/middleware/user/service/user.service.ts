import bcrypt from "bcryptjs";
import { User } from "../model";

export default class UserService {
  private logger;

  constructor(logger) {
    this.logger = logger;
  }

  async hashData(token: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(token, salt);
  }

  async updateRefreshTokenByEmail(email: string, refresh_token: string) {
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $push: { tokens: { refresh_token: refresh_token } } },
    );
    return;
  }

  async replaceRefreshTokenByEmail(
    email: string,
    old_refresh_token: string,
    refresh_token: string,
  ) {
    const newhashedToken = refresh_token ? refresh_token : null;
    if (newhashedToken) {
      await User.findOneAndUpdate(
        {
          email: email.toLowerCase(),
          "tokens.refresh_token": old_refresh_token,
        },
        { $set: { "tokens.$.refresh_token": newhashedToken } },
      );
    }
    return;
  }

  async removeRefreshTokenByEmail(email: string, old_refresh_token: string) {
    if (old_refresh_token) {
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $pull: { tokens: { refresh_token: old_refresh_token } } },
      );
    }
    return;
  }

  async findOneByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findUserBySelect(selects) {
    return await User.findOne(selects);
  }

  async delete(user) {
    const existingEmail = await this.findOneByEmail(user.email);

    if (existingEmail && existingEmail.email) {
      await User.findOneAndDelete({ email: user.email });
      return {
        message: "USER_DELETED",
        tokens: {
          access_token: null,
          refresh_token: null,
        },
        httperror: {
          statusCode: undefined,
          message: undefined,
        },
      };
    } else {
      return {
        httperror: {
          statusCode: 404,
          message: "user with email doesn't exists",
        },
      };
    }
  }

  async create(newUser) {
    const { email } = newUser;
    const existingUser = await this.findOneByEmail(email.toLowerCase());
    if (existingUser) {
      return {
        httperror: {
          statusCode: 422,
          message: "user with email already exists",
        },
      };
    }

    const newPassword = await this.hashData(newUser.password);

    try {
      const user = new User({
        email: newUser?.email.toLowerCase(),
        name: newUser?.name.toLowerCase(),
        username: newUser?.username.toLowerCase(),
        password: newPassword,
      });
      await user.save();
      return {
        id: user._id,
        email: user.email,
        name: user.name
      };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async comparePassword(enteredPassword: string, dbPassword: string) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
