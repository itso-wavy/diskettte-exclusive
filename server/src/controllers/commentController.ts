import { NextFunction, Response } from 'express';
import { Types } from 'mongoose';
import { ExpandedRequest } from '@/lib/types';
import { Comment } from '@/models';
import { commentSchema } from '@/schmas/post-schema';

export const getPostComments = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.findOne({ post: postId }).populate({
      path: 'comments',
      populate: {
        path: 'writer',
      },
    });
    if (!comments) {
      return next({ status: 404 });
    }

    req.body.post.comments = comments.comments;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const createComment = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const { content } = commentSchema.parse(req.body);

    const newComment = {
      _id: new Types.ObjectId(),
      writer: userId,
      content,
      createdAt: new Date(),
    };

    const comments = await Comment.findOneAndUpdate(
      { post: postId },
      { $push: { comments: newComment } },
      { new: true }
    );

    req.body.comments = comments;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const editComment = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId, commentId } = req.params;

  try {
    const { content } = commentSchema.parse(req.body);

    const comments = await Comment.findOne({ post: postId });
    if (!comments) {
      return next({ status: 404 });
    }

    const comment = comments.comments.find(
      comment => comment._id.toString() === commentId
    );
    if (!comment) {
      return next({ status: 404 });
    }

    if (comment.writer.toString() !== userId) {
      return next({ status: 403 });
    }

    comment.content = content;

    const updatedComments = (await Comment.findOneAndUpdate(
      { post: postId },
      { $set: { comments: comments.comments } },
      { new: true }
    ))!;

    req.body.comments = updatedComments.comments;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const deleteComment = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId, commentId } = req.params;

  try {
    const comments = await Comment.findOne({ post: postId });
    if (!comments) {
      return next({ status: 404 });
    }

    const comment = comments.comments.find(
      comment => comment._id.toString() === commentId
    );
    if (!comment) {
      return next({ status: 404 });
    }

    if (comment.writer.toString() !== userId) {
      return next({ status: 403 });
    }

    comments.comments = comments.comments.filter(
      comment => comment._id.toString() !== commentId
    );

    const updatedComments = (await Comment.findOneAndUpdate(
      { post: postId },
      { $set: { comments: comments.comments } },
      { new: true }
    ))!;

    req.body.comments = updatedComments.comments;
    return next();
  } catch (err) {
    return next(err);
  }
};
