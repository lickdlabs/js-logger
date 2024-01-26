import { Console } from "console";

enum ELevel {
  DEBUG = "debug",
  ERROR = "error",
  INFO = "info",
  LOG = "log",
  TRACE = "trace",
  WARN = "warn",
}

type TLog = {
  datetime: string;
  level: ELevel;
  [key: string]: any;
  error?: {
    name: string;
    message: string;
    stack?: string;
    cause?: unknown;
  };
};

export interface ILogger {
  debug(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}

export class ConsoleLogger implements ILogger {
  private console!: Console;

  constructor() {
    this.console = new Console({
      stdout: process.stdout,
      stderr: process.stderr,
    });
  }

  public dynamic?: () => Record<string, any> = () => ({});

  debug(message?: any, ...optionalParams: any[]): void {
    this.generateLog(ELevel.DEBUG, message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    this.generateLog(ELevel.ERROR, message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]): void {
    this.generateLog(ELevel.INFO, message, ...optionalParams);
  }

  log(message?: any, ...optionalParams: any[]): void {
    this.generateLog(ELevel.LOG, message, ...optionalParams);
  }

  trace(message?: any, ...optionalParams: any[]): void {
    this.generateLog(ELevel.TRACE, message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]): void {
    this.generateLog(ELevel.WARN, message, ...optionalParams);
  }

  private generateLog(
    level: ELevel,
    message?: any,
    ...optionalParams: any[]
  ): void {
    let log: TLog = {
      datetime: new Date().toJSON(),
      level,
      ...(this.dynamic ? this.dynamic() : {}),
      ...(typeof message === "string" ? { message } : message),
    };

    let index = 0;
    let error: Error | undefined;
    optionalParams.forEach((item) => {
      if (item instanceof Error) {
        error = item;
      } else if (typeof item === "string") {
        log[`message${++index}`] = item;
      } else {
        log = { ...log, ...item };
      }
    });

    if (error instanceof Error) {
      log.level = ELevel.ERROR;
      log.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: this.isErrorWithCause(error) ? error.cause : undefined,
      };
    }

    this.console[log.level](JSON.stringify(log));
  }

  private isErrorWithCause(error: Error): error is Error & { cause: unknown } {
    return "cause" in error;
  }
}
