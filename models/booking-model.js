import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  hotelId: {
    type: ObjectId,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  checkin: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
});

export const bookingModel =
  mongoose.models.bookings ?? mongoose.model("bookings", bookingSchema);
