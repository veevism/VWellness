import {NextFunction, Request, Response} from 'express';
import {GeneralError} from "../../util/helper";

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
    next(new GeneralError(404, "Resource not found"));

}