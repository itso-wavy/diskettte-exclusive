import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/lib/types';
import { User, Follow, IFollow } from '@/models';

export const followUser = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const userToFollow = await User.findOne({ username }).lean();
    if (!userToFollow) {
      return next({
        message: '해당하는 사용자가 없습니다.',
        status: 404,
      });
    }

    let myFollow: IFollow | null = await Follow.findOne({
      user: userId,
    });
    if (!myFollow) {
      const newFollow: IFollow = new Follow({
        user: userId,
      });
      myFollow = await newFollow.save();
    }

    let oppositeFollow: IFollow | null = await Follow.findOne({
      user: userToFollow._id,
    });
    if (!oppositeFollow) {
      const newFollow: IFollow = new Follow({
        user: userToFollow._id,
      });
      oppositeFollow = await newFollow.save();
    }

    const error = { message: '이미 팔로우 중입니다.', status: 400 };
    if (!myFollow.following.includes(userToFollow._id)) {
      myFollow.following.push(userToFollow._id);
    } else return next(error);
    if (!oppositeFollow.followers.includes(userId)) {
      oppositeFollow.followers.push(userId);
    } else return next(error);

    await myFollow.save();
    await oppositeFollow.save();

    req.body.isFollowing = true;
    req.body.followersCount = oppositeFollow.followers.length;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const unfollowUser = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const userToUnfollow = await User.findOne({ username }).lean();
    if (!userToUnfollow) {
      return next({
        message: '해당하는 사용자가 없습니다.',
        status: 404,
      });
    }

    const myFollow = await Follow.findOne({ user: userId });
    const oppositeFollow = await Follow.findOne({
      user: userToUnfollow._id,
    });
    if (!myFollow || !oppositeFollow) {
      return next({ status: 400 });
    }

    const error = { message: '팔로우 중이 아닙니다.', status: 400 };
    if (myFollow.following.includes(userToUnfollow._id)) {
      myFollow.following = myFollow.following.filter(
        user => !user.equals(userToUnfollow._id)
      );
    } else return next(error);
    if (oppositeFollow.followers.includes(userId)) {
      oppositeFollow.followers = oppositeFollow.followers.filter(
        id => !id.equals(userId)
      );
    } else return next(error);

    await myFollow.save();
    await oppositeFollow.save();

    req.body.isFollowing = false;
    req.body.followersCount = oppositeFollow.followers.length;
    return next();
  } catch (err) {
    return next(err);
  }
};
