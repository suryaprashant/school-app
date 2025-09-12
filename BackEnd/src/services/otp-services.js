import twilio from "twilio";
import dotenv from "dotenv";
import Otp from "../models/Phone-otp-model.js";
import Auth from "../models/auth-model.js";
import jwt from 'jsonwebtoken';

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOtpService = async (phone) => {
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Send SMS
  await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone
  });

  // Save OTP in DB
  await Otp.create({ phone, otp });

  return otp; // for debugging (don’t send in response in prod)
};

export const verifyOtpService = async (phoneNumber, otp) => {

  const record = await Otp.findOne({ phone: phoneNumber, otp });
  if (!record)
    throw { status: 404, message: 'OTP Expired' }

  let existingAuth = await Auth.findOne({ phoneNumber });

  if (!existingAuth) {
    existingAuth = new Auth({
      phoneNumber,
      authProvider: 'mobile',
      userType: 'student',
      isEmailVerified: true,
    });
    await existingAuth.save();
  }

  const token = jwt.sign(
    { id: existingAuth._id, phoneNumber: existingAuth.phoneNumber },
    process.env.SECRET,
    { expiresIn: '7d' }
  );

  return { auth: existingAuth, token };
};
