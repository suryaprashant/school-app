import { OAuth2Client } from 'google-auth-library';

export const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || '809028962389-buh0m92ilhd1n27vkuhi1og76g9kb5v2.apps.googleusercontent.com'
);