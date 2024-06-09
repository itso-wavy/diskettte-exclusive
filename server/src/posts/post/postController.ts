import { NextFunction, Response } from 'express';
import { ExpandedRequest } from '@/middleware/ExpandedRequestType';
import { postContentsSchema } from './post-schema';
import {
  Post,
  IPost,
  User,
  Follow,
  Likes,
  ILike,
  Comment,
  IComment,
  Bookmark,
} from '@/db';

const getFormattedPost = async (post: IPost, userId: string | undefined) => {
  const writer = (await User.findById(post.writer))!;
  const likes = await Likes.findOne({ post: post._id });
  const comments = await Comment.findOne({ post: post._id });
  const bookmarks = userId ? await Bookmark.findOne({ user: userId }) : null;

  return {
    _id: post.id,
    writer: {
      username: writer.username,
      profile: writer.profile,
    },
    contents: post.contents,
    createdAt: post.createdAt,
    isLiked: userId
      ? likes?.likes.some(user => user.toString() === userId)
      : false,
    likesCount: likes?.likes.length,
    commentsCount: comments?.comments.length,
    isBookmarked: bookmarks?.bookmarks.some(post => post === post._id),
  };
};

export const getPosts = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const formattedPosts = await Promise.all(
      posts.map(async (post: IPost) => getFormattedPost(post, userId))
    );

    let otherUserPosts;
    if (userId) {
      const authedUser = await User.findById(userId);

      otherUserPosts = formattedPosts.filter(
        post => post.writer.username !== authedUser?.username
      );
    }

    req.body.posts = otherUserPosts || formattedPosts;
    next();
  } catch (err) {
    next(err);
  }
};

export const getFollowingPosts = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;

  try {
    const followData = await Follow.findOne({ user: userId }).select(
      'following'
    );
    const followingIds = followData?.following || [];

    const posts = await Post.find({
      user: { $in: followingIds },
    }).sort({ createdAt: -1 });

    const formattedPosts = await Promise.all(
      posts.map(async (post: IPost) => getFormattedPost(post, userId))
    );

    req.body.posts = formattedPosts;
    next();
  } catch (err) {
    next(err);
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
    const writer = (await User.findOne({ username }))!;
    if (!writer) {
      next({ message: '해당하는 사용자를 찾을 수 없습니다.', status: 404 });
    }

    const posts = await Post.find({ writer: writer._id }).sort({
      createdAt: -1,
    });

    const formattedPosts = await Promise.all(
      posts.map(async (post: IPost) => getFormattedPost(post, userId))
    );

    req.body.posts = formattedPosts;
    next();
  } catch (err) {
    next(err);
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
    const post = await Post.findById(postId);

    const writer = (await User.findById(post!.writer))!;
    if (username !== writer.username) {
      next({ status: 404 });
    }

    const formattedPost = await getFormattedPost(post!, userId);

    req.body.post = formattedPost;
    next();
  } catch (err) {
    next(err);
  }
};

export const createPost = async (
  req: ExpandedRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      next({ status: 404 });
    }

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
    await newLikes.save();

    const newComments: IComment = new Comment({
      post: savedPost._id,
      comments: [],
    });
    await newComments.save();

    req.body.post = savedPost;
    next();
  } catch (err) {
    next(err);
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
      next({ status: 404 });
    }

    if (post!.writer.toString() !== userId) {
      next({ status: 403 });
    }

    post!.contents = { text, images };

    const updatedPost = await post!.save();

    req.body.text = updatedPost.contents.text;
    req.body.images = updatedPost.contents.images;
    next();
  } catch (err) {
    next(err);
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
      next({ status: 404 });
    }

    if (post!.writer.toString() !== userId) {
      next({ status: 403 });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      next({ status: 404 });
    }

    await Likes.findOneAndDelete({ post: deletedPost!._id });
    await Comment.findOneAndDelete({ post: deletedPost!._id });

    req.body.post = deletedPost;
    next();
  } catch (err) {
    next(err);
  }
};
