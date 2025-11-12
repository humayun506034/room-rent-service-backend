import { AppError } from "../../utils/app_error";
;
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { TUser } from "../user/user.interface";
import { User_Model } from "../user/user.schema";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { Secret } from "jsonwebtoken";
import { isAccountExist } from "../../utils/isAccountExist";
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

// login user
// const login_user_from_db = async (payload: TLoginPayload) => {
//   // check account info
//   const isExistAccount = await isAccountExist(payload?.email);

//   const isPasswordMatch = await bcrypt.compare(
//     payload.password,
//     isExistAccount.password
//   );
//   if (!isPasswordMatch) {
//     throw new AppError("Invalid password", httpStatus.UNAUTHORIZED);
//   }
//   const accessToken = jwtHelpers.generateToken(
//     {
//       email: isExistAccount.email,
//       role: isExistAccount.role,
//     },
//     configs.jwt.access_token as Secret,
//     configs.jwt.access_expires as string
//   );

//   const refreshToken = jwtHelpers.generateToken(
//     {
//       email: isExistAccount.email,
//       role: isExistAccount.role,
//     },
//     configs.jwt.refresh_token as Secret,
//     configs.jwt.refresh_expires as string
//   );
//   return {
//     accessToken: accessToken,
//     refreshToken: refreshToken,
//     role: isExistAccount.role,
//   };
// };

export const auth_services = {
  register_user_into_db,
//   login_user_from_db,
};
