import Auth from '../models/auth-model.js';
import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken";
import { getVerificationEmailTemplate, getEmailAlreadyVerifiedTemplate, getEmailVerifiedTemplate, getLinkExpired } from '../../public/js/email-template.js';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(404).json({
        status: "failed",
        message: "User not found"});
    }

    // Check password
    if (auth.password !== password) {
      return res.status(401).json({ status: "failed", message: "Incorrect password"});
    }

    if(!auth.isEmailVerified){
      return res.status(401).json({ status: "failed", message: "Please verify your email"});
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: auth._id, email: auth.email },
      process.env.SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      status: "success",
      message: "Loggedin successfully",
      data: {
        "auth": auth,
        "token": token,
      },
    });

  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const {email, password, userType, authProvider} = req.body;

    if(!userType || !authProvider){
      return res.status(409).json({status:"failed", message: "User type & Auth Provider is required." });
    }

    if(authProvider != 'google' && (!email || !password)){
      return res.status(409).json({status:"failed", message: "Email & Password is required." });
    }

    // Check if student already exists
    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      
      const createdTime = existingAuth.createdAt;
      const now = new Date();
      const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

      if (!existingAuth.isEmailVerified && createdTime < fifteenMinutesAgo) {
        // Expired and unverified — safe to delete
        await Auth.deleteOne({ _id: existingAuth._id });
      } else {
        return res.status(409).json({
          status: "failed",
          message: existingAuth.isEmailVerified
            ? "Student already registered"
            : "Student already registered but email not verified. Please check your inbox or try again later."
        });
      }
    }

    // Create new student
    const newAuth = new Auth({email, password, userType, authProvider, isEmailVerified : false});
    await newAuth.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newAuth._id, email: newAuth.email },
      process.env.SECRET,
      { expiresIn: "15m" }
    );

    await sendVerificationEmail({email, token});

    res.status(201).json({
      status: "success",
      message: `Email Verification Link is Sent to the email: ${email}`,
      data: `This is just for testing purpose: ${token}`
      // data: {
      //   "auth": newAuth,
      //   "token": token,
      // },
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    },);
  }
};

export const sendVerificationEmail = async ({ email, token }) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationUrl = `http://localhost:5000/api/auth/verify-email/${token}`;

  const mailOptions = {
    from: `"TC-SA" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '@noreply Verification link from TC-SA',
    html: getVerificationEmailTemplate(verificationUrl),
  };

  await transporter.sendMail(mailOptions);
};

export const verifyEmail = async (req, res) => {

  try{

    let {token} = req.params;

    const {email, id} = jwt.verify(token, process.env.SECRET);

    if(!email || !id){
      return res.status(403).json({
      status: "failed",
      message: "link is invalid or expired"});
    }

    let auth = await Auth.findOne({email});

    if(!auth.isEmailVerified){
      auth.isEmailVerified = true;
      await auth.save();
      res.send(getEmailVerifiedTemplate());
    }else{
      res.send(getEmailAlreadyVerifiedTemplate());
    }

  }catch(error){

    if(error.message == "jwt expired"){
      return res.send(getLinkExpired());
    }

    res.status(500).json({
      status: "failed",
      message: error.message
    });

  }

}

export const resetPassword = async (req, res) => {

  try{
    const authToken = req.headers["authorization"];
    let token = authToken.split(" ")[1];
    let {oldPassword, newPassword} = req.body;

    let {email} = jwt.verify(token, process.env.SECRET);

    let auth = await Auth.findOne({email});

    if(oldPassword != auth.password){
      return res.status(403).json({status: "failed", message: "Password is incorrect",});
    }

    if(oldPassword == newPassword){
      return res.status(403).json({status: "failed", message: "Password cannot be same",});
    }

    auth.password = newPassword;

    await auth.save();
    return res.status(200).json({status: "success", message: "Password changed successfully",});

  }catch(error){
    res.status(500).json({
      status: "failed",
      message: error.message,
    })
  }

}