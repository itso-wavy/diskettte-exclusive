import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/middleware/ExpandedRequestType';
import { IUser, User, Follow } from '@/db';
import { profileSchema } from './profile-schema';

export const getUserProfileDetail = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      next({
        message: '해당하는 사용자가 없습니다.',
        status: 404,
      });
    }

    const follow = await Follow.findOne({ user: user!._id });

    let profileDetail: any = {
      username: user!.username,
      profile: user!.profile,
      following: follow?.following.length,
      followers: follow?.followers.length,
    };

    if (user!._id.toString() !== userId) {
      profileDetail.isFollowing = true;
    }

    req.body.profile = profileDetail;
    next();
  } catch (err) {
    next(err);
  }
};

export const editUserProfile = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id;

    const user = await User.findById(userId).select('profile');
    if (!user) {
      next({
        message: '해당하는 사용자가 없습니다.',
        status: 404,
      });
    }

    const { nickname, image, description } = profileSchema.parse(req.body);

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

    req.body.profile = updatedUser!.profile;
    next();
  } catch (err) {
    next(err);
  }
};
