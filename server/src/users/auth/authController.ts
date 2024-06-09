import { Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { ExpandedRequest } from '@/middleware/ExpandedRequestType';
import { User, IUser, Follow, IFollow, Bookmark, IBookmark } from '@/db';
import { loginSchema, registerSchema } from './auth-schema';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './token-utils';

export const registerHandler = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, confirmPassword } = registerSchema.parse(
      req.body
    );

    const user = await User.findOne({ username });
    if (user) {
      next({
        message: { username: '중복되는 아이디가 있습니다.' },
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      next({
        message: { confirmPassword: '비밀번호가 일치하지 않습니다.' },
        status: 400,
      });
    }

    const hashedPassword = await argon2.hash(password);

    const newUser: IUser = new User({
      username,
      password: hashedPassword,
      profile: {
        nickname: username,
        image: null,
        description: null,
      },
    });
    await newUser.save();

    const newFollow: IFollow = new Follow({
      user: newUser._id,
      following: [],
      followers: [],
    });
    await newFollow.save();

    const newBookmark: IBookmark = new Bookmark({
      user: newUser._id,
      comments: [],
    });
    await newBookmark.save();

    req.body = { message: 'register seccess!' };
    next();
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username });

    if (!user) {
      next({
        message: { username: '해당하는 아이디가 없습니다.' },
        status: 400,
      });
    }

    const validPassword = await argon2.verify(user!.password, password); // hash, string

    if (validPassword) {
      const accessToken = generateAccessToken(user!._id);
      const refreshToken = generateRefreshToken(user!._id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: true,
        sameSite: 'strict', // CSRF 공격 방지
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
      });

      req.body = {
        username: user!.username,
        accessToken,
        profile: user!.profile,
      };
    } else {
      next({
        message: { password: '비밀번호가 일치하지 않습니다.' },
        status: 400,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const refreshTokenHandler = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    next({
      message: 'no token',
      status: 401,
    });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    next({
      message: 'invalid token',
      status: 403,
    });
  }

  const _id = decoded!.payload;
  const accessToken = generateAccessToken(_id);
  const newRefreshToken = generateRefreshToken(_id);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  req.body = { accessToken };
  next();
};
