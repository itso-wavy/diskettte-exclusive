import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAccessToken = (payload: string) => {
  return jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (payload: string) => {
  return jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '14d',
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as jwt.JwtPayload;

    return decoded;
  } catch (err) {
    return null;
  }
};
