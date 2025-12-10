import { model, Schema } from "mongoose";
import { IHouseRules } from "./houseRules.interface";

const HouseRulesSchema = new Schema<IHouseRules>(
  {
    rulesName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const HouseRules = model<IHouseRules>(
  "HouseRules",
  HouseRulesSchema
);