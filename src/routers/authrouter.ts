import dotenv from "dotenv";
import { Router } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const authRouter = Router();

authRouter.get("/", (req, res) => {
  res.send("Current beda");
});

authRouter.post("/signup", async (req, res) => {
  try {
    const encpass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
      password: encpass,
    });
    await user.save();

    const token = jwt.sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 60 * 60 * 1000,
    });

    res.send({ token, message: "Signup Successful" });
  } catch (err) {
    console.log(err);
  }
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
      console.log(doc);
      const token = jwt.sign(
        { username: doc.username, userId: doc._id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 1000,
      });
      res.send({ token, message: "Login Successful" });
    } else {
      res.send({ message: "User not found" });
      return;
    }
  } catch (error) {
    res.send(error);
  }
});

authRouter.get("/logout", (req, res) => {
  res.cookie("token", " ", { maxAge: 1 });
  res.send({ message: "Logged out successfully" });
});

export default authRouter;
