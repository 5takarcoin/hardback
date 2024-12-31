import { Router } from "express";
import authRouter from "./authrouter";
import tableRouter from "./tablerouter";
import userRouter from "./userRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/table", tableRouter);
router.use("/user", userRouter);

export default router;
