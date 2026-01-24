
import "dotenv/config";
import mongoose from "mongoose";
import { configs } from "./app/configs";
import app from "./app";

async function main() {

  console.log(process.env.DB_URL)

  const databaseUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yannyamba";
  // const databaseUrl = process.env.DB_URL || "mongodb+srv://humayun506034_db_user:6PsiQVjtkWe3IbTg@cluster0.vk7gre3.mongodb.net/yannyamba?appName=Cluster0";

  await mongoose.connect("mongodb://127.0.0.1:27017/yannyamba");
  // await mongoose.connect("mongodb+srv://humayun506034_db_user:6PsiQVjtkWe3IbTg@cluster0.vk7gre3.mongodb.net/yannyamba?appName=Cluster0");
  app.listen(configs.port, () => {
    console.log(`Server running on port ${configs.port}`);
  });
}

main().catch(console.error);
