// https://developer.mozilla.org/en-US/docs/Web/API/console
export interface Logger {
  debug(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}

export class ConsoleLogger implements Logger {
  debug(message?: any, ...optionalParams: any[]): void {
    console.debug(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]): void {
    console.error(message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  log(message?: any, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }

  trace(message?: any, ...optionalParams: any[]): void {
    console.trace(message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams);
  }
}
