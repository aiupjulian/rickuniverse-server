import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import config from "./config.js";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  global.__MONGOINSTANCE = instance;

  await mongoose.connect(
    `${uri.slice(0, uri.lastIndexOf("/"))}/${config.dbName}`,
    { useNewUrlParser: true }
  );
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
}
