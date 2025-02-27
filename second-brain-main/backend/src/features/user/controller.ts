import { Request, Response } from "express";
import { UserModel } from "./userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/constant";

export const signup = async (req: Request, res: Response) => {
    try {
        // zod validation
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if(user) {
            res.status(403).json({
                success: false,
                message: "User already exist"
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.create({
            username,
            password: hashedPassword
        });

        if(!newUser) {
            res.status(403).json({
                success: false,
                message: "User creation failed"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "User signed up successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if(!user) {
            res.status(403).json({
                success: false,
                message: "User not found"
            });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            res.status(411).json({
                success: false,
                message: "Password is incorrect"
            });
            return;
        }

        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const logout = async (req: Request, res: Response ) => {
    try {
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const checkAuth = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            isAuthenticated: true,
            message: "User is authenticated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            isAuthenticated: false,
            message: "Internal server error"
        });
    }
};