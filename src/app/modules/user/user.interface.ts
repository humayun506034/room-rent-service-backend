export type TUser = {
  name: string;
  phone: string;
  photo?: string;
  email?: string;
  role: "RENTER" | "OWNER";
  location?: string;
  isVerified?: boolean;
  accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  isDeleted?: boolean;
};
