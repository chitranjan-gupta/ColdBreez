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
    const hashedToken = await this.hashData(refresh_token);
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $push: { tokens: { refresh_token: hashedToken} } },
    );
    return;
  }

  async replaceRefreshTokenByEmail(email: string, refresh_token: string) {
    const hashedToken = await this.hashData(refresh_token);
    User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $push: { refresh_token: hashedToken } },
    );
    return;
  }

  async findOneByEmail(email: string) {
    return await User.findOne({ email });
  }

  async findUserBySelect(selects) {
    return await User.findOne(selects);
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
      this.logger.info(`user created successfully ${JSON.stringify(user)}`);
      return {
        id: user._id,
        email: user.email,
      };
    } catch (err) {
      this.logger.error(err);
    }
  }

  async comparePassword(enteredPassword: string, dbPassword: string) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }
}
