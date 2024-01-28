import express, { Request, Response, NextFunction } from "express";
import rateLimit, {RateLimitRequestHandler} from 'express-rate-limit';
import bodyParser from "body-parser";
import expressWinston from "express-winston";
import winston from "winston";
import helmet from 'helmet';
import cors from "cors";

import workoutRoute from "./api/route/WorkoutRoute";

import logger from "./config/logger";

import {errorHandling} from "./api/middleware/errorHandling";
import {routeNotFound} from "./api/middleware/routeNotFound";
import {credentials} from "./api/middleware/credential";
import corsOptions from "./config/corsOptions";


class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
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

    this.app.use(helmet())
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

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


    this.app.use(
    limiter
    )

    this.app.use(credentials)
    this.app.use(cors(corsOptions))
    // this.app.use('/api/v1/workout', workoutRoute)
  }

  private setRoutes(): void {
      this.app.use('/api/v1/workout', workoutRoute)

      this.app.use(
          routeNotFound
      )
      this.app.use(
          errorHandling
      )
  }
}

export default new App().app;
