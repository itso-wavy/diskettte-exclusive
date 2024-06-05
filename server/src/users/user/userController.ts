import { Request, Response } from 'express';
import { Post, IPost, Likes, Comment } from '@/db';

export const getUserInfo = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    // const formattedPosts = await Promise.all(
    //   posts.map(async (post: IPost) => {
    //     if (post.writer.toString() === userId) return;

    //     const writer = (await User.findById(post.writer))!;
    //     const likes = await Likes.find({ post: post._id });
    //     const comments = await Comment.find({ post: post._id });

    //     return {
    //       _id: post.id,
    //       writer: {
    //         username: writer.username,
    //         profile: writer.profile,
    //       },
    //       contents: post.contents,
    //       isLiked: userId
    //         ? likes.some(user => user.toString() === userId)
    //         : false,
    //       likesCount: likes.length,
    //       commentsCount: comments.length,
    //     };
    //   })
    // );

    // return res.send(formattedPosts);
    return res.send();
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error', err });
  }
};
