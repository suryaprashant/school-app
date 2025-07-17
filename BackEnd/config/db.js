// connectDB.js
import mongoose from "mongoose";
import config from "config";
import dotenv from 'dotenv';
dotenv.config();

const mongodbUrl = config.get("mongodb.url");

const connectDB = async () => {
    try {
        await mongoose.connect(mongodbUrl);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;