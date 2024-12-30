import { Router } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";

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
  const encpass = await bcrypt.hash(req.body.password, 10);
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.send({});
    return;
  }
  const check = await bcrypt.compare(req.body.password, user.password);
  if (check) res.send(user);
  else res.send({});
});

export default authRouter;
