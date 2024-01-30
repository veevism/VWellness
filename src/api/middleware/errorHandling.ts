import {createErrorResponse, GeneralError} from "../../util/helper";
import {NextFunction, Request, Response} from "express";

export function errorHandling(error : Error,req : Request, res: Response, next: NextFunction) {
    if (error instanceof GeneralError) {
        return res.status(error.status).json(createErrorResponse(error.message));
    }

    console.error('[Error]', error);
    return res.status(500).json(createErrorResponse('Internal Server Error'));
}
