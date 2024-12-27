import { model, Schema } from "mongoose";

const TableSchema = new Schema({
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  slotTime: { type: Number, required: true },
  intervalTime: { type: Number, required: true },
});

export const Tables = model("Table", TableSchema);
