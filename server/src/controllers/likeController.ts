import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/lib/types';
import { Likes, ILike, Post } from '@/models';

export const addLike = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    let likes: ILike | null = await Likes.findOne({ post: postId });
    if (!likes) {
      const newLikes: ILike = new Likes({
        post: postId,
        likes: [],
      });
      likes = await newLikes.save();

      const post = await Post.findById(postId);
      if (!post) {
        return next({ status: 404 });
      }

      post.likes = likes._id;

      await post.save();
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
