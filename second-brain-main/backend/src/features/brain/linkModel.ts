import { model, Schema } from "mongoose";

const LinkSchema = new Schema(
    {
        hash: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true
        }
    }, 
    { timestamps: true }
);

export const LinkModel = model("Links", LinkSchema);