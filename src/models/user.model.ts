import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  currTable: {
    type: Schema.Types.ObjectId,
    ref: "Table",
  },
});

export const Users = model("User", UserSchema);
