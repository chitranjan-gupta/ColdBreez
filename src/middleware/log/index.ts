export default class Log {
  constructor() {}
  info(string: string) {
    console.log(`[Info] ${string}`);
  }
  error(string: string) {
    console.error(`[Error] ${string}`);
  }
}
