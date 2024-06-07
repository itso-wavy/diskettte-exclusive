import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  profile: {
    nickname: string | null;
    image: string | null;
    description: string | null;
  };
  createdAt: Date;
}

export const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    nickname: { type: String, default: null },
    image: { type: String, default: null },
    description: { type: String, default: null },
  },
  createdAt: { type: Date, default: Date.now },
});
