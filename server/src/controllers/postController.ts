import { NextFunction, Response } from 'express';
import { FilterQuery } from 'mongoose';
import { ExpandedRequest } from '@/lib/types';
import {
  User,
  Post,
  IPost,
  Likes,
  ILike,
  Comment,
  IComment,
  Follow,
  Bookmark,
} from '@/models';
import { postContentsSchema } from '@/schmas/post-schema';

const getFormattedPost = (post: any, userId: string | undefined) => {
  return {
    _id: post._id,
    writer: {
      username: post.writer.username,
      profile: post.writer.profile,
    },
    createdAt: post.createdAt,
    contents: post.contents,
    isLiked: userId
      ? post.likes.likes.some((user: any) => user.equals(userId))
      : false,
    likesCount: post.likes.likes.length,
    commentsCount: post.comments.length,
    isBookmarked: userId
      ? post.bookmarks.some((user: any) => user.equals(userId))
      : false,
  };
};

const getPopulatedPosts = async (query: FilterQuery<IPost>) => {
  return await Post.find(query)
    .sort({ createdAt: -1 })
    .populate('writer', 'username profile')
    .populate('likes', 'likes')
    .populate('comments', 'comments')
    .lean();
};

export const getPosts = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const query = userId ? { writer: { $ne: userId } } : {};

    const posts = await getPopulatedPosts(query);
    const formattedPosts = posts.map((post: IPost) =>
      getFormattedPost(post, userId)
    );

    req.body.posts = formattedPosts;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getFollowingPosts = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const follow = (await Follow.findOne({ user: userId })
      .populate('following')
      .lean())!;
    const query = { writer: { $in: follow.following } };

    const posts = await getPopulatedPosts(query);
    const formattedPosts = posts.map((post: IPost) =>
      getFormattedPost(post, userId)
    );

    req.body.posts = formattedPosts;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getUserPosts = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const writer = await User.findOne({ username }).lean();
    if (!writer) {
      return next({
        message: '해당하는 사용자를 찾을 수 없습니다.',
        status: 404,
      });
    }

    const query = { writer: writer._id };

    const posts = await getPopulatedPosts(query);
    const formattedPosts = posts.map((post: IPost) =>
      getFormattedPost(post, userId)
    );

    req.body.posts = formattedPosts;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getUserBookmarkPosts = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).lean();
    if (!userId || !user || !user._id.equals(userId)) {
      return next({ status: 404 });
    }

    const bookmarks = (await Bookmark.findOne({ user: userId }).lean())!;
    const postIds = bookmarks.bookmarks;
    const query = { _id: { $in: postIds } };

    const posts = await getPopulatedPosts(query);
    const formattedPosts = posts.map((post: IPost) =>
      getFormattedPost(post, userId)
    );

    req.body.posts = formattedPosts;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const getPost = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { username, postId } = req.params;

  try {
    const query = { _id: postId };
    const [post] = await getPopulatedPosts(query);
    if (!post || username !== (post.writer as any).username) {
      return next({ status: 404 });
    }

    const formattedPost = getFormattedPost(post, userId);

    req.body.post = formattedPost;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const createPost = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const { text } = postContentsSchema.parse(req.body);
    // const { text, images } = postContentsSchema.parse(req.body);
    // const images = req.body.images;

    const newPost: IPost = new Post({
      writer: userId,
      contents: {
        text,
        images: [],
      },
    });
    const savedPost = await newPost.save();

    const newLikes: ILike = new Likes({
      post: savedPost._id,
      likes: [],
    });
    const savedLikes = await newLikes.save();

    const newComments: IComment = new Comment({
      post: savedPost._id,
      comments: [],
    });
    const savedComments = await newComments.save();

    savedPost.likes = savedLikes._id;
    savedPost.comments = savedComments._id;
    await savedPost.save();

    req.body.post = savedPost;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const editPost = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const { text } = postContentsSchema.parse(req.body);
    const images: string[] = [];
    // const { title, intro, content } = postSchema.parse(req.body);
    // const cover = req.body.cover;

    const post = await Post.findById(postId);
    if (!post) {
      return next({ status: 404 });
    }

    if (post.writer.toString() !== userId) {
      return next({ status: 403 });
    }

    post.contents = { text, images };

    const updatedPost = await post.save();

    req.body.text = updatedPost.contents.text;
    req.body.images = updatedPost.contents.images;
    return next();
  } catch (err) {
    return next(err);
  }
};

export const deletePost = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return next({ status: 404 });
    }

    if (post.writer.toString() !== userId) {
      return next({ status: 403 });
    }

    const deletedPost = (await Post.findByIdAndDelete(postId))!;
    if (!deletedPost) {
      return next({ status: 404 });
    }

    await Likes.findOneAndDelete({ _id: deletedPost.likes });
    await Comment.findOneAndDelete({ _id: deletedPost.comments });

    req.body.post = deletedPost;
    return next();
  } catch (err) {
    return next(err);
  }
};
