import nodemailer from 'nodemailer';

import {
  getVerificationEmailTemplate,
  getEmailAlreadyVerifiedTemplate,
  getEmailVerifiedTemplate,
  getLinkExpired,
  getOtpEmailTemplate,
} from '../../public/js/email-template.js';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async ({ email, token }) => {
  try {
    const PORT = process.env.PORT || 8080;
    const verificationUrl = `http://localhost:${PORT}/api/auth/verify-email/${token}`;

    const mailOptions = {
      from: `"TC-SA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '@noreply Verification link from TC-SA',
      html: getVerificationEmailTemplate(verificationUrl),
    };

    await transporter.sendMail(mailOptions);
    console.log(`✓ Verification email sent to ${email}`);
  } catch (error) {
    console.error('Email sending failed:', error.message);
    console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'NOT SET');
    console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'NOT SET');
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

export const sendOtpToEmail = async ({ email, otp }) => {
  try {
    const mailOptions = {
      from: `"TC-SA" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '@noreply Verification code for TC-SA registration',
      html: getOtpEmailTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
    console.log(`✓ OTP email sent to ${email}`);
  } catch (error) {
    console.error('Email sending failed:', error.message);
    console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'NOT SET');
    console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'NOT SET');
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};

export const emailTemplates = {
  alreadyVerified: getEmailAlreadyVerifiedTemplate,
  verified: getEmailVerifiedTemplate,
  expired: getLinkExpired,
};
