import jwt from 'jsonwebtoken';
import Admin from '../models/admin-model.js';
import dotenv from 'dotenv';
dotenv.config();

export const protectAdmin = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.userType !== 'admin') {
            return res.status(403).json({ message: 'Not an admin' });
        }

        req.admin = await Admin.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};
