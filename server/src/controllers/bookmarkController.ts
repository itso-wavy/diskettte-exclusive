import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/lib/types';
import { Bookmark, IBookmark, Post } from '@/models';

export const addBookmark = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params as any;

  try {
    let bookmarks: IBookmark | null = await Bookmark.findOne({ user: userId });
    if (!bookmarks) {
      const newBookmarks: IBookmark = new Bookmark({
        user: userId,
        bookmarks: [],
      });
      bookmarks = await newBookmarks.save();
    }

    const post = await Post.findById(postId);
    if (!post) {
      return next({ status: 404 });
    }

    const error = { message: '이미 북마크 중입니다.', status: 400 };
    if (!bookmarks.bookmarks.includes(post._id)) {
      bookmarks.bookmarks.push(post._id);
    } else return next(error);
    if (!post.bookmarks.includes(userId)) {
      post.bookmarks.push(userId);
    } else return next(error);

    await bookmarks.save();
    await post.save();

    req.body.isBookmarked = true;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const removeBookmark = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params as any;

  try {
    const bookmarks = await Bookmark.findOne({ user: userId });
    const post = await Post.findById(postId);
    if (!bookmarks || !post) {
      return next({ status: 404 });
    }

    const error = { message: '북마크 중이 아닙니다.', status: 400 };
    if (bookmarks.bookmarks.includes(post._id)) {
      bookmarks.bookmarks = bookmarks.bookmarks.filter(
        post => !post.equals(post._id)
      );
    } else return next(error);
    if (post.bookmarks.includes(userId)) {
      post.bookmarks = post.bookmarks.filter(user => !user.equals(userId));
    } else return next(error);

    await bookmarks.save();
    await post.save();

    req.body.isBookmarked = false;
    return next();
  } catch (err) {
    return next(err);
  }
};
