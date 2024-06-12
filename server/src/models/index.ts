import mongoose, { Model } from 'mongoose';

import { IUser, userSchema } from './UserModel';
import { IPost, postSchema } from './PostModel';
import { ILike, likesSchema } from './LikeModel';
import { IFollow, followSchema } from './FollowModel';
import { IComment, commentSchema } from './CommentModel';
import { IBookmark, bookmarkSchema } from './BookmarkModel';

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);
const Likes: Model<ILike> = mongoose.model<ILike>('Like', likesSchema);
const Follow: Model<IFollow> = mongoose.model<IFollow>('Follow', followSchema);
const Comment: Model<IComment> = mongoose.model<IComment>(
  'Comment',
  commentSchema
);
const Bookmark: Model<IBookmark> = mongoose.model<IBookmark>(
  'Bookmark',
  bookmarkSchema
);

export {
  User,
  type IUser,
  userSchema,
  Post,
  type IPost,
  postSchema,
  Likes,
  type ILike,
  likesSchema,
  Follow,
  type IFollow,
  followSchema,
  Comment,
  type IComment,
  commentSchema,
  Bookmark,
  type IBookmark,
  bookmarkSchema,
};
