import { Router } from "express";
import { checkAuth, logout, signin, signup } from "./controller";
import { isAuthenticated } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.route("/signup").post(signup);
userRouter.route("/signin").post(signin);
userRouter.route("/logout").get(isAuthenticated, logout);
userRouter.route("/checkAuth").get(isAuthenticated, checkAuth);

export default userRouter;