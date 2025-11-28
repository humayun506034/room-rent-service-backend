
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { autoReplyHandler } from "../modules/autoReplay/autoReplay.service";

let client: Client | null = null;
let isReady: boolean = false;

/**
 * Initialize WhatsApp client
 */
export const initWhatsApp = (): Client => {
  if (client) return client;


client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true, // true instead of "new"
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--single-process",
      "--disable-extensions",
    ],
  },
});


  // QR code event
  client.on("qr", (qr: string) => {
    console.log("Scan this QR code:");
    qrcode.generate(qr, { small: true });
    
  });

  // Ready event
  client.on("ready", () => {
    isReady = true;
    console.log("✅ WhatsApp client ready");
  });

  // Auth failure
  client.on("auth_failure", (msg: string) => {
    console.log("❌ Auth failed:", msg);
  });

  // Disconnected event
  client.on("disconnected", () => {
    isReady = false;
    console.log("❌ WhatsApp disconnected, reinitializing...");
    client?.initialize(); // auto restart
  });

  client.on("message", async (msg) => {
  await autoReplyHandler(msg);
  });

  client.initialize();
  return client;
};

/**
 * Get WhatsApp client instance
 */
export const getWhatsAppClient = (): Client => {
  if (!client || !isReady) {
    throw new Error("WhatsApp client not ready yet");
  }
  return client;
};

