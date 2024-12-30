import { model, Schema } from "mongoose";

const TableStyleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  start: { type: Number, required: true },
  end: { type: Number, required: true },
  duration: { type: Number, required: true },
  interval: { type: Number, required: true },
});

export const TableStyle = model("TableStyle", TableStyleSchema);
