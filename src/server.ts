import "dotenv/config";
import mongoose from "mongoose";
import { configs } from "./app/configs";
import app from "./app";

async function main() {
  // console.log(process.env.DB_URL);

  const databaseUrl = process.env.DB_URL;
  // const databaseUrl = "mongodb://127.0.0.1:27017/yannyamba";

  await mongoose.connect(databaseUrl as string);
  app.listen(configs.port, () => {
    console.log(`Server running on port ${configs.port}`);
  });
}

main().catch(console.error);
