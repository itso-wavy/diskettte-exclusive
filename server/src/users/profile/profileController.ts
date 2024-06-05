import { Response } from 'express';
import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

import { AuthenticatedRequest } from '@/middleware/authentication';
import { IUser, User } from '@/db';
import { profileSchema } from './profile-schema';

export const editProfileHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { nickname, image, description } = profileSchema.parse(req.body);

    const userId = req.user!._id;

    const updatedProfile: Partial<IUser['profile']> = {
      nickname,
      image,
      description,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { profile: updatedProfile } },
      { new: true } // 반환 값은 업데이트 후의 문서
    );

    if (!updatedUser) {
      return res.status(404).json({ message: '해당하는 사용자가 없습니다.' });
    }

    return res.status(200).json({
      profile: updatedUser.profile,
      message: 'profile updated!',
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.flatten().fieldErrors);

      return res.status(400).json(err.flatten().fieldErrors);
    }

    return res.status(500).send(
      JSON.stringify({
        general: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
      })
    );
  }
};

export const getProfileHandler = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId).select('profile');

    if (!user) {
      return res.status(404).json({ message: '해당하는 사용자가 없습니다.' });
    }

    return res.status(200).json({ profile: user.profile });
  } catch (err) {
    return res.status(500).send(
      JSON.stringify({
        general: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
      })
    );
  }
};
