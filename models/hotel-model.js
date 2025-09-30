import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  airportCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  countryCode: {
    type: String,
    required: false,
  },
  highRate: {
    type: Number,
    required: false,
  },
  lowRate: {
    type: Number,
    required: false,
  },
  propertyCategory: {
    type: Number,
    required: false,
  },
  stateProvinceCode: {
    type: String,
    required: false,
  },
  thumbNailUrl: {
    type: String,
    required: false,
  },
  gallery: {
    type: Array,
    required: false,
  },
  overview: {
    type: String,
    required: false,
  },
  amenities: {
    type: Array,
    required: false,
  },
});

export const hotelModel =
  mongoose.models.hotels ?? mongoose.model("hotels", hotelSchema);
