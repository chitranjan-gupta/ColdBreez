import bcrypt from "bcryptjs";
import { prisma } from "../../db";

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
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        refresh_tokens: {
          push: refresh_token,
        },
      },
    });
    return;
  }

  async replaceRefreshTokenByEmail(
    email: string,
    old_refresh_token: string,
    refresh_token: string,
  ) {
    const newhashedToken = refresh_token ? refresh_token : null;
    if (newhashedToken) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          refresh_tokens: true,
        },
      });
      const new_refresh_tokens = user.refresh_tokens.map((refresh_token) =>
        refresh_token == old_refresh_token ? newhashedToken : refresh_token,
      );
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          refresh_tokens: new_refresh_tokens,
        },
      });
    }
    return;
  }

  async removeRefreshTokenByEmail(email: string, old_refresh_token: string) {
    if (old_refresh_token) {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          refresh_tokens: true,
        },
      });
      const new_refresh_tokens = user.refresh_tokens.filter(
        (refresh_token) => refresh_token !== old_refresh_token,
      );
      await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          refresh_tokens: new_refresh_tokens,
        },
      });
    }
    return;
  }

  async findOneByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async isRefreshTokenPresent(email: string, old_refresh_token: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        refresh_tokens: true,
      },
    });
    if (user && user.refresh_tokens) {
      const index = user.refresh_tokens.findIndex(
        (refresh_token: string) => refresh_token == old_refresh_token,
      );
      if (index > -1) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async delete(user) {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        email: true,
      },
    });
    if (existingEmail && existingEmail.email) {
      await prisma.user.delete({
        where: {
          email: user.email,
        },
      });
      return {
        message: "USER_DELETED",
        tokens:{
          access_token: null,
          refresh_token: null
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
    const existingEmail = await prisma.user.findUnique({
      where: {
        email: newUser.email,
      },
      select: {
        email: true,
      },
    });

    if (existingEmail) {
      return {
        httperror: {
          statusCode: 422,
          message: "user with email already exists",
        },
      };
    }

    const existingUsername = await prisma.user.findUnique({
      where: {
        username: newUser.username,
      },
      select: {
        username: true,
      },
    });

    if (existingUsername) {
      return {
        httperror: {
          statusCode: 422,
          message: "user with username already exists",
        },
      };
    }

    const newPassword = await this.hashData(newUser.password);

    try {
      const user = await prisma.user.create({
        data: {
          email: newUser.email,
          name: newUser.name,
          username: newUser.username,
          password: newPassword,
        },
      });
      return {
        id: user.id,
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
