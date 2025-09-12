import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: 300 } } // expires in 5 min
});

export default mongoose.model("Otp", OtpSchema);
