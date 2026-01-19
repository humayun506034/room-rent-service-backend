import { model, Schema } from "mongoose";
import { ICity } from "./city.interface";

const CitySchema = new Schema<ICity>(
  {
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const City = model<ICity>("City", CitySchema);
