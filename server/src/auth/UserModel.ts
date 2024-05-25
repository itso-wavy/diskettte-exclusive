import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

export const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
