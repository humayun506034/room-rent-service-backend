import { model, Schema } from "mongoose";
import { IPropertyFeature } from "./propertyFeatures.interface";

const PropertyFeatureSchema = new Schema<IPropertyFeature>(
  {
    featureName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PropertyFeature = model<IPropertyFeature>(
  "PropertyFeature",
  PropertyFeatureSchema
);