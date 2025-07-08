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


// import Auth from '../models/auth-model.js';
// import OTP from '../models/otp-model.js';
// import nodemailer from 'nodemailer';
// import jwt from "jsonwebtoken";
// import { getVerificationEmailTemplate, getEmailAlreadyVerifiedTemplate, getEmailVerifiedTemplate, getLinkExpired, getOtpEmailTemplate } from '../../public/js/email-template.js';

// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if student exists
//     const auth = await Auth.findOne({ email });
//     if (!auth) {
//       return res.status(404).json({
//         status: "failed",
//         message: "User not found"});
//     }

//     // Check password
//     if (auth.password !== password) {
//       return res.status(401).json({ status: "failed", message: "Incorrect password"});
//     }

//     if(!auth.isEmailVerified){
//       return res.status(401).json({ status: "failed", message: "Please verify your email"});
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: auth._id, email: auth.email },
//       process.env.SECRET,
//       { expiresIn: "30d" }
//     );

//     res.status(200).json({
//       status: "success",
//       message: "Loggedin successfully",
//       data: {
//         "auth": auth,
//         "token": token,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ status: "failed", message: error.message });
//   }
// };

// export const registerUser = async (req, res) => {
//   try {
//     const {email, password, userType, authProvider} = req.body;

//     if(!userType || !authProvider){
//       return res.status(409).json({status:"failed", message: "User type & Auth Provider is required." });
//     }

//     if(authProvider != 'google' && (!email || !password)){
//       return res.status(409).json({status:"failed", message: "Email & Password is required." });
//     }

//     // Check if student already exists
//     const existingAuth = await Auth.findOne({ email });
//     if (existingAuth) {
      
//       const createdTime = existingAuth.createdAt;
//       const now = new Date();
//       const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

//       if (!existingAuth.isEmailVerified && createdTime < fifteenMinutesAgo) {
//         // Expired and unverified — safe to delete
//         await Auth.deleteOne({ _id: existingAuth._id });
//       } else {
//         return res.status(409).json({
//           status: "failed",
//           message: existingAuth.isEmailVerified
//             ? "Student already registered"
//             : "Student already registered but email not verified. Please check your inbox or try again later."
//         });
//       }
//     }

//     // Create new student
//     const newAuth = new Auth({email, password, userType, authProvider, isEmailVerified : false});
//     await newAuth.save();

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: newAuth._id, email: newAuth.email },
//       process.env.SECRET,
//       { expiresIn: "15m" }
//     );

//     await sendVerificationEmail({email, token});

//     res.status(201).json({
//       status: "success",
//       message: `Email Verification Link is Sent to the email: ${email}`,
//       data: `This is just for testing purpose: ${token}`
//       // data: {
//       //   "auth": newAuth,
//       //   "token": token,
//       // },
//     });

//   } catch (error) {
//     res.status(500).json({
//       status: "failed",
//       message: error.message
//     },);
//   }
// };

// export const sendVerificationEmail = async ({ email, token }) => {

//   const verificationUrl = `http://localhost:5000/api/auth/verify-email/${token}`;

//   const mailOptions = {
//     from: `"TC-SA" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: '@noreply Verification link from TC-SA',
//     html: getVerificationEmailTemplate(verificationUrl),
//   };

//   await transporter.sendMail(mailOptions);
// };

// export const sendOtpToEmail = async ({ email, otp}) => {

//   console.log(email);

//   const mailOptions = {
//     from: `"TC-SA" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: '@noreply Verification code for TC-SA registration',
//     html: getOtpEmailTemplate(otp),
//   };

//   await transporter.sendMail(mailOptions);
// };

// export const verifyEmail = async (req, res) => {

//   try{

//     let {token} = req.params;

//     const {email, id} = jwt.verify(token, process.env.SECRET);

//     if(!email || !id){
//       return res.status(403).json({
//       status: "failed",
//       message: "link is invalid or expired"});
//     }

//     let auth = await Auth.findOne({email});

//     if(!auth.isEmailVerified){
//       auth.isEmailVerified = true;
//       await auth.save();
//       res.send(getEmailVerifiedTemplate());
//     }else{
//       res.send(getEmailAlreadyVerifiedTemplate());
//     }

//   }catch(error){

//     if(error.message == "jwt expired"){
//       return res.send(getLinkExpired());
//     }

//     res.status(500).json({
//       status: "failed",
//       message: error.message
//     });

//   }

// }

// export const resetPassword = async (req, res) => {

//   try{
//     const authToken = req.headers["authorization"];
//     let token = authToken.split(" ")[1];
//     let {oldPassword, newPassword} = req.body;

//     let {email} = jwt.verify(token, process.env.SECRET);

//     let auth = await Auth.findOne({email});

//     if(oldPassword != auth.password){
//       return res.status(403).json({status: "failed", message: "Password is incorrect",});
//     }

//     if(oldPassword == newPassword){
//       return res.status(403).json({status: "failed", message: "Password cannot be same",});
//     }

//     auth.password = newPassword;

//     await auth.save();
//     return res.status(200).json({status: "success", message: "Password changed successfully",});

//   }catch(error){
//     res.status(500).json({
//       status: "failed",
//       message: error.message,
//     })
//   }

// }

// export const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // ✅ Check if email exists in DB
//     const auth = await Auth.findOne({email});
//     if (!auth) {
//       return res.status(404).json({ status: "failed", message: "Email not registered" });
//     }

//     // Generate and save OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await OTP.deleteMany({ email });
//     const otpDoc = new OTP({ email, otp: otpCode });
//     await otpDoc.save();

//     // Send OTP via email
//     console.log(otpCode);
//     await sendOtpToEmail({email, otp: otpCode});

//     res.status(200).json({ status: "success", message: "OTP sent successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ status: "failed", message: error.message,});
//   }
// };

// export const verifyOtpAndResetPassword = async (req, res) => {
//   try {
//     const { email, otp, newPassword } = req.body;

//     // Find OTP
//     const otpDoc = await OTP.findOne({ email, otp });
//     if (!otpDoc) {
//       return res.status(400).json({ status: "failed", message: "Invalid or expired OTP" });
//     }

//     // Find user
//     const auth = await Auth.findOne({ email });
//     if (!auth) {
//       return res.status(404).json({ status: "failed", message: "User not found" });
//     }

//     if(auth.password == newPassword){
//       return res.status(404).json({ status: "failed", message: "Password couldn't be same" });
//     }

//     auth.password = newPassword;
//     await auth.save();

//     await OTP.deleteMany({ email });

//     res.status(200).json({ status: "success",  message: "Password reset successful" });
  
//   } catch (error) {
//     res.status(500).json({status: "failed",  message: error.message });
//   }
// };

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
// });