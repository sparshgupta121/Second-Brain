import mongoose from "mongoose";
import { MONGO_URI } from "../utils/constant";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected on Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`);
        process.exit(1);
    }
};