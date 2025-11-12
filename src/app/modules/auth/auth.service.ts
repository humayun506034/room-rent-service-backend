import { AppError } from "../../utils/app_error";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { TUser } from "../user/user.interface";
import { User_Model } from "../user/user.schema";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { Secret } from "jsonwebtoken";
import { isAccountExist } from "../../utils/isAccountExist";
import { is } from "zod/v4/locales";
// register user
const register_user_into_db = async (payload: TUser) => {
  const isExistUser = await User_Model.findOne({
    phone: payload.phone,
    isDeleted: false,
  }).lean();
  if (isExistUser) {
    throw new AppError("Number already exist !!", httpStatus.BAD_REQUEST);
  }

  const result = await User_Model.create(payload);
  return result;
};

const login_user_from_db = async (payload: { phone: string }) => {
  // check account info
  const isExistAccount = (await User_Model.findOne({
    phone: payload.phone,
  })) as TUser & { _id: string };
  console.log("🚀 ~ login_user_from_db ~ isExistAccount:", isExistAccount);

  const accessToken = jwtHelpers.generateToken(
    {
      _id: isExistAccount._id,
      name: isExistAccount.name,
      phone: isExistAccount.phone,
      role: isExistAccount.role,
      isVerified: isExistAccount.isVerified,
      accountStatus: isExistAccount.accountStatus,
      isDeleted: isExistAccount.isDeleted,
    },
    configs.jwt.access_token as Secret,
    configs.jwt.access_expires as string
  );

  return {
    user: isExistAccount,
    accessToken: accessToken,
    role: isExistAccount.role,
  };
};

export const auth_services = {
  register_user_into_db,
  login_user_from_db,
};
