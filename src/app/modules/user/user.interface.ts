export type TUser = {
  name?: string;
  phone: string;
  photo?: string;
  email?: string;
  location?: string;
  isVerified?: boolean;
  accountStatus?: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  isDeleted?: boolean;
};
