import jwt from "jsonwebtoken";
import Auth from "../models/auth-model.js";

// Protect routes - verify token
export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Not authorized, no token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");

    // Find user from token
    req.user = await Auth.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "Not authorized, user not found",
      });
    }

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      status: "fail",
      message: "Not authorized, token failed",
    });
  }
};

// Restrict access to specific userTypes
export const restrictTo = (...userTypes) => {
  return (req, res, next) => {
    if (!req.user || !userTypes.includes(req.user.userType)) {
      return res.status(403).json({
        status: "fail",
        message: `User type ${req.user?.userType} is not authorized to access this route`,
      });
    }
    next();
  };
};
