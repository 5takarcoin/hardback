import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tableStyle: {
    type: Schema.Types.ObjectId,
    ref: "Table",
  },
});

export const Users = model("User", UserSchema);
