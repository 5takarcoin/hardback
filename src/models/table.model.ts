import { timeStamp } from "console";
import { model, Schema } from "mongoose";
import { SlotSchema } from "./slot.model";

const TableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  schema: {
    type: Schema.Types.ObjectId,
    ref: "TableStyle",
  },
  slots: [SlotSchema],
  weekly: [SlotSchema],
});

export const Table = model("Table", TableSchema);
