import { AppError } from "../../utils/app_error";
import httpStatus from "http-status";
import { TUser } from "../user/user.interface";
import { User_Model } from "../user/user.schema";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { Secret } from "jsonwebtoken";
import { generateOTP, sendOtpViaWhatsApp } from "../otp/otp.service";

const register_user_into_db = async (payload: TUser) => {
  console.log(payload);
  // 1. Check existing user
  const isExistUser = await User_Model.findOne({
    phone: payload.phone,
    isDeleted: false,
  }).lean();

  if (isExistUser) {
    throw new AppError("Number already exist !!", httpStatus.BAD_REQUEST);
  }

  // 2. Generate OTP
  const registerVerificationOtp = generateOTP(6);

  // Option A: store OTP directly on user document (simple demo)
  // make sure your User schema has fields: otp, otpExpiresAt
  const registerOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  const userToCreate = {
    ...payload,
    registerVerificationOtp,
    registerOtpExpiresAt,
    isVerified: false, // for example
  };

  // 3. Save user
  const result = await User_Model.create(userToCreate);

  try {
    // ✅ ekhane payload.phone holo full number with country code
    await sendOtpViaWhatsApp(payload.phone, registerVerificationOtp);
  } catch (err) {
    console.error("Failed to send OTP via WhatsApp:", err);
    // ichcha korle ekhane error throw korte paro
    // throw new AppError("Failed to send OTP. Try again later.", httpStatus.INTERNAL_SERVER_ERROR);
  }

  // 5. Do NOT return OTP in production!
  return {
    _id: result._id,
    phone: result.phone,
    isVerified: result.isVerified,
    message: "OTP sent successfully, Please Check Your WhatsApp",
    // remove otp before sending response
  };
};

const verify_register_otp = async (payload: {
  phone: string;
  otp: string;
}) => {
  // check account info
  const isExistAccount = (await User_Model.findOne({
    phone: payload.phone,
  })) as TUser & { _id: string };
  console.log("🚀 ~ verrify_register_otp ~ isExistAccount:", isExistAccount);

  if (!isExistAccount) {
    throw new AppError("Account not found!!", httpStatus.NOT_FOUND);
  }

  if(isExistAccount.isVerified) {
    throw new AppError("Account already verified !!", httpStatus.BAD_REQUEST);
  }
  if (isExistAccount.isDeleted) {
    throw new AppError("Account deleted !!", httpStatus.BAD_REQUEST);
  }
  if (isExistAccount.accountStatus == "INACTIVE") {
    throw new AppError(
      "Account is temporary suspend, contact us on support !!",
      httpStatus.BAD_REQUEST
    );
  }
  if (isExistAccount.accountStatus == "SUSPENDED") {
    throw new AppError("Account is suspended !!", httpStatus.BAD_REQUEST);
  }

  // check otp
  if (isExistAccount.registerVerificationOtp !== Number(payload.otp)) {
    throw new AppError("Invalid OTP", httpStatus.BAD_REQUEST);
  }

  if (isExistAccount.registerOtpExpiresAt && isExistAccount.registerOtpExpiresAt < new Date()) {
    throw new AppError("OTP expired", httpStatus.BAD_REQUEST);
  }

  await User_Model.findOneAndUpdate(
    { phone: payload.phone },
    { isVerified: true, registerVerificationOtp: null, registerOtpExpiresAt: null },
    { new: true }
  );
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
  };
};

export const auth_services = {
  register_user_into_db,
  login_user_from_db,
  verify_register_otp
};
