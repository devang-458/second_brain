import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  if (isConnected) return;

  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error(".ENV MongoUrl is not defined");
  }

  try {
    await mongoose.connect(mongoUrl, {
      dbName: "secondBrain",
    });
    isConnected = true;
    console.log("MongoDb connected");
  } catch (error) {
    console.error(error);
  }
};
