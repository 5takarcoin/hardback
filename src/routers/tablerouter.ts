import { Router } from "express";
import { Table } from "../models/table.model";
import { Slot } from "../models/slot.model";

const tableRouter = Router();

tableRouter.get("", async (req, res) => {
  const allTables = await Table.find();
  res.send(allTables);
});

tableRouter.get("/:id", async (req, res) => {
  const allTables = await Table.findOne({ name: req.params.id });
  res.send(allTables);
});

tableRouter.post("", async (req, res) => {
  try {
    // const table = new Table(req.body);
    const table = new Table(req.body);
    const result = await table.save();
    res.send({ body: req.body, table });
  } catch (err) {
    res.send(err);
  }
});

tableRouter.post("/slot", async (req, res) => {
  try {
    const slot = new Slot({ date: Number(new Date()) });
    const result = await slot.save();
    res.send(slot);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default tableRouter;
