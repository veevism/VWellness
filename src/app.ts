import express, { Request, Response, NextFunction } from "express";
import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit';
import bodyParser from "body-parser";
import expressWinston from "express-winston";
import winston from "winston";
import helmet from 'helmet';

import workoutRoute from "./api/route/WorkoutRoute";

import logger from "./config/logger";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.app.use(helmet())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    const logFormat : winston.Logform.Format = winston.format.printf(
      ({ level, message, timestamp, meta }) : string => {
        return `${timestamp} [${level}] ${message} ${
          meta ? JSON.stringify(meta) : ""
        }`;
      }
    );
      const limiter : RateLimitRequestHandler = rateLimit({
          windowMs: 2 * 60 * 1000,
          limit: 100,
          message: "Too many requests from this IP, please try again after 2 minutes"
      });
    this.app.use(
      expressWinston.logger({
        winstonInstance: logger,
        format: winston.format.combine(winston.format.timestamp(), logFormat),
        msg: "{{req.method}} {{req.url}} - HTTP {{res.statusCode}}",
        expressFormat: false,
        colorize: false,
        statusLevels: true,
        meta: false,
      })
    );
    // this.app.use('/api/v1/workout', workoutRoute)
  }

  private setRoutes(): void {
      this.app.use('/api/v1/workout', workoutRoute)
  }
}

export default new App().app;
