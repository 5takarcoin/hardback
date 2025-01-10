import dotenv from "dotenv";
import { Router } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Current beda");
});

authRouter.post("/signup", async (req, res) => {
  const encpass = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    ...req.body,
    password: encpass,
  });
  const result = await user.save();
  res.send(user);
});

authRouter.post("/login", async (req, res) => {
  try {
    const doc = await User.findOne({ username: req.body.username });
    if (doc) {
      const check = await bcrypt.compare(req.body.password, doc.password);
      if (!check) {
        res.send({ message: "Wrong Password" });
        return;
      }
      await doc.populate({
        path: "currTable",
        populate: {
          path: "schema",
        },
      });
      const token = jwt.sign(
        { username: doc.username },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );
      // res.cookie('Bearer')
      res.send({ token, message: "Login Successful" });
    } else {
      res.send({ message: "User not found" });
      return;
    }
  } catch (error) {
    res.send(error);
  }
});

export default authRouter;
