import { Router } from "express";
import { Table } from "../models/table.model";
import { Slot } from "../models/slot.model";

const tableRouter = Router();

tableRouter.get("", async (req, res) => {
  const allTables = await Table.find();
  res.send(allTables);
});

tableRouter.get("/:id", async (req, res) => {
  const allTables = await Table.findById(req.params.id)
    .populate("schema")
    .populate("slots")
    .populate("owner");
  res.send(allTables);
});

tableRouter.put("/:id", async (req, res) => {
  try {
    const table = await Table.findById(req.params.id).populate("slots");
    if (table) {
      table.slots = [...table.slots, req.body] as any;
      await table.save();
    }
    res.send(table);
  } catch (err) {
    res.send(err);
  }
});

tableRouter.post("", async (req, res) => {
  try {
    const table = new Table(req.body);
    const result = await table.save();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// tableRouter.post("/:id", async (req, res) => {
//   try {
//     const slot = new Slot({ date: Number(new Date()) });
//     const result = await slot.save();
//     res.send(slot);
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

export default tableRouter;
