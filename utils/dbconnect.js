import mongoose from "mongoose";

let isConnected = false;

export const dbconnect = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share-prompts",
    });
    isConnected = true;
    console.log("connected to db successfully");
  } catch (e) {
    console.error(e.message);
  }
};
