import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/lib/types';
import { User, IUser, Follow } from '@/models';
import { profileSchema } from '@/schemas/profile-schema';

export const getUserProfileDetail = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const profileUser = await User.findOne({ username }).lean();
    const profileFollow = await Follow.findOne({
      user: profileUser?._id,
    }).lean();
    if (!profileUser || !profileFollow) {
      return next({
        message: '해당하는 사용자가 없습니다.',
        status: 404,
      });
    }

    let profileDetail: any = {
      username: profileUser.username,
      profile: profileUser.profile,
      following: profileFollow.following.length,
      followers: profileFollow.followers.length,
    };

    if (userId && profileUser._id.toString() !== userId) {
      profileDetail.isFollowing = !!profileFollow.followers.find(
        (follower: any) => follower.equals(userId)
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

    const user = await User.findById(userId);
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

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { profile: updatedProfile } },
      { new: true }
    );

    if (!updatedUser) {
      return next({ status: 500 });
    }

    req.body.profile = updatedUser.profile;
    return next();
  } catch (err) {
    return next(err);
  }
};
