import {createErrorResponse, GeneralError} from "../../util/helper";

export function errorHandling(error, req, res, next) {
    if (error instanceof GeneralError) {
        return res.status(error.status).json(createErrorResponse(error.message));
    }

    console.error('[Error]', error);
    return res.status(500).json(createErrorResponse('Internal Server Error'));
}
