import {injectable} from "inversify";
import {GeneralError} from "../util/helper";
import {IUser, User} from "../model/User";
import bcrypt from "bcrypt";
import jwt, {JwtPayload, VerifyErrors} from "jsonwebtoken";
import {Request} from "express";
import {AuthResponse, jwtDecoded, userDataFormat} from "../api/type/authType";
import {UserResponse} from "../api/type/userType";


@injectable()
export class AuthService {

    constructor() {
    }

    public async loginAuth(email: string, password: string): Promise<AuthResponse> {

        try {
            if (!email || !password) {
                throw new GeneralError(400, `Email and password are required`)
            }

            const foundUser = await User.findOne({email: email}).exec();
            if (!foundUser) {
                throw new GeneralError(`Email doesn't match`, 404)
            }

            const match: boolean = await bcrypt.compare(password, foundUser.password);
            if (!match) {
                throw new GeneralError(`Password doesn't match`, 401)
            }

            const userData: userDataFormat = {
                email: foundUser.email,
                userId: foundUser.userId,
                name: foundUser.name
            }

            const access_token = jwt.sign(
                userData,
                process.env.ACCESS_TOKEN_SECRET as string,
                {expiresIn: "1d"}
            );

            const refresh_token = jwt.sign(
                userData,
                process.env.REFRESH_TOKEN_SECRET as string,
                {expiresIn: "5d"}
            );

            foundUser.refreshToken = refresh_token;
            await foundUser.save();

            return {
                auth: {
                    access_token: access_token,
                    refresh_token: refresh_token,
                }
            }

        } catch (error) {
            throw (error)
        }

    }

    public async registerAuth(email: string, password: string, name: string): Promise<UserResponse> {

        try {
            const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            if (!EMAIL_REGEX.test(email)) {
                throw new GeneralError(`Invalid email format`, 400)
            }

            if (!email || !password)
                throw new GeneralError(`Email and password are required`, 400);


            const duplicate = await User.findOne({email: email});
            if (duplicate) {
                throw new GeneralError(`Duplicate user`, 409);
            }

            const hashedPassword: string = await bcrypt.hash(password, 10);

            const newUser = {
                email: email,
                password: hashedPassword,
                name: name,
            };

            const user : IUser = await User.create(newUser)

            const userResponse: UserResponse = {
                email: user.email,
                name: user.name,
                points: user.points
            };

            return userResponse
        } catch (error) {
            throw error;
        }


    }

    public async refreshAuth(refresh_token: string): Promise<AuthResponse> {

        try {
            const foundUser = (await User.findOne({
                refreshToken: refresh_token
            }).exec()) as IUser;

            const decoded: JwtPayload | string = jwt.verify(
                refresh_token || "",
                process.env.REFRESH_TOKEN_SECRET as string) as jwtDecoded

            if (!decoded || !decoded.email) {
                throw new GeneralError("Invalid token payload", 403)
            }
            if (!foundUser || !foundUser.email) {
                throw new GeneralError("Can't find user from this refresh token", 403)
            }
            if (foundUser.email !== decoded.email) {
                throw new GeneralError("Invalid refresh token doesn't match", 403)
            }


            const userData: userDataFormat = {
                email: foundUser.email,
                userId: foundUser.userId,
                name: foundUser.name
            }
            const access_token = jwt.sign(
                userData,
                process.env.ACCESS_TOKEN_SECRET as string,
                {expiresIn: "1d"}
            );
            const new_refresh_token = jwt.sign(
                userData,
                process.env.REFRESH_TOKEN_SECRET as string,
                {expiresIn: "5d"}
            );
            foundUser.refreshToken = new_refresh_token;
            await foundUser.save();
            return {
                auth: {
                    access_token: access_token,
                    refresh_token: new_refresh_token,
                }
            }

        } catch (error) {
            throw (error)
        }

    }

    public async getUserProfile(userId: string): Promise<UserResponse> {
        try {
            const foundUser = await User.findOne({userId}).exec();
            if (!foundUser) {
                throw new GeneralError(`User not found`, 404);
            }

            return {
                email: foundUser.email,
                name: foundUser.name,
                points: foundUser.points
            };
        } catch (error) {
            throw error;
        }
    }
}