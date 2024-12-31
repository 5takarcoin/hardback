import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    ref: "TableStyle",
  },
});

export const User = model("User", UserSchema);
