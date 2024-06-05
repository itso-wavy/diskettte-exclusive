import { Model } from 'mongoose';
import { connectToDB } from '@/db/connect';
import { userSchema, type IUser } from '@/users/auth/UserModel';
import { followSchema, type IFollow } from '@/users/follow/FollowModel';
import { bookmarkSchema, type IBookmark } from '@/users/bookmark/BookmarkModel';

import { postSchema, type IPost } from '@/posts/post/PostModel';
import { likesSchema, type ILike } from '@/posts/likes/LikeModel';
import { commentSchema, type IComment } from '@/posts/comment/CommentModel';

let User: Model<IUser>;
let Follow: Model<IFollow>;
let Bookmark: Model<IBookmark>;

let Post: Model<IPost>;
let Likes: Model<ILike>;
let Comment: Model<IComment>;

connectToDB()
  .then(({ usersConnection, postsConnection }) => {
    User = usersConnection.model<IUser>('User', userSchema);
    Follow = usersConnection.model<IFollow>('Follow', followSchema);
    Bookmark = usersConnection.model<IBookmark>('Bookmark', bookmarkSchema);

    Post = postsConnection.model<IPost>('Post', postSchema);
    Likes = usersConnection.model<ILike>('Likes', likesSchema);
    Comment = postsConnection.model<IComment>('Comment', commentSchema);
  })
  .catch(err => console.error(err));

export {
  User,
  userSchema,
  type IUser,
  Follow,
  followSchema,
  type IFollow,
  Bookmark,
  bookmarkSchema,
  type IBookmark,
  Post,
  postSchema,
  type IPost,
  Likes,
  likesSchema,
  type ILike,
  Comment,
  commentSchema,
  type IComment,
};
