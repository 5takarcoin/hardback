import dotenv from "dotenv";
import mongoose, { connection } from "mongoose";

dotenv.config();

const databaseName = "uniishard1";
const connectionURL = process.env.MONGO_URI + databaseName;

export const connectDB = async () => {
  try {
    mongoose.connect(connectionURL);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    connection.on("error", () => {
      console.log("MongoDB connection error");
    });
  } catch (error) {
    console.log("Error connecting to MongoDB");
  }
};
