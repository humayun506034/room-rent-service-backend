import { NullExpression } from "mongoose";

export type TUser = {
  name?: string;
  phone: string;
  photo?: string;
  email?: string;
  registerVerificationOtp?: number | null;
  registerOtpExpiresAt?: Date | null;
  location?: string;
  isVerified?: boolean;
  accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  isDeleted?: boolean;
  roles: ("ADMIN" | "RENTER")[];
};
