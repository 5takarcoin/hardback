import { Router } from "express";
import authRouter from "./authrouter";

const router = Router();

router.use("/auth", authRouter);

export default router;
