import { sendOtpService, verifyOtpService } from "../services/otp-services.js";

export const sendOtpController = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number required" });

    await sendOtpService(phone);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
};

export const verifyOtpController = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone & OTP required" });

    const auth = await verifyOtpService(phone, otp);
    res.status(201).json({
      status: 'success',
      message: `Otp verified successfully`,
      data:  auth
    });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};
