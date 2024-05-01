import jwt, { JwtPayload } from "jsonwebtoken";

export default class AuthService {
  private usersService;
  private configService;
  private logger;

  constructor(usersService, configService, logger) {
    this.usersService = usersService;
    this.configService = configService;
    this.logger = logger;
  }

  async validateUserByPassword(payload) {
    const { email, password } = payload;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return {
        httperror: {
          statusCode: 404,
          message: "User with email not found.",
        },
      };
    }
    let isMatch = false;

    isMatch = await this.usersService.comparePassword(password, user.password);

    if (isMatch) {
      const data = await this.createToken(user);
      await this.usersService.updateRefreshTokenByEmail(
        user.email,
        data.tokens.refresh_token,
      );
      return {
        ...data,
        httperror: {
          statusCode: undefined,
          message: undefined,
        },
      };
    } else {
      return {
        httperror: {
          statusCode: 404,
          message: "User with email & password not found.",
        },
        tokens: {
          access_token: undefined,
          refresh_token: undefined,
        },
      };
    }
  }

  public async validateRefreshToken(payload) {
    const user = await this.usersService.findUserBySelect({
      email: payload.email,
      "tokens.refresh_token": payload.refresh_token,
    });
    if (!user) {
      return {
        httperror: {
          statusCode: 401,
          message: "Unauthorized",
        },
        tokens: {
          access_token: undefined,
          refresh_token: undefined,
        },
      };
    }
    delete user.password;
    const data = await this.refreshToken(user, payload.refresh_token);
    return {
      ...data,
      httperror: {
        statusCode: undefined,
        message: undefined,
      },
    };
  }

  public async logout(payload) {
    const user = await this.usersService.findUserBySelect({
      email: payload.email,
      "tokens.refresh_token": payload.refresh_token,
    });
    if (!user) {
      return {
        httperror: {
          statusCode: 401,
          message: "Unauthorized",
        },
        tokens: {
          access_token: undefined,
          refresh_token: undefined,
        },
      };
    }
    await this.usersService.removeRefreshTokenByEmail(
      payload.email,
      payload.refresh_token,
    );
    return {
      tokens: {
        access_token: null,
        refresh_token: null,
      },
    };
  }

  public async refreshToken(user, old_refresh_token) {
    const data = await this.createToken(user);
    await this.usersService.replaceRefreshTokenByEmail(
      user.email,
      old_refresh_token,
      data.tokens.refresh_token,
    );
    return data;
  }

  public async createToken(user) {
    const data: JwtPayload = {
      userId: user._id,
      email: user.email,
      name: user.name,
    };
    const access_token = jwt.sign(
      data,
      this.configService.get().auth.access_token_secret,
      {
        expiresIn: "2m",
      },
    );
    const refresh_token = jwt.sign(
      data,
      this.configService.get().auth.refresh_token_secret,
      {
        expiresIn: "1d",
      },
    );
    return {
      ...data,
      tokens: {
        access_token: access_token,
        refresh_token: refresh_token,
      },
    };
  }
}
