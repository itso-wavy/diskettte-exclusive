import { Model } from 'mongoose';
import { connectToDB } from '@/db/connect';
import { userSchema, type IUser } from '@/auth/UserModel';
import { postSchema, type IPost } from '@/post/PostModel';

let User: Model<IUser>;
let Post: Model<IPost>;

connectToDB()
  .then(({ usersConnection, postsConnection }) => {
    User = usersConnection.model<IUser>('User', userSchema);
    Post = postsConnection.model<IPost>('Article', postSchema);
  })
  .catch(err => console.error(err));

export { User, userSchema, type IUser, Post, postSchema, type IPost };
