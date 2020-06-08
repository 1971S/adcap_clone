import { model, Schema } from "mongoose";
import { BusinessSchema } from "../../business/models/Business";

const UserSchema = new Schema(
  {
    money: Number,
    businesses: [BusinessSchema],
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
