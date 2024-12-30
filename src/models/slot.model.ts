import { model, Schema } from "mongoose";

const InfoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

const SlotSchema = new Schema({
  date: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
  },
  // infos: [InfoSchema],
  infos: [String],
});

export const Slot = model("Slot", SlotSchema);
