import { NextFunction, Request as ExpressRequest, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/constant";

export interface CustomRequest extends ExpressRequest {
    userId?: String;
}

export const isAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"];

        if(!token) {
            res.status(403).json({
                success: false,
                message: "User is not authenticated"
            });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if(decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                success: false,
                message: "You are not signed in"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};