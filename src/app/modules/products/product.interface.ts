export type TApartment =
  | {
      listing_type: "Normal Apartment" | "Furnished Apartment";
      property_category: "Home";
      bedrooms: number;
      bathrooms: number;
      property_size?: number;
      about: string;
      monthly_rent: number;
      advance_payment: string;
      security_deposit: string;
      city_name: string;
      neighborhood: string;
      distance_to_main_road: string;
      nearby_landmarks: string;
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
  | {
      listing_type: "Normal Apartment" | "Furnished Apartment";
      property_category: "Office";
      office_rooms: number;
      office_conference_rooms: number;
      office_workstations: number;
      property_size?: number;
      about: string;
      monthly_rent: number;
      advance_payment: string;
      security_deposit: string;
      city_name: string;
      neighborhood: string;
      distance_to_main_road: string;
      nearby_landmarks: string;
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
    };
