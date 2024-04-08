export default class ConfigService {
  constructor() {}
  get() {
    return {
      auth: {
        access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      },
      db: {
        mongodb_url: process.env.MONGODB_URL,
      },
    };
  }
}
