import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/lib/types';
import jwt from 'jsonwebtoken';

export const authentication = (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next({ status: 401 });
  }

  const token = authHeader!.split(' ')[1]!;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as jwt.JwtPayload;

    if (!decoded.payload) {
      return next({ status: 401 });
    }

    req.user = { _id: decoded.payload };

    return next();
  } catch (err) {
    return next({ message: '인증에 실패했습니다.', status: 403 });
  }
};
