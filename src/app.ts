import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import expressWinston from "express-winston";
import winston from "winston";

import logger from "./config/logger";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    const logFormat = winston.format.printf(
      ({ level, message, timestamp, meta }) => {
        return `${timestamp} [${level}] ${message} ${
          meta ? JSON.stringify(meta) : ""
        }`;
      }
    );
    this.app.use(
      expressWinston.logger({
        winstonInstance: logger,
        format: winston.format.combine(winston.format.timestamp(), logFormat),
        msg: "{{req.method}} {{req.url}} - HTTP {{res.statusCode}}",
        expressFormat: false,
        colorize: false,
        statusLevels: true,
        meta: false, // ไม่ต้องแสดง meta แบบมากเหมือนเดิม
      })
    );
  }

  private setRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new App().app;
