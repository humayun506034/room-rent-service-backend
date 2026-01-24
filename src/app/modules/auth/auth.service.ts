import { AppError } from "../../utils/app_error";
import httpStatus from "http-status";
import { TUser } from "../user/user.interface";
import { User_Model } from "../user/user.schema";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { Secret } from "jsonwebtoken";

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
  // const registerVerificationOtp = generateOTP(6);

  // Option A: store OTP directly on user document (simple demo)
  // make sure your User schema has fields: otp, otpExpiresAt
  const registerOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  const userToCreate = {
    ...payload,
    // registerVerificationOtp,
    registerOtpExpiresAt,
    isVerified: false, // for example
  };

  // 3. Save user
  const result = await User_Model.create(userToCreate);

  try {
    // ✅ ekhane payload.phone holo full number with country code
    // await sendOtpViaWhatsApp(payload.phone, registerVerificationOtp);
    // await sendOtpViaWhatsApp("+8801747477746", "123456")
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

const resend_register_otp = async (payload: { phone: string }) => {
  // 1️⃣ User check
  const isExistUser = await User_Model.findOne({
    phone: payload.phone,
    isDeleted: false,
  });

  if (!isExistUser) {
    throw new AppError("Account not found!!", httpStatus.NOT_FOUND);
  }

  // 2️⃣ Already verified check
  if (isExistUser.isVerified) {
    throw new AppError(
      "This number is already verified",
      httpStatus.BAD_REQUEST,
    );
  }

  // 3️⃣ Generate new OTP
  // const newOtp = generateOTP(6);
  const newOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  // 4️⃣ Update OTP info
  // isExistUser.registerVerificationOtp = Number(newOtp);
  isExistUser.registerOtpExpiresAt = newOtpExpiresAt;

  await isExistUser.save();

  // 5️⃣ Send OTP via WhatsApp
  try {
    // await sendOtpViaWhatsApp(payload.phone, newOtp);
  } catch (err) {
    console.error("Failed to resend OTP:", err);
    // If you want:
    // throw new AppError("Failed to resend OTP. Try again later.", 500);
  }

  return {
    phone: isExistUser.phone,
    message: "OTP re-sent successfully. Please check your WhatsApp.",
  };
};

const verify_register_otp = async (payload: { phone: string; otp: string }) => {
  // ✅ Find account
  const user = await User_Model.findOne({ phone: payload.phone });

  if (!user) {
    throw new AppError("Account not found!", httpStatus.NOT_FOUND);
  }

  // ✅ OTP validation
  if (user.registerVerificationOtp !== Number(payload.otp)) {
    throw new AppError("Invalid OTP", httpStatus.BAD_REQUEST);
  }

  // ✅ OTP expiry check
  if (user.registerOtpExpiresAt && user.registerOtpExpiresAt < new Date()) {
    throw new AppError("OTP expired", httpStatus.BAD_REQUEST);
  }

  // ✅ Update verification info
  user.isVerified = true;
  user.registerVerificationOtp = null;
  user.registerOtpExpiresAt = null;

  await user.save();

  // ✅ Generate token
  const accessToken = jwtHelpers.generateToken(
    {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      isVerified: user.isVerified,
      accountStatus: user.accountStatus,
      isDeleted: user.isDeleted,
      roles: user.roles,
    },
    configs.jwt.access_token as Secret,
    configs.jwt.access_expires as string,
  );

  return {
    user,
    accessToken,
  };
};

const login_user_from_db = async (payload: { phone: string }) => {
  const user = await User_Model.findOne({
    phone: payload.phone,
    isDeleted: false,
  });

  if (!user) {
    throw new AppError("Account not found!", httpStatus.NOT_FOUND);
  }

  if (!user.isVerified) {
    throw new AppError("Account is not verified", httpStatus.BAD_REQUEST);
  }

  // ✅ Generate login OTP
  // const loginVerificationOtp = generateOTP(6);
  const loginOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // user.loginVerificationOtp = Number(loginVerificationOtp);
  user.loginOtpExpiresAt = loginOtpExpiresAt;

  await user.save();

  // ✅ Send OTP
  try {
    // await sendOtpViaWhatsApp(payload.phone, loginVerificationOtp);
  } catch (err) {
    console.error("Failed to send login OTP:", err);
  }

  return {
    phone: user.phone,
    message: "Login OTP sent successfully. Check your WhatsApp.",
  };
};

const resend_login_otp = async (payload: { phone: string }) => {
  const user = await User_Model.findOne({
    phone: payload.phone,
    isDeleted: false,
  });

  if (!user) {
    throw new AppError("Account not found!", httpStatus.NOT_FOUND);
  }

  if (!user.isVerified) {
    throw new AppError("Account not verified", httpStatus.BAD_REQUEST);
  }

  // const newOtp = generateOTP(6);
  const newOtpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // user.loginVerificationOtp = Number(newOtp);
  user.loginOtpExpiresAt = newOtpExpiresAt;

  await user.save();

  try {
    // await sendOtpViaWhatsApp(payload.phone, newOtp);
  } catch (err) {
    console.error("Failed to resend login OTP:", err);
  }

  return {
    phone: user.phone,
    message: "Login OTP re-sent successfully.",
  };
};

const verify_login_otp = async (payload: { phone: string; otp: string }) => {
  const user = await User_Model.findOne({ phone: payload.phone });

  if (!user) {
    throw new AppError("Account not found!", httpStatus.NOT_FOUND);
  }

  if (user.loginVerificationOtp !== Number(payload.otp)) {
    throw new AppError("Invalid OTP", httpStatus.BAD_REQUEST);
  }

  if (user.loginOtpExpiresAt && user.loginOtpExpiresAt < new Date()) {
    throw new AppError("OTP expired", httpStatus.BAD_REQUEST);
  }

  // ✅ Clear login OTP
  user.loginVerificationOtp = null;
  user.loginOtpExpiresAt = null;

  await user.save();

  // ✅ Issue token
  const accessToken = jwtHelpers.generateToken(
    {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      isVerified: user.isVerified,
      accountStatus: user.accountStatus,
      isDeleted: user.isDeleted,
      roles: user.roles,
    },
    configs.jwt.access_token as Secret,
    configs.jwt.access_expires as string,
  );

  return {
    user,
    accessToken,
  };
};

const temp_register = async (payload: TUser) => {
  payload.roles = ["RENTER", "OWNER"];
  const user = await User_Model.create(payload);
  return {
    Message: "User created successfully",
    data: user,
  };
};

export const auth_services = {
  register_user_into_db,
  login_user_from_db,
  verify_register_otp,
  resend_register_otp,
  verify_login_otp,
  resend_login_otp,
  temp_register
};
