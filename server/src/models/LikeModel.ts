import { Document, Schema, Types } from 'mongoose';

export interface ILike extends Document {
  post: Types.ObjectId;
  likes: Types.ObjectId[];
}

export const likesSchema: Schema<ILike> = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
