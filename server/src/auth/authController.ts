import { Request, Response } from 'express';
import argon2 from 'argon2';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '@/db';
import { IUser } from './UserModel';
import { loginSchema, registerSchema } from './auth-schema';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './token-utils';

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword } = registerSchema.parse(
      req.body
    );

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .send(JSON.stringify({ username: '중복되는 아이디가 있습니다.' }));
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send(
          JSON.stringify({ confirmPassword: '비밀번호가 일치하지 않습니다.' })
        );
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

    return res
      .status(201)
      .send(JSON.stringify({ message: 'register seccess!' }));
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json(err.flatten().fieldErrors);
    }

    return res.status(500).send(
      JSON.stringify({
        general: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
      })
    );
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .send(JSON.stringify({ username: '해당하는 아이디가 없습니다.' }));
    }

    const validPassword = await argon2.verify(user.password, password); // hash, string

    if (validPassword) {
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // secure: true,
        sameSite: 'strict', // CSRF 공격 방지
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30일
      });

      console.log('💛', user);
      return res.json({
        accessToken,
        profile: user.profile,
      });
    } else {
      return res
        .status(400)
        .send(JSON.stringify({ password: '비밀번호가 일치하지 않습니다.' }));
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json(err.flatten().fieldErrors);
    }

    return res.status(500).send(
      JSON.stringify({
        general: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
      })
    );
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'no token' });
  }

  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) {
    return res.status(403).json({ message: 'invalid token' });
  }

  const _id = decoded.payload;
  const accessToken = generateAccessToken(_id);
  const newRefreshToken = generateRefreshToken(_id);

  res.cookie('refreshToken', newRefreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.json({ accessToken });
};
