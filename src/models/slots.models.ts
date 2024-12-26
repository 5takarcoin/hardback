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
  infos: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Slots = model("Slot", SlotSchema);
