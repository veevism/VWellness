import {NextFunction, Request, Response} from "express";
import {createErrorResponse, GeneralError} from "../../util/helper";
import jwt from "jsonwebtoken";
import {IUser} from "../../model/User";
import {authRequest} from "../type/authType";

export function verifyAccessToken(req : authRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string,
            (err, decoded) => {
                if (err) {
                    next(new GeneralError("credential invalids", 403));
                }
                const userInfo : IUser = decoded as IUser;
                req.email = userInfo.email;
                req.access_token = token
                req.userId = userInfo.userId
                console.log("authenticate access token successful")
                next();
            }
        );
    } else {
        res.sendStatus(401);
    }

}
