import { model, Schema } from "mongoose";
import { INeiborhood } from "./neiborhood.interface";

const NeiborhoodSchema = new Schema<INeiborhood>(
  {
    neiborhoodName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Neiborhood = model<INeiborhood>("Neiborhood", NeiborhoodSchema);
