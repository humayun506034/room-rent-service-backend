import { Types } from "mongoose";

// ----------------------------
// Reference & Image Types
// ----------------------------
export type TReference = {
  reference_name: string;
  reference_phone: string;
  reference_relationship: string;
};

export interface IImageLink {
  _id?: Types.ObjectId;
  link: string;
}

// ----------------------------
// Extras for Furnished Apartment
// ----------------------------
export type TWhatsIncluded =
  | "Bed"
  | "Sofa"
  | "Dining Table"
  | "Chairs"
  | "Wardrobe"
  | "TV"
  | "Refrigerator"
  | "Microwave"
  | "Washing Machine"
  | "Air Conditioner"
  | "Wi-Fi"
  | "Desk"
  | "Kitchen Utensils"
  | "Bedding"
  | "Towels";

export type THouseRules =
  | "No Smoking"
  | "No Pets"
  | "No Parties"
  | "Quiet Hours 10 PM - 7 AM"
  | "Guest Allowed"
  | "Suitable for Children"
  | "Suitable for Infants"
  | "Long-term Stays Welcome";

// ----------------------------
// Base Apartment
// ----------------------------
interface IBaseApartment {
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

  // ✅ ONLY NEW FIELD
  viewedBy: Types.ObjectId[];
    queryBy: Types.ObjectId[];

}

// ----------------------------
// Normal Apartment (Home)
// ----------------------------
interface INormalHome extends IBaseApartment {
  listing_type: "Normal Apartment";
  property_category: "Home";

  bedrooms: number;
  bathrooms: number;

  monthly_rent: number;
  advance_payment: string;
  security_deposit: string;

  property_features: ("Terrace" | "Parking Space" | "Air Conditioner")[];
  building_amenities: (
    | "Semi-Furnished"
    | "Water Included"
    | "Furnished"
    | "Electricity Included"
    | "Utilities Included"
    | "Maintenance Included"
    | "Unfurnished"
    | "Internet Included"
  )[];
}

// ----------------------------
// Normal Apartment (Office)
// ----------------------------
interface INormalOffice extends IBaseApartment {
  listing_type: "Normal Apartment";
  property_category: "Office";

  office_rooms: number;
  office_conference_rooms: number;
  office_workstations: number;

  monthly_rent: number;
  advance_payment: string;
  security_deposit: string;

  property_features: ("Terrace" | "Parking Space" | "Air Conditioner")[];
  building_amenities: (
    | "Semi-Furnished"
    | "Water Included"
    | "Furnished"
    | "Electricity Included"
    | "Utilities Included"
    | "Maintenance Included"
    | "Unfurnished"
    | "Internet Included"
  )[];
}

// ----------------------------
// Furnished Apartment (Home)
// ----------------------------
interface IFurnishedHome extends IBaseApartment {
  listing_type: "Furnished Apartment";
  property_category: "Home";

  bedrooms: number;
  bathrooms: number;

  minimum_stay_days: number;
  maximum_stay_days: number;
  daily_rate: number;
  checkInTime: string;
  checkOutTime: string;

  house_rules: THouseRules[];
  whats_included: TWhatsIncluded[];
}

// ----------------------------
// Furnished Apartment (Office)
// ----------------------------
interface IFurnishedOffice extends IBaseApartment {
  listing_type: "Furnished Apartment";
  property_category: "Office";

  office_rooms: number;
  office_conference_rooms: number;
  office_workstations: number;

  minimum_stay_days: number;
  maximum_stay_days: number;
  daily_rate: number;
  checkInTime: string;
  checkOutTime: string;

  house_rules: THouseRules[];
  whats_included: TWhatsIncluded[];
}

// ----------------------------
// Final Union
// ----------------------------
export type TApartment =
  | INormalHome
  | INormalOffice
  | IFurnishedHome
  | IFurnishedOffice;
