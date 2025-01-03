import { Router } from "express";
import authRouter from "./authrouter";
import tableStyleRouter from "./tableStyleRouter";
import userRouter from "./userRouter";
import tableRouter from "./tablerouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/tableStyle", tableStyleRouter);
router.use("/user", userRouter);
router.use("/table", tableRouter);

export default router;
