import { Schema, model, Document, Types } from "mongoose";
import { TReference, IImageLink } from "./product.interface";

// ----------------------------
// Document Interface
// ----------------------------
// interface IApartmentDoc extends Document {
//   authorId: Types.ObjectId;

//   listing_type: "Normal Apartment" | "Furnished Apartment";
//   property_category: "Home" | "Office";

//   property_size: number;
//   about: string;

//   city_name: string;
//   neighborhood: string;
//   distance_to_main_road: string;
//   nearby_landmarks: string;

//   images: IImageLink[];
//   owner_name: string;
//   owner_phone: string;
//   references: TReference[];
//   booking_dates?: string[];

//   // ✅ ONLY NEW FIELD
//   viewedBy: Types.ObjectId[];
//   queryBy: Types.ObjectId[];

//   bedrooms?: number;
//   bathrooms?: number;
//   monthly_rent?: number;
//   advance_payment?: string;
//   security_deposit?: string;

//   property_features?: ("Terrace" | "Parking Space" | "Air Conditioner")[];
//   building_amenities?: (
//     | "Semi-Furnished"
//     | "Water Included"
//     | "Furnished"
//     | "Electricity Included"
//     | "Utilities Included"
//     | "Maintenance Included"
//     | "Unfurnished"
//     | "Internet Included"
//   )[];

//   office_rooms?: number;
//   office_conference_rooms?: number;
//   office_workstations?: number;

//   minimum_stay_days?: number;
//   maximum_stay_days?: number;
//   daily_rate?: number;
//   checkInTime?: string;
//   checkOutTime?: string;

//   house_rules?: string[];
//   whats_included?: string[];
//   isApproved: {
//     type: Boolean;
//     required: false;
//   };
// }

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

  property_features?: ("Terrace" | "Parking Space" | "Air Conditioner")[];
  building_amenities?: (
    | "Semi-Furnished"
    | "Water Included"
    | "Furnished"
    | "Electricity Included"
    | "Utilities Included"
    | "Maintenance Included"
    | "Unfurnished"
    | "Internet Included"
  )[];

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

// ----------------------------
// Apartment Schema
// ----------------------------
// const ApartmentSchema = new Schema<IApartmentDoc>(
//   {
//     authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },

//     listing_type: {
//       type: String,
//       enum: ["Normal Apartment", "Furnished Apartment"],
//       required: true,
//     },
//     property_category: {
//       type: String,
//       enum: ["Home", "Office"],
//       required: true,
//     },

//     property_size: { type: Number, required: true },
//     about: { type: String, required: true },

//     city_name: { type: String, required: true },
//     neighborhood: { type: String, required: true },
//     distance_to_main_road: { type: String, required: true },
//     nearby_landmarks: { type: String, required: true },

//     images: { type: [ImageSchema], required: true },

//     owner_name: { type: String, required: true },
//     owner_phone: { type: String, required: true },

//     references: { type: [ReferenceSchema], required: true },

//     booking_dates: { type: [String], default: [] },

//     // ✅ ONLY ADDED FIELD
//     viewedBy: {
//       type: [Schema.Types.ObjectId],
//       ref: "User",
//       default: [],
//     },
//     queryBy: {
//       type: [Schema.Types.ObjectId],
//       ref: "User",
//       default: [],
//     },

//     bedrooms: Number,
//     bathrooms: Number,
//     monthly_rent: Number,
//     advance_payment: String,
//     security_deposit: String,

//     property_features: {
//       type: [String],
//       enum: ["Terrace", "Parking Space", "Air Conditioner"],
//     },

//     building_amenities: {
//       type: [String],
//       enum: [
//         "Semi-Furnished",
//         "Water Included",
//         "Furnished",
//         "Electricity Included",
//         "Utilities Included",
//         "Maintenance Included",
//         "Unfurnished",
//         "Internet Included",
//       ],
//     },

//     office_rooms: Number,
//     office_conference_rooms: Number,
//     office_workstations: Number,

//     minimum_stay_days: Number,
//     maximum_stay_days: Number,
//     daily_rate: Number,
//     checkInTime: String,
//     checkOutTime: String,

//     house_rules: {
//       type: [String],
//       enum: [
//         "No Smoking",
//         "No Pets",
//         "No Parties",
//         "Quiet Hours 10 PM - 7 AM",
//         "Guest Allowed",
//         "Suitable for Children",
//         "Suitable for Infants",
//         "Long-term Stays Welcome",
//       ],
//     },

//     whats_included: {
//       type: [String],
//       enum: [
//         "Bed",
//         "Sofa",
//         "Dining Table",
//         "Chairs",
//         "Wardrobe",
//         "TV",
//         "Refrigerator",
//         "Microwave",
//         "Washing Machine",
//         "Air Conditioner",
//         "Wi-Fi",
//         "Desk",
//         "Kitchen Utensils",
//         "Bedding",
//         "Towels",
//       ],
//     },
//   },
//   { timestamps: true }
// );


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
      enum: ["Terrace", "Parking Space", "Air Conditioner"],
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
      enum: [
        "No Smoking",
        "No Pets",
        "No Parties",
        "Quiet Hours 10 PM - 7 AM",
        "Guest Allowed",
        "Suitable for Children",
        "Suitable for Infants",
        "Long-term Stays Welcome",
      ],
    },

    whats_included: {
      type: [String],
      enum: [
        "Bed",
        "Sofa",
        "Dining Table",
        "Chairs",
        "Wardrobe",
        "TV",
        "Refrigerator",
        "Microwave",
        "Washing Machine",
        "Air Conditioner",
        "Wi-Fi",
        "Desk",
        "Kitchen Utensils",
        "Bedding",
        "Towels",
      ],
    },
  },
  { timestamps: true }
);


export const Apartment = model<IApartmentDoc>("Apartment", ApartmentSchema);
