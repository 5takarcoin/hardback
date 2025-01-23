import { Router } from "express";
import { User } from "../models/user.model";
import { authenticateJWT } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("", async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
});

userRouter.get("/profile", authenticateJWT, async (req, res) => {
  const doc = await User.findOne({
    username: (req as any).user.username,
  }).populate({
    path: "tables",
    populate: {
      path: "schema",
    },
  });
  res.status(200).send({ message: "Access granted", user: doc });
});

userRouter.get("/:id", async (req, res) => {
  const doc = await User.findOne({ username: req.params.id }).populate({
    path: "tables",
    populate: {
      path: "schema",
    },
  });

  res.send(doc);
});

userRouter.put("/:id", async (req, res) => {
  try {
    const doc = await User.findOne({ username: req.params.id });
    if (doc) {
      doc.tables = [...doc.tables, req.body.currTable];
      await doc.save();
      res.send({ message: "Table Assigned" });
    }
  } catch (error) {
    res.send(error);
  }
});

export default userRouter;
