import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const user_schema = new Schema<TUser>(
  {
    name: { type: String, required: false, trim: true },

    phone: { type: String, required: true, unique: true, trim: true },

    photo: { type: String, trim: true, required: false },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      // make unique but allow multiple docs without email
      unique: true,
      sparse: true,
      match: [
        // simple RFC5322-ish check; tweak as needed
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email.",
      ],
      required: false,
    },

    location: { type: String, trim: true, required: false },

    isVerified: { type: Boolean, default: true },
    registerVerificationOtp: {
      type: Number,
      default: null,
    },
    registerOtpExpiresAt: {
      type: Date,
      default: null,
    },
    accountStatus: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
      default: "ACTIVE",
      index: true,
    },

    // soft-delete flag
    isDeleted: { type: Boolean, default: false, index: true },
  },
  { timestamps: true, versionKey: false }
);

export const User_Model = model("user", user_schema);
