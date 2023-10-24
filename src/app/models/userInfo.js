import mongoose, { Schema } from "mongoose";

const userInfoSchema = new Schema(
  {
    email: String,
    image: String,
    biography: String,
  },
  {
    timestamps: true,
  }
);

const UserInfo =
  mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
