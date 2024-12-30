import { Router } from "express";
import authRouter from "./authrouter";
import tableRouter from "./tablerouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/table", tableRouter);

export default router;
