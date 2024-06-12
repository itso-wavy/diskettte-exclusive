import { NextFunction, Response } from 'express';
import { ExpandedRequest } from '@/lib/types';
import { User, Comment, IComment } from '@/models';

export const getPostComments = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findOne({ post: postId }).lean();
    if (!comments) {
      return next({ message: '문서를 찾을 수 없습니다.', status: 404 });
    }

    const formattedComments = comments?.comments.map(async comment => ({
      ...comment,
      user: await User.findById(comment.user),
    }));

    req.body.comments = formattedComments;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const addComment = async (_req: ExpandedRequest, _res: Response) => {
  // let comments: IComment | null = await Comment.findOne({
  //   post: postId,
  // }).lean();
  // if (!comments) {
  //   const newComments: IComment = new Comment({
  //     post: postId,
  //     comments: [],
  //   });
  //   comments = await newComments.save();
  // }
};

export const removeComment = async (
  _req: ExpandedRequest,
  _res: Response
) => {};
