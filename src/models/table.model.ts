import { timeStamp } from "console";
import { model, Schema } from "mongoose";
import { SlotSchema } from "./slot.model";

const TableSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  schema: {
    type: Schema.Types.ObjectId,
    ref: "TableStyle",
  },
  slots: {
    default: [], // Ensure empty arrays are handled as the default
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Slot",
      },
    ],
    required: true, // Slots are optional
  },
});

export const Table = model("Table", TableSchema);
