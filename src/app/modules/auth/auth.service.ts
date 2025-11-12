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
import Twilio from "twilio";

// import * as ClickSendApi from "clicksend";



// register user
// const register_user_into_db = async (payload: TUser) => {
//   const isExistUser = await User_Model.findOne({
//     phone: payload.phone,
//     isDeleted: false,
//   }).lean();
//   if (isExistUser) {
//     throw new AppError("Number already exist !!", httpStatus.BAD_REQUEST);
//   }

//   const result = await User_Model.create(payload);
//   return result;
// };

const twilioClient = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

export const register_user_into_db = async (payload: TUser) => {
  // Check if user exists
  const isExistUser = await User_Model.findOne({
    phone: payload.phone,
    isDeleted: false,
  }).lean();

  if (isExistUser) {
    throw new AppError("Number already exist !!", httpStatus.BAD_REQUEST);
  }

  // Save user in DB
  const result = await User_Model.create(payload);

  // Send SMS using Twilio
  try {
    await twilioClient.messages.create({
      body: `Hi ${payload.name || "User"}, your registration was successful 🎉`,
      from: TWILIO_PHONE_NUMBER, // Twilio number
      to: payload.phone.startsWith("+")
        ? payload.phone
        : `+88${payload.phone}`, // add country code if missing
    });

    console.log("✅ SMS sent successfully to:", payload.phone);
  } catch (error: any) {
    console.error("❌ Failed to send SMS:", error?.message);
  }

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
