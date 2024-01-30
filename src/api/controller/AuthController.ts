import {inject, injectable} from "inversify";
import {IWorkoutService} from "../../service/IWorkoutService";
import {TYPES} from "../type/type";
import {NextFunction, Request, Response} from "express";
import {IWorkout} from "../../model/Workout";
import {WorkoutArrayResponse, WorkoutResponse} from "../type/workoutType";
import {createSuccessResponse, GeneralError} from "../../util/helper";
import {IUser, User} from "../../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {AuthService} from "../../service/AuthService";
import {authRequest, AuthResponse} from "../type/authType";


export class AuthController {

    private authService : AuthService

    constructor(authService : AuthService) {
        this.authService = authService
    }

    public loginAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const auth: AuthResponse = await this.authService.loginAuth(email, password)
            if (!auth) {
                throw new GeneralError(`Can't Login`, 400)
            }
            return res.status(200).json(createSuccessResponse(auth, 'Login Successfully'));
        } catch (error) {
            next(error)
        }

    }

    public registerAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const { email, password, name } = req.body;
        try {
            const registerUser : IUser = await this.authService.registerAuth(email, password, name)
            if (!registerUser) {
                throw new GeneralError(400,"Can't Create User")
            }
            return res.status(200).json(createSuccessResponse(registerUser, 'Register Successfully'));
        } catch (error) {
            next (error)
        }
    }

    public refreshAuth = async (req: authRequest, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const {refresh_token}  = req;

            if (!refresh_token) {
                throw new GeneralError(400,"Refresh Token not found")
            }

            const auth: AuthResponse = await this.authService.refreshAuth(refresh_token);

            if (!auth) {
                throw new GeneralError(400,"Can't find user with this refresh token")
            }

            return res.status(200).json(createSuccessResponse(auth, 'Refresh Token Successful'));
        } catch (error) {
            next (error)
        }
    }


    // public logoutAuth = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    //
    //
    // }
    //
}