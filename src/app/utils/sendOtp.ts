import axios from "axios";

export const sendOtp = async (phone: string, message: string, otp?: number) => {
  if (!phone) throw new Error("Phone number is required");

  // clean phone: remove non-digit characters
  const cleanPhone = phone.replace(/\D/g, "");

  // optional: validate length (example: Bangladesh +880)
  if (cleanPhone.length < 10) throw new Error("Invalid phone number");

  // generate OTP if not provided
  const generatedOtp = otp;

  // WhatsApp chatId format
  const chatId = `${cleanPhone}@c.us`;

  // Hypersender instance and API key from environment variables
  const instanceId = process.env.HYPERSENDER_INSTANCE_ID;
  const apiKey = process.env.HYPERSENDER_API_KEY;

  if (!instanceId || !apiKey) {
    throw new Error(
      "Hypersender credentials not found in environment variables",
    );
  }

  // send OTP via Hypersender send-text-safe API
  const response = await axios.post(
    `https://app.hypersender.com/api/whatsapp/v2/${instanceId}/send-text-safe`,
    {
      chatId,
      text: `Your ${message} OTP is ${generatedOtp}. It will expire in 5 minutes.`,
      link_preview: false,
      link_preview_high_quality: false,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    },
  );

//   console.log("OTP sent:", generatedOtp, "to", chatId);

  return { otp: generatedOtp, chatId, response: response.data };
};
