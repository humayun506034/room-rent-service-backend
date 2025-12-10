import { model, Schema } from "mongoose";
import { IWhatsInclude } from "./whatsInclude.interface";

const WhatsIncludeSchema = new Schema<IWhatsInclude>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const WhatsInclude = model<IWhatsInclude>(
  "WhatsInclude",
  WhatsIncludeSchema
);