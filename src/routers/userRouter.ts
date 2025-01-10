import { Router } from "express";
import { User } from "../models/user.model";
import { authenticateJWT } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("", async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
});

userRouter.get("/:id", async (req, res) => {
  const doc = await User.findOne({ username: req.params.id }).populate({
    path: "currTable",
    populate: {
      path: "schema",
    },
  });

  // const result = await doc?.currTable?.populate("schema")
  res.send(doc);
});

userRouter.put("/:id", async (req, res) => {
  try {
    const doc = await User.findOne({ username: req.params.id });
    if (doc) {
      doc.currTable = req.body.currTable;
      await doc.save();
      await doc.populate({
        path: "currTable",
        populate: {
          path: "schema",
        },
      });
    }
    res.send(doc);
  } catch (error) {
    res.send(error);
  }
});

// userRouter.get('/profile', authenticateJWT, (req, res) => {
//   res.status(200).json({ message: 'Access granted', user: req.user });
// });

export default userRouter;
