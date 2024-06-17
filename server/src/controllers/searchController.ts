import { Response, NextFunction } from 'express';
import { FilterQuery } from 'mongoose';
import { ExpandedRequest } from '@/lib/types';
import { Follow, IUser, User } from '@/models';

export const searchUsers = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { keyword } = req.query;

  try {
    let searchCriteria: FilterQuery<IUser> = {};
    if (keyword !== 'undefined') {
      searchCriteria = {
        $or: [
          { username: { $regex: keyword, $options: 'i' } },
          { 'profile.nickname': { $regex: keyword, $options: 'i' } },
        ],
      };
    }
    const users = await User.find(searchCriteria)
      .sort({ createdAt: -1 })
      .lean();

    const userProfiles = await Promise.all(
      users.map(async user => {
        try {
          const profileFollow = await Follow.findOne({ user: user._id }).lean();
          if (!profileFollow) {
            return next({ status: 404 });
          }

          let profileDetail: any = {
            username: user.username,
            profile: user.profile,
            following: profileFollow.following.length,
            followers: profileFollow.followers.length,
          };

          if (userId && user._id.toString() !== userId) {
            profileDetail.isFollowing = !!profileFollow.followers.find(
              (follower: any) => follower.equals(userId)
            );
          }

          return profileDetail;
        } catch (err) {
          console.error('Error in user mapping:', err);
          return null;
        }
      })
    );

    req.body.result = userProfiles;
    return next();
  } catch (err) {
    return next(err);
  }
};
