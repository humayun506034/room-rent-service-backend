import { model, Schema } from "mongoose";
import { IBuildingAmenities } from "./buildingAmenities.interface";

const BuildingAmenitiesSchema = new Schema<IBuildingAmenities>(
  {
    amenitiesName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BuildingAmenities = model<IBuildingAmenities>(
  "BuildingAmenities",
  BuildingAmenitiesSchema
);