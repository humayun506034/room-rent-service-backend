// services/otpService.ts
import client from "../../utils/whatsappClient";

// ✅ Generate OTP
export const generateOTP = (length: number = 6): string => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

// ✅ Send OTP via WhatsApp
// rawPhone: full number coming from frontend (e.g. "+8801747477746" / "8801747477746")
export const sendOtpViaWhatsApp = async (rawPhone: string, otp: string) => {
  console.log("Raw phone from frontend:", rawPhone);

  // 1) Keep only digits: "+88017 4747-7746" -> "8801747477746"
  const digitsOnly = rawPhone.replace(/\D/g, ""); // \D = non-digit

  console.log("Digits only:", digitsOnly);

  if (!digitsOnly) {
    throw new Error("Invalid phone number");
  }

  const message = `🔐 Your verification code is: *${otp}*\n\nDo not share this code with anyone.`;

  // 2) First check if this number is registered on WhatsApp
  const numberId = await client.getNumberId(digitsOnly);

  console.log("numberId from getNumberId:", numberId);

  if (!numberId) {
    throw new Error("No WhatsApp account found for this phone number");
  }

  // 3) Actual WhatsApp chat id (JID): "8801747477746@c.us"
  const chatId = numberId._serialized;

  // 4) Finally send the message
  await client.sendMessage(chatId, message);
};
