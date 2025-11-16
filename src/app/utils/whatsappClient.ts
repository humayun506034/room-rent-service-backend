// whatsappClient.ts
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const client = new Client({
  authStrategy: new LocalAuth(), // saves session so you don't scan each time
});

client.on("qr", (qr) => {
  console.log("Scan this QR code with your WhatsApp:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp ready to use ✅");
});

client.on("auth_failure", (msg) => {
  console.error("WhatsApp auth failure:", msg);
});

client.on("disconnected", (reason) => {
  console.log("WhatsApp client was logged out:", reason);
});

client.initialize();

export default client;
