interface ApiResponse<T> {
    success: boolean;
    data: T;
    msg: string;
}

export type ErrorResponse = Omit<ApiResponse<null>, 'data'>;
export type SuccessResponse<T> = ApiResponse<T>;
