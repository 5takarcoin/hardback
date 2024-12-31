import { Router } from "express";
import { TableStyle } from "../models/tableStyle.model";

const tableRouter = Router();

tableRouter.get("", async (req, res) => {
  const allTableStyles = await TableStyle.find();
  res.send(allTableStyles);
});

tableRouter.get("/:id", async (req, res) => {
  const allTableStyles = await TableStyle.findOne({ name: req.params.id });
  res.send(allTableStyles);
});

tableRouter.post("", async (req, res) => {
  const table = new TableStyle(req.body);
  const result = await table.save();
  console.log(req.body);
  res.send(result);
});

export default tableRouter;
