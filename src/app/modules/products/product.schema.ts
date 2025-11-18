import mongoose, { Model, Schema } from "mongoose";
import { TApartment } from "./product.interface";

const ApartmentSchema: Schema<TApartment> = new Schema(
  {
    listing_type: {
      type: String,
      enum: ["Normal Apartment", "Furnished Apartment"],
      required: true,
    },
    property_category: {
      type: String,
      enum: ["Home", "Office"],
      required: true,
    },

    // Home fields
    bedrooms: { type: Number },
    bathrooms: { type: Number },

    // Office fields
    office_rooms: { type: Number },
    office_conference_rooms: { type: Number },
    office_workstations: { type: Number },

    property_size: { type: Number },
    about: { type: String, required: true },
    monthly_rent: { type: Number, required: true },
    advance_payment: { type: String, required: true },
    security_deposit: { type: String, required: true },
    city_name: { type: String, required: true },
    neighborhood: { type: String, required: true },
    distance_to_main_road: { type: String, required: true },
    nearby_landmarks: { type: String, required: true },
    property_features: {
      type: [String],
      enum: ["Terrace", "Parking Space", "Air Conditioner"],
      default: [],
    },
    building_amenities: {
      type: [String],
      enum: [
        "Semi-Furnished",
        "Water Included",
        "Furnished",
        "Electricity Included",
        "Utilities Included",
        "Maintenance Included",
        "Unfurnished",
        "Internet Included",
      ],
      default: [],
    },
  },
  { timestamps: true }
);
export const Apartment = mongoose.model<TApartment>(
  "Apartment",
  ApartmentSchema
);
