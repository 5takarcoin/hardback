import { Router } from "express";
import { TableStyle } from "../models/tableStyle.model";

const tableStyleRouter = Router();

tableStyleRouter.get("", async (req, res) => {
  const allTableStyles = await TableStyle.find();
  res.send(allTableStyles);
});

tableStyleRouter.get("/:id", async (req, res) => {
  const allTableStyles = await TableStyle.findOne({ name: req.params.id });
  res.send(allTableStyles);
});

tableStyleRouter.post("", async (req, res) => {
  const table = new TableStyle(req.body);
  const result = await table.save();
  res.send(result);
});

export default tableStyleRouter;
