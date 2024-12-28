import { model, Schema } from "mongoose";

const TableSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  schema: {
    type: Schema.Types.ObjectId,
    ref: "TableStyle",
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],
});

export const Tables = model("Table", TableSchema);
