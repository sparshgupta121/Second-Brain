import { Router } from "express";
import { createSharedLink, getAllSharedLinks, getSharedLink } from "./controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const brainRouter = Router();

brainRouter.route("/share").post(isAuthenticated, createSharedLink);
brainRouter.route("/allSharedLinks").get(getAllSharedLinks);
brainRouter.route("/:sharedHash").get(getSharedLink);

export default brainRouter;