import { Request } from 'express';
import {IWorkout} from "../../model/Workout";

export interface authRequest extends Request {
    email?: string;
    refresh_token?: string;
}



export type AuthResponseFormat =  {
    access_token : string,
    refresh_token : string
}

export interface userDataFormat {
    email: string,
    userId: string,
    name: string
}
export interface AuthResponse {
    auth : AuthResponseFormat
}
export interface jwtDecoded  {
    userData: userDataFormat,
    iat: number,
    exp: number
}