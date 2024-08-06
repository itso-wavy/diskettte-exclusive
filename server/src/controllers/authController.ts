import { Response, NextFunction } from 'express';
import argon2 from 'argon2';
import { ExpandedRequest } from '@/lib/types';
import { User, IUser, Follow, IFollow, Bookmark, IBookmark } from '@/models';
import { loginSchema, registerSchema } from '@/schemas/auth-schema';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '@/lib/utils/token-utils';

export const registerHandler = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, confirmPassword } = registerSchema.parse(
      req.body
    );

    const user = await User.findOne({ username }).lean();
    if (user) {
      return next({
        message: { username: '중복되는 아이디가 있습니다.' },
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      return next({
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
    return next();
  } catch (err) {
    return next(err);
  }
};

export const loginHandler = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username }).lean();
    if (!user) {
      return next({
        message: { username: '해당하는 아이디가 없습니다.' },
        status: 400,
      });
    }

    const validPassword = await argon2.verify(user.password, password); // hash, string
    if (!validPassword) {
      return next({
        message: { password: '비밀번호가 일치하지 않습니다.' },
        status: 400,
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      // secure: true, // 🧹
      sameSite: 'strict', // CSRF 공격 방지
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
    });

    req.body = {
      username: user.username,
      accessToken,
      profile: user.profile,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

export const logoutHandler = async (
  _req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return next();
  } catch (err) {
    return next(err);
  }
};

export const refreshTokenHandler = async (
  req: ExpandedRequest,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return next({
      message: 'no token',
      status: 401,
    });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return next({
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
  return next();
};
