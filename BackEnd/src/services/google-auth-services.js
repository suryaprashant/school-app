import jwt from 'jsonwebtoken';
import Auth from '../models/auth-model.js';
import { googleClient } from '../utils/google-client.js';

export const handleGoogleAuthService = async (tokenId) => {
  if (!tokenId) {
    throw { status: 400, message: 'Google tokenId is required' };
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID || '809028962389-buh0m92ilhd1n27vkuhi1og76g9kb5v2.apps.googleusercontent.com',
  });

  const payload = ticket.getPayload();
  const { email } = payload;

  let existingAuth = await Auth.findOne({ email });

  if (!existingAuth) {
    existingAuth = new Auth({
      email,
      authProvider: 'google',
      userType: 'student',
      isEmailVerified: true,
    });
    await existingAuth.save();
  }

  const token = jwt.sign(
    { id: existingAuth._id, email: existingAuth.email },
    process.env.SECRET,
    { expiresIn: '7d' }
  );

  return { auth: existingAuth, token };
};
