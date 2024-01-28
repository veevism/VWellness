import {NextFunction } from 'express';
import {GeneralError} from "../../util/helper";

export function routeNotFound(next: NextFunction) {
    next(new GeneralError(404, "Resource not found"));

}