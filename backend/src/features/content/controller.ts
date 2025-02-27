import { Response } from "express";
import { CustomRequest } from "../middlewares/authMiddleware";
import { ContentModel } from "./contentModel";
import { TagModel } from "./tagModel";

export const createContent = async (req: CustomRequest, res: Response) => {
    try {
        const { title, link, tags, type, content } = req.body;

        let tagTitles: string[] = [];
        if(tags && tags.length !== 0) {
            // find existing tags
            const existingTags = await TagModel.find({ title: { $in: tags } });
            const existingTagNames = existingTags.map((tag) => tag.title);

            // filter out duplicate tags
            const newTagNames = tags.filter((tag: any) => !existingTagNames.includes(tag));

            // create new tags
            const newTags = await TagModel.insertMany(
                newTagNames.map((tag: any) => ({ title: tag }))
            );

            // Merge New and Old Tags
            tagTitles = [...existingTagNames, ...newTags.map((tag) => tag.title)];
        }

        const newContent = await ContentModel.create({
            title,
            link,
            tags: tagTitles,
            type,
            content,
            userId: req.userId
        });

        if(!newContent) {
            res.status(403).json({
                success: false,
                message: "Content not added"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Content added successfully",
            content: newContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export const getContent = async (req: CustomRequest, res: Response) => {
    try {
        const user = req.userId;

        const contents = await ContentModel.find({ userId: user }).populate(
            "userId",
            "username"
        );

        if(!contents) {
            res.status(403).json({
                success: false,
                message: "Contents not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Contents fetched successfully",
            contents: contents
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateContent = async (req: CustomRequest, res: Response) => {
    try {
        const { contentId, title, link, tags, type, content } = req.body;

        let tagTitles: string[] = [];
        if(tags && tags.length !== 0) {
            // find existing tags
            const existingTags = await TagModel.find({ title: { $in: tags } });
            const existingTagNames = existingTags.map((tag) => tag.title);

            // filter out duplicate tags
            const newTagNames = tags.filter((tag: any) => !existingTagNames.includes(tag));

            // create new tags
            const newTags = await TagModel.insertMany(
                newTagNames.map((tag: any) => ({ title: tag }))
            );

            // Merge New and Old Tags
            tagTitles = [...existingTagNames, ...newTags.map((tag) => tag.title)];
        }

        const updatedContent = await ContentModel.findOneAndUpdate(
            { _id: contentId, userId: req.userId },
            {
                $set: {
                    title,
                    link,
                    tags: tagTitles,
                    type,
                    content
                },
            },
        )

        if(!updatedContent) {
            res.status(403).json({
                success: false,
                message: "Content not updated"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Content updated successfully",
            updatedContent: updatedContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

export const deleteContent = async (req: CustomRequest, res: Response) => {
    try {
        const { contentId } = req.body;

        const deletedContent = await ContentModel.findOneAndDelete({ 
            _id: contentId, 
            userId: req.userId 
        })

        if(!deletedContent) {
            res.status(403).json({
                success: false,
                message: "Content not found"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Content deleted successfully",
            updatedContent: deletedContent
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};