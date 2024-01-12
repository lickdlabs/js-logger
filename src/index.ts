import * as crypto from "crypto";
import winston from "winston";

type TLogger = {
  defaultMeta: {
    originId?: string;
  };
};

export { Logger } from "winston";

export const createLogger = (config?: TLogger): winston.Logger =>
  winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    defaultMeta: {
      traceId: crypto.randomUUID(),
      ...config?.defaultMeta,
    },
    transports: [new winston.transports.Console()],
  });
