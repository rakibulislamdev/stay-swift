import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  hotelId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
});

export const reviewModel =
  mongoose.models.reviews ?? mongoose.model("reviews", reviewSchema);
