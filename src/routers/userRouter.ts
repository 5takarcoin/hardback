import { Router } from "express";
import { User } from "../models/user.model";

const userRouter = Router();

userRouter.get("", async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
});

userRouter.get("/:id", async (req, res) => {
  const doc = await User.findOne({ username: req.params.id }).populate(
    "currTable"
  );
  res.send(doc);
});

userRouter.put("/:id", async (req, res) => {
  const doc = await User.findOne({ username: req.params.id });
  if (doc) {
    doc.currTable = req.body.currTable;
    await doc.save();
  }
  res.send(doc);
});

export default userRouter;
