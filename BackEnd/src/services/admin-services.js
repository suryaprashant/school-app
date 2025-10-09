import jwt from 'jsonwebtoken';

export const loginAdminService = async ({ email, password }) => {
  // 1. Get the admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // 2. Check if the provided credentials match
  if (email !== adminEmail || password !== adminPassword) {
    // If they don't match, return null to signal failure
    return null;
  }

  // 3. Credentials match, create a JWT
  const token = jwt.sign(
    { email: adminEmail, role: 'admin' }, // Payload
    process.env.SECRET,                 // Secret key
    { expiresIn: '1h' }                      // Token expires in 1 hour
  );

  // 4. Return the generated token
  return token;
};