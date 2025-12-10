

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

  // NEW FIELDS
  viewedBy: Types.ObjectId[];
  queryBy: Types.ObjectId[];
  isApproved?: boolean;
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

  property_features: string[];
  building_amenities: string[];
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

  property_features: string[];
  building_amenities: string[];
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

  house_rules: string[];
  whats_included: string[];
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

  house_rules: string[];
  whats_included: string[];
}

// ----------------------------
// Final Union
// ----------------------------
export type TApartment =
  | INormalHome
  | INormalOffice
  | IFurnishedHome
  | IFurnishedOffice;
