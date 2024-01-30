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
    public status: number;

    constructor(message: string, status?: number);
    constructor(status: number, message?: string);
    constructor(a: string | number, b?: string | number) {
        super(typeof a === 'string' ? a : b as string);

        if (typeof a === 'number') {
            this.status = a;
        } else {
            this.status = b as number;
        }
    }
}

export class InternalError extends Error {

    public status : number
    constructor(message : string) {
        super('Internal Server Error');
        this.status = 500;
    }
}

