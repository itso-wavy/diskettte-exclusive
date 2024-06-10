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
    const profileUser = await User.findOne({ username });
    if (!profileUser) {
      return next({
        message: '해당하는 사용자가 없습니다.',
        status: 404,
      });
    }

    const profileFollow = (await Follow.findOne({ user: profileUser._id }))!;

    let profileDetail: any = {
      username: profileUser.username,
      profile: profileUser.profile,
      following: profileFollow?.following.length,
      followers: profileFollow?.followers.length,
    };

    if (userId && profileUser._id.toString() !== userId) {
      profileDetail.isFollowing = profileFollow.followers.some(
        follower => follower.toString() === userId
      );
    }

    req.body.profileDetail = profileDetail;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const editUserProfile = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    const user = await User.findById(userId).select('profile');
    if (!user) {
      return next({
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

    const updatedUser = (await User.findByIdAndUpdate(
      userId,
      { $set: { profile: updatedProfile } },
      { new: true } // 반환 값은 업데이트 후의 문서
    ))!;

    req.body.profile = updatedUser.profile;
    return next();
  } catch (err) {
    return next(err);
  }
};
