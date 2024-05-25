import { Model } from 'mongoose';
import { connectToDB } from '@/db/connect';
connectToDB();
import { userSchema, type IUser } from '@/auth/UserModel';

let User: Model<IUser>;

connectToDB()
  .then(({ usersConnection }) => {
    User = usersConnection.model<IUser>('User', userSchema);
  })
  .catch(err => console.error(err));

export { User, userSchema, type IUser };
