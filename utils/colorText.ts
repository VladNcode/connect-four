export class ColorText {
  public static red(text: string) {
    return `\x1b[31m${text}\x1b[0m`;
  }

  public static yellow(text: string) {
    return `\x1b[33m${text}\x1b[0m`;
  }

  public static green(text: string) {
    return `\x1b[32m${text}\x1b[0m`;
  }

  public static blue(text: string) {
    return `\x1b[34m${text}\x1b[0m`;
  }

  public static magenta(text: string) {
    return `\x1b[35m${text}\x1b[0m`;
  }
}
