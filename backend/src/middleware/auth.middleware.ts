import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// ✅ Define the AuthenticatedRequest interface (extending Express Request)
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

// ✅ JWT Authentication Middleware
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'No token provided, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
    (req as AuthenticatedRequest).user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};