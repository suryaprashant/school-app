import * as AuthService from '../services/auth-services.js';
import { emailTemplates } from '../utils/email.js';

export const registerUser = async (req, res) => {
  try {
    const result = await AuthService.registerUserService(req.body);
    res.status(201).json({
      status: 'success',
      message: `Email Verification Link is Sent to: ${result.email}`,
      data: `This is just for testing purpose: ${result.token}`,
    });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { auth, token } = await AuthService.loginUserService(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      data: { auth, token },
    });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const result = await AuthService.verifyEmailService(req.params.token);
    if (result === 'verified') {
      res.send(emailTemplates.verified());
    } else {
      res.send(emailTemplates.alreadyVerified());
    }
  } catch (error) {
    if (error.message === 'jwt expired') {
      res.send(emailTemplates.expired());
    } else {
      res.status(500).json({ status: 'failed', message: error.message });
    }
  }
};

export const resetPassword = async (req, res) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    await AuthService.resetPasswordService(token, req.body.oldPassword, req.body.newPassword);
    res.status(200).json({ status: 'success', message: 'Password changed successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

export const sendOtp = async (req, res) => {
  try {
    await AuthService.sendOtpService(req.body.email);
    res.status(200).json({ status: 'success', message: 'OTP sent successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};

export const verifyOtpAndResetPassword = async (req, res) => {
  try {
    await AuthService.verifyOtpResetPasswordService(req.body);
    res.status(200).json({ status: 'success', message: 'Password reset successful' });
  } catch (error) {
    res.status(error.status || 500).json({ status: 'failed', message: error.message });
  }
};