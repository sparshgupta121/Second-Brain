import { Request, Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { LinkModel } from "./linkModel";
import { createRandomHash } from "../../utils/constant";
import { ContentModel } from "../content/contentModel";

export const createSharedLink = async (req: CustomRequest, res: Response) => {
    try {
        const { share } = req.body;

        if(share) {
            // Create link, if share is true and link does not exist for user because i want to create only one link per user
            const existingLink = await LinkModel.findOne({ userId: req.userId });
            if(existingLink) {
                res.status(200).json({
                    success: true,
                    message: "Link shared successfully",
                    link: existingLink.hash
                });
                return;
            }

            const hash = createRandomHash(10);
            // console.log(`Hash: ${hash}`);
    
            const newLink = await LinkModel.create({
                userId: req.userId,
                hash
            });
    
            if(!newLink) {
                res.status(403).json({
                    success: false,
                    message: "Link not created"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Link shared successfully",
                link: newLink.hash
            });
        }
        else {
            // Remove link because share is false
            const deleteLink = await LinkModel.findOneAndDelete({
                userId: req.userId
            });

            if(!deleteLink) {
                res.status(403).json({
                    success: false,
                    message: "Link not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Link removed successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getSharedLink = async (req: Request, res: Response) => {
    try {
        const { sharedHash } = req.params;

        const link = await LinkModel.findOne({ hash: sharedHash });

        if(!link) {
            res.status(403).json({
                success: false,
                message: "Link not found"
            });
            return;
        }

        // I want to share my brain to someone, so i want to get my content
        const content = await ContentModel.find({ userId: link.userId })
            .populate({
                path: "userId",
                select: "username"
            })
        
        if(!content) {
            res.status(403).json({
                success: false,
                message: "Content not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Content found successfully",
            content: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const getAllSharedLinks = async (req: Request, res: Response) => {
    try {
        const sharedLinks = await LinkModel.find().populate({
                path: "userId",
                select: "username"
            });

        res.status(200).json({
            success: true,
            message: "Shared links fetched successfully",
            sharedLinks: sharedLinks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};