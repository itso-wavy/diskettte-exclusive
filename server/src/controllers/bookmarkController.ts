import { Response, NextFunction } from 'express';
import { ExpandedRequest } from '@/lib/types';
import { Bookmark, IBookmark } from '@/models';

export const addBookmark = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params as any;

  try {
    let bookmarks: IBookmark | null = await Bookmark.findOne({
      user: userId,
    }).lean();
    if (!bookmarks) {
      const newFollow: IBookmark = new Bookmark({
        user: userId,
        comments: [],
      });
      bookmarks = await newFollow.save();
    }

    if (!bookmarks.bookmarks.includes(postId)) {
      bookmarks.bookmarks.push(postId);
    } else return next({ message: '이미 북마크 중입니다.', status: 400 });

    await bookmarks.save();

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
    const bookmarks = await Bookmark.findOne({ user: userId }).lean();
    if (!bookmarks) {
      return next({ status: 404 });
    }

    if (bookmarks.bookmarks.includes(postId!)) {
      bookmarks.bookmarks = bookmarks.bookmarks.filter(
        post => !post.equals(postId)
      );
    } else return next({ message: '북마크 중이 아닙니다.', status: 400 });

    await bookmarks.save();

    req.body.isBookmarked = false;
    return next();
  } catch (err) {
    return next(err);
  }
};
