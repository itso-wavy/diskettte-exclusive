import { Response } from 'express';
import {
  Post,
  IPost,
  Follow,
  Likes,
  Comment,
  User,
  Bookmark,
  ILike,
  IComment,
} from '@/db';
import { postContentsSchema } from './post-schema';
import { AuthenticatedRequest } from '@/middleware/authentication';

const getFormattedPost = async (post: IPost, userId: string | undefined) => {
  const writer = (await User.findById(post.writer))!;
  const likes = await Likes.find({ post: post._id });
  const comments = await Comment.find({ post: post._id });
  const bookmarks = userId ? await Bookmark.find({ user: userId }) : [];

  return {
    _id: post.id,
    writer: {
      username: writer.username,
      profile: writer.profile,
    },
    contents: post.contents,
    createdAt: post.createdAt,
    isLiked: userId ? likes.some(user => user.toString() === userId) : false,
    likesCount: likes.length,
    commentsCount: comments.length,
    isBookmarked: bookmarks.some(post => post.toString() === post._id),
  };
};

export const getPosts = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;

  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    // const formattedPosts = await Promise.all(
    //   posts.map(async (post: IPost) => {
    //     if (post.writer.toString() === userId) return;

    //     const writer = (await User.findById(post.writer))!;
    //     const likes = await Likes.find({ post: post._id });
    //     const comments = await Comment.find({ post: post._id });
    //     const bookmarks = userId ? await Bookmark.find({ user: userId }) : [];

    //     return {
    //       _id: post.id,
    //       writer: {
    //         username: writer.username,
    //         profile: writer.profile,
    //       },
    //       createdAt: post.createdAt,
    //       contents: post.contents,
    //       isLiked: userId
    //         ? likes.some(user => user.toString() === userId)
    //         : false,
    //       likesCount: likes.length,
    //       commentsCount: comments.length,
    //       isBookmarked: bookmarks.some(post => post.toString() === post._id),
    //     };
    //   })
    // );

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

    return res.send(otherUserPosts || formattedPosts);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};

export const getFollowingPosts = async (
  req: AuthenticatedRequest,
  res: Response
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

    // const formattedPosts = await Promise.all(
    //   posts.map(async (post: IPost) => {
    //     const writer = (await User.findById(post.writer))!;
    //     const likes = await Likes.find({ post: post._id });
    //     const comments = await Comment.find({ post: post._id });
    //     const bookmarks = userId ? await Bookmark.find({ user: userId }) : [];

    //     return {
    //       _id: post.id,
    //       writer: {
    //         username: writer.username,
    //         profile: writer.profile,
    //       },
    //       contents: post.contents,
    //       createdAt: post.createdAt,
    //       isLiked: userId
    //         ? likes.some(user => user.toString() === userId)
    //         : false,
    //       likesCount: likes.length,
    //       commentsCount: comments.length,
    //       isBookmarked: bookmarks.some(post => post.toString() === post._id),
    //     };
    //   })
    // );

    const formattedPosts = await Promise.all(
      posts.map(async (post: IPost) => getFormattedPost(post, userId))
    );

    return res.send(formattedPosts);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserPosts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;
  const { username } = req.params;

  try {
    const writer = (await User.findOne({ username }))!;
    if (!writer) {
      return res
        .status(404)
        .json({ error: '해당하는 사용자를 찾을 수 없습니다.' });
    }

    const posts = await Post.find({ writer: writer._id }).sort({
      createdAt: -1,
    });

    // const formattedPosts = await Promise.all(
    //   posts.map(async (post: IPost) => {
    //     const writer = (await User.findById(post.writer))!;
    //     const likes = await Likes.find({ post: post._id });
    //     const comments = await Comment.find({ post: post._id });
    //     const bookmarks = userId ? await Bookmark.find({ user: userId }) : [];

    //     return {
    //       _id: post.id,
    //       writer: {
    //         username: writer.username,
    //         profile: writer.profile,
    //       },
    //       contents: post.contents,
    //       createdAt: post.createdAt,
    //       isLiked: userId
    //         ? likes.some(user => user.toString() === userId)
    //         : false,
    //       likesCount: likes.length,
    //       commentsCount: comments.length,
    //       isBookmarked: bookmarks.some(post => post.toString() === post._id),
    //     };
    //   })
    // );

    const formattedPosts = await Promise.all(
      posts.map(async (post: IPost) => getFormattedPost(post, userId))
    );

    return res.send(formattedPosts);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getPost = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const { username, postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    const writer = (await User.findById(post.writer))!;
    if (username !== writer.username) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    const formattedPost = async (post: IPost) => getFormattedPost(post, userId);

    return res.send(formattedPost);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};

export const getPostComments = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;
  const { username, postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    const writer = (await User.findById(post.writer))!;
    if (username !== writer.username) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    // TODO:
    // .map(comment => ({
    //   user: comment.user,
    //   contents: comment.contents,
    //   createdAt: comment.createdAt,
    // }));

    const formattedPost = async (post: IPost) => getFormattedPost(post, userId);

    return res.send(formattedPost);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};

export const createPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
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

    return res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};

export const editPost = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const { text } = postContentsSchema.parse(req.body);
    const images: string[] = [];
    // const { title, intro, content } = postSchema.parse(req.body);
    // const cover = req.body.cover;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    if (post.writer.toString() !== userId) {
      return res.status(403).json({ error: '권한이 없습니다.' });
    }

    post.contents = { text, images };

    const updatedPost = await post.save();

    return res.json(updatedPost);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    if (post.writer.toString() !== userId) {
      return res.status(403).json({ error: '권한이 없습니다.' });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: '문서를 찾을 수 없습니다.' });
    }

    await Likes.findOneAndDelete({ post: deletedPost._id });
    await Comment.findOneAndDelete({ post: deletedPost._id });

    return res.json(deletedPost);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};
