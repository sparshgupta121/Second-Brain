import { model, Schema } from "mongoose";

const TagSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        }
    }, 
    { timestamps: true }
);

export const TagModel = model("Tags", TagSchema);