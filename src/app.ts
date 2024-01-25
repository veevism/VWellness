import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

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
  }

  private setRoutes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }
}

export default new App().app;
