// // services/otpService.ts
// import {initWhatsApp} from "../../utils/whatsappClient";

// // ✅ Generate OTP
export const generateOTP = (length: number = 6): string => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};



// export const sendOtpViaWhatsApp = async (rawPhone: string, otp: string) => {

//   if (!initWhatsApp().info) {
//     throw new Error("WhatsApp client not ready");
//   }

//   const digits = rawPhone.replace(/\D/g, "");

//   const formatted = digits.startsWith("880")
//     ? digits
//     : `88${digits}`;

//   console.log("Formatted Number:", formatted);

//   const numberId = await  initWhatsApp().getNumberId(formatted);

//   if (!numberId) {
//     throw new Error("No WhatsApp account linked to this number");
//   }

//   await initWhatsApp().sendMessage(numberId._serialized, `Your OTP is: ${otp}`);
// };




import { getWhatsAppClient, initWhatsApp } from "../../utils/whatsappClient";

// OTP generator OK ✅

export const sendOtpViaWhatsApp = async (rawPhone: string, otp: string) => {
  console.log("Phone:", rawPhone, "OTP:", otp);

  const client = getWhatsAppClient();

  // Remove non-digit characters, keep country code as is
  const digits = rawPhone.replace(/\D/g, "");
  const numberId = await client.getNumberId(digits + "@c.us"); // @c.us attach directly

  if (!numberId) {
    throw new Error("No WhatsApp account linked to this number");
  }

  await client.sendMessage(
    numberId._serialized,
    `✅ Your verification OTP is: ${otp}`
  );

  console.log("✅ OTP sent successfully");
};


// export const sendOtpViaWhatsApp = async (phone: string, otp: string) => {
//   const client = initWhatsApp(); // init first

//   // wait for client to be ready
//   await new Promise<void>((resolve) => {
//     if (client.info && client.info.pushname) return resolve(); // already ready

//     client.on("ready", () => {
//       resolve();
//     });
//   });

//   const formatted = phone.replace(/\D/g, "").startsWith("880")
//     ? phone.replace(/\D/g, "")
//     : `88${phone.replace(/\D/g, "")}`;

//   const numberId = await client.getNumberId(formatted);
//   if (!numberId) throw new Error("No WhatsApp account linked to this number");

//   await client.sendMessage(numberId._serialized, `Your OTP is: ${otp}`);
// };