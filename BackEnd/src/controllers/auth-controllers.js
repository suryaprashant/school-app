import Auth from '../models/auth-model.js';
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const {email, password, userType, authProvider} = req.body;

    // Check if student already exists
    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      return res.status(409).json({status:"failed", message: "Student already registered" });
    }

    // Create new student
    const newAuth = new Auth({email, password, userType, authProvider});
    await newAuth.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newAuth._id, email: newAuth.email },
      process.env.SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      status: "success",
      message: "Registered successfully",
      data: {
        "auth": newAuth,
        "token": token,
      },
    });

  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message
    },);
  }
};

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