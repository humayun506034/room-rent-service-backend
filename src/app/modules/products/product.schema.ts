import { Schema, model, Document, Types } from "mongoose";
import { TReference, IImageLink } from "./product.interface";



interface IApartmentDoc extends Document {
  authorId: Types.ObjectId;

  listing_type: "Normal Apartment" | "Furnished Apartment";
  property_category: "Home" | "Office";

  property_size: number;
  about: string;

  city_name: string;
  neighborhood: string;
  distance_to_main_road: string;
  nearby_landmarks: string;

  images: IImageLink[];
  owner_name: string;
  owner_phone: string;
  references: TReference[];
  booking_dates?: string[];

  viewedBy: Types.ObjectId[];
  queryBy: Types.ObjectId[];

  bedrooms?: number;
  bathrooms?: number;
  monthly_rent?: number;
  advance_payment?: string;
  security_deposit?: string;

  property_features?: string[];
  building_amenities?: string[];

  office_rooms?: number;
  office_conference_rooms?: number;
  office_workstations?: number;

  minimum_stay_days?: number;
  maximum_stay_days?: number;
  daily_rate?: number;
  checkInTime?: string;
  checkOutTime?: string;

  house_rules?: string[];
  whats_included?: string[];

  // FIXED FIELD
  isApproved?: boolean;
}


// ----------------------------
// Reference Schema
// ----------------------------
const ReferenceSchema = new Schema<TReference>(
  {
    reference_name: { type: String, required: true },
    reference_phone: { type: String, required: true },
    reference_relationship: { type: String, required: true },
  },
  { _id: false }
);

// ----------------------------
// Image Schema
// ----------------------------
const ImageSchema = new Schema<IImageLink>({
  link: { type: String, required: true },
});



const ApartmentSchema = new Schema<IApartmentDoc>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

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

    property_size: { type: Number, required: true },
    about: { type: String, required: true },

    city_name: { type: String, required: true },
    neighborhood: { type: String, required: true },
    distance_to_main_road: { type: String, required: true },
    nearby_landmarks: { type: String, required: true },

    images: { type: [ImageSchema], required: true },

    owner_name: { type: String, required: true },
    owner_phone: { type: String, required: true },

    references: { type: [ReferenceSchema], required: true },

    booking_dates: { type: [String], default: [] },

    viewedBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    queryBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    // NEW FIXED FIELD
    isApproved: {
      type: Boolean,
      default: false,
    },

    bedrooms: Number,
    bathrooms: Number,
    monthly_rent: Number,
    advance_payment: String,
    security_deposit: String,

    property_features: {
      type: [String],
     
    },

    building_amenities: {
      type: [String],
    
    },

    office_rooms: Number,
    office_conference_rooms: Number,
    office_workstations: Number,

    minimum_stay_days: Number,
    maximum_stay_days: Number,
    daily_rate: Number,
    checkInTime: String,
    checkOutTime: String,

    house_rules: {
      type: [String],
     
    },

    whats_included: {
      type: [String],
      
    },
  },
  { timestamps: true }
);


export const Apartment = model<IApartmentDoc>("Apartment", ApartmentSchema);
