
// import mongoose from "mongoose";
// import app from "./app";
// import { configs } from "./app/configs";
// async function main() {
//     await mongoose.connect(configs.db_url!);
//     app.listen(configs.port, () => {
//         console.log(`Server listening on port  ${configs.port}`);
//     });
// }

// main().catch(err => console.log(err));


import mongoose from "mongoose";
import { configs } from "./app/configs";
// import { initWhatsApp } from "./app/utils/whatsappClient";
import app from "./app";
import { initWhatsApp } from "./app/utils/whatsappClient";




async function main() {

await mongoose.connect(configs.db_url!);

  console.log("🚀 Initializing WhatsApp...");
  initWhatsApp();

  app.listen(configs.port, () => {
    console.log(`Server running on port ${configs.port}`);
  });
}

main().catch(console.error);
