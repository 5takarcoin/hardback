import { model, Schema } from "mongoose";

const TableStyleSchema = new Schema({
  name: { type: String, required: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  slotTime: { type: Number, required: true },
  intervalTime: { type: Number, required: true },
});

export const TableStyle = model("TableStyle", TableStyleSchema);
