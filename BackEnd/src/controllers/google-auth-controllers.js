import { handleGoogleAuthService } from '../services/google-auth-services.js';

export const googleAuth = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const { auth, token } = await handleGoogleAuthService(tokenId);

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        auth,
        token,
      },
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(error.status || 500).json({
      status: 'failed',
      message: error.message || 'Google authentication failed',
    });
  }
};


// import { OAuth2Client } from 'google-auth-library';
// import jwt from 'jsonwebtoken';
// import Auth from '../models/auth-model.js';
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "809028962389-buh0m92ilhd1n27vkuhi1og76g9kb5v2.apps.googleusercontent.com");

// export const googleAuth = async (req, res) => {
//   try {
//     const { tokenId } = req.body;

//     if (!tokenId) {
//       return res.status(400).json({ message: 'Google tokenId is required' });
//     }

//     const ticket = await client.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID || "809028962389-buh0m92ilhd1n27vkuhi1og76g9kb5v2.apps.googleusercontent.com"
//     });

//     const payload = ticket.getPayload();

//     const {email} = payload;

//     let exisitngAuth = await Auth.findOne({ email });

//     if(!exisitngAuth){
//         exisitngAuth = new Auth({
//             email: email,
//             authProvider: "google",
//             userType: "student",
//             isEmailVerified: true,
//         });

//         await exisitngAuth.save();
//     }

//     // Create token
//     const token = jwt.sign(
//       { id: exisitngAuth._id, email: exisitngAuth.email},
//       process.env.SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//         status: "succcess",
//         message: "Login successful",
//         data: {
//             "auth": exisitngAuth,
//             "token": token
//         },
//     });

//   } catch (error) {
//     console.error('Google Auth Error:', error);
//     res.status(500).json({ message: 'Google authentication failed', error: error});
//   }
// };