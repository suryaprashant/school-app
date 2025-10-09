import { loginAdminService } from '../services/admin-services.js';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Call the service with the email and password
    const token = await loginAdminService({ email, password });

    // 2. Check the result from the service
    if (token) {
      // SUCCESS: The service returned a token
      res.status(200).json({
        status: 'success',
        message: 'Admin login successful',
        token: token,
      });
    } else {
      // FAILURE: The service returned null (invalid credentials)
      res.status(401).json({
        status: 'failed',
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message,
    });
  }
};