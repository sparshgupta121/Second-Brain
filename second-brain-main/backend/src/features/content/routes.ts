import { Router } from "express";
import { createContent, deleteContent, getContent, updateContent } from "./controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const contentRouter = Router();

contentRouter.route("/create").post(isAuthenticated, createContent);
contentRouter.route("/get").get(isAuthenticated, getContent);
contentRouter.route("/update").put(isAuthenticated, updateContent);
contentRouter.route("/delete").delete(isAuthenticated, deleteContent);

export default contentRouter;