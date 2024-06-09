import { Response, NextFunction } from 'express';
import { ExpandedRequest } from './ExpandedRequestType';
import jwt from 'jsonwebtoken';

export const authentication = (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next({ status: 401 });
  }

  const token = authHeader!.split(' ')[1]!;
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as jwt.JwtPayload;

    if (!decoded.payload) {
      next({ status: 401 });
    }

    req.user = { _id: decoded.payload };

    next();
    return;
  } catch (err) {
    next({ message: '인증에 실패했습니다.', status: 403 });
  }
};
