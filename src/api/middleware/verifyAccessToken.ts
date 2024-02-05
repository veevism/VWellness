import {NextFunction, Request, Response} from "express";
import {createErrorResponse, GeneralError} from "../../util/helper";
import jwt from "jsonwebtoken";
import {IUser} from "../../model/User";
import {authRequest} from "../type/authType";

export function verifyRefreshToken(req : authRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        console.log(token)

        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET as string,
            (err, decoded) => {
                if (err) {
                    next(new GeneralError("credential invalids", 403));
                }
                const userInfo : IUser = decoded as IUser;
                console.log(userInfo)
                req.email = userInfo.email;
                req.refresh_token = token
                console.log("authenticate refresh token successful")
                next();
            }
        );
    } else {
        res.sendStatus(401);
    }

}
