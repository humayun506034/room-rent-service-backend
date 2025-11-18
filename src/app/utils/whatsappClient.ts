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


// // whatsappClient.ts
// import { Client, LocalAuth } from "whatsapp-web.js";
// import qrcode from "qrcode-terminal";
// import path from "path";

// // session save path ঠিক করা, production server-friendly
// const authPath = path.join(__dirname, "whatsapp-session");

// const client = new Client({
//   authStrategy: new LocalAuth({
//     clientId: "whatsapp-client",
//     dataPath: authPath, // session data এখানে save হবে
//   }),
//   puppeteer: {
//     headless: true, // GUI ছাড়া server এ চলবে
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--disable-dev-shm-usage",
//       "--disable-accelerated-2d-canvas",
//       "--no-first-run",
//       "--no-zygote",
//       "--single-process",
//       "--disable-gpu",
//     ],
//   },
// });

// // QR code event
// client.on("qr", (qr) => {
//   console.log("Scan this QR code with your WhatsApp (only once!):");
//   qrcode.generate(qr, { small: true });
// });

// // Ready event
// client.on("ready", () => {
//   console.log("WhatsApp ready ✅");
// });

// // Auth failure
// client.on("auth_failure", (msg) => {
//   console.error("WhatsApp auth failure:", msg);
// });

// // Disconnected
// client.on("disconnected", (reason) => {
//   console.log("WhatsApp disconnected:", reason);
// });

// client.initialize();

// export default client;
