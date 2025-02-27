import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRouter from "./features/user/routes";
import contentRouter from "./features/content/routes";
import brainRouter from "./features/brain/routes";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Server is running...</h1>");
});

app.use("/api/v0/user", userRouter);
app.use("/api/v0/content", contentRouter);
app.use("/api/v0/brain", brainRouter);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}`);
        });
    })

    .catch((error) => {
        console.log(`MongoDB connection failed ${error}`);
    })