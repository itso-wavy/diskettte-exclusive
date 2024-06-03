import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: { _id: string };
}

export const authentication = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const token = authHeader.split(' ')[1]!;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as jwt.JwtPayload;

    if (!decoded.payload) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    req.user = { _id: decoded.payload };

    next();
    return;
  } catch (err) {
    return res.status(403).json({ message: '인증에 실패했습니다.' });
  }
};
