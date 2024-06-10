import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/middleware/ExpandedRequestType';
import { Likes } from '@/db';

export const addLike = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const likes = await Likes.findOne({ post: postId });
    if (!likes) {
      return next({ status: 404 });
    }

    if (!likes.likes.includes(userId)) {
      likes.likes.push(userId);
    } else return next({ message: '이미 좋아요 중입니다.', status: 400 });

    await likes.save();

    req.body.isLiked = true;
    req.body.likesCount = likes.likes.length;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const removeLike = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const likes = await Likes.findOne({ post: postId });
    if (!likes) {
      return next({ status: 404 });
    }

    if (likes.likes.includes(userId)) {
      likes.likes = likes.likes.filter(user => !user.equals(userId));
    } else return next({ message: '좋아요 중이 아닙니다.', status: 400 });

    await likes.save();

    req.body.isLiked = false;
    req.body.likesCount = likes.likes.length;
    return next();
  } catch (err) {
    return next(err);
  }
};
