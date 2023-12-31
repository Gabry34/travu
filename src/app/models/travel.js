import mongoose, { Schema } from "mongoose";

const travelSchema = new Schema(
  {
    title: String,
    city: String,
    state: String,
    startDate: String,
    endDate: String,
    images: Array,
    description: String,
    travelPrice: String,
    daysDescriptions: Array,
    duration: String,
    userName: String,
    userEmail: String,
    userImage: String,
    userId: String,
  },
  {
    timestamps: true,
  }
);

const Travel = mongoose.models.Travel || mongoose.model("Travel", travelSchema);

export default Travel;
