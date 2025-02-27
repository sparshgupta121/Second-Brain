import { model, Schema } from "mongoose";
import { ContentTypes } from "../../utils/constant";

const ContentSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
        },
        type: {
            type: String,
            required: true,
            enum: ContentTypes
        },
        tags: [{
            type: String,
        }],
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        content: {
            type: String
        },
    }, 
    { timestamps: true }
);

export const ContentModel = model("Contents", ContentSchema);