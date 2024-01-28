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