import { Router } from "express";
import { TableStyle } from "../models/tableStyle.model";

const tableStyleRouter = Router();

tableStyleRouter.get("", async (req, res) => {
  try {
    const allTableStyles = await TableStyle.find();
    res.send(allTableStyles);
  } catch (err) {
    res.send(err);
  }
});

tableStyleRouter.get("/:id", async (req, res) => {
  try {
    const allTableStyles = await TableStyle.findOne({ name: req.params.id });
    res.send(allTableStyles);
  } catch (err) {
    res.send(err);
  }
});

tableStyleRouter.post("", async (req, res) => {
  try {
    const table = new TableStyle(req.body);
    const result = await table.save();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

export default tableStyleRouter;
