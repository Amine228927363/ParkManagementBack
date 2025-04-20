// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkAuth = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
      }
      
      // Verify token
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
      
      // Find user
      const user = await prisma.user.findUnique({
        where: { id: Number(decoded.userId) }
      });
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      // Check role if roles are specified
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }
      
      // Add user data to request object
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.error('Authentication error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};