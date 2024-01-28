export function createSuccessResponse<T>(data: T, message: string) {
    return {
        success: true,
        data: data,
        msg: message
    };
}

export function createErrorResponse(message: string) {
    return {
        success: false,
        msg: message,
    };
}

export class GeneralError extends Error {

    public status : number
    constructor(status : number, message : string) {
        super(message);
        this.status = status;
    }
}

export class InternalError extends Error {

    public status : number
    constructor(message : string) {
        super('Internal Server Error');
        this.status = 500;
    }
}

