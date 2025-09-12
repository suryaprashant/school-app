import twilio from "twilio";
import dotenv from "dotenv";
import Otp from "../models/Phone-otp-model.js";

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtpService = async (phone) => {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Send SMS
  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE, // Your Twilio number
    to: phone
  });

  // Save OTP in DB
  await Otp.create({ phone, otp });

  return otp; // for debugging (don’t send in response in prod)
};

export const verifyOtpService = async (phone, otp) => {
  const record = await Otp.findOne({ phone, otp });
  if (record) {
    return true;
  }
  return false;
};
