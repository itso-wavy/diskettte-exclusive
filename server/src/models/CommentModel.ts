import { Document, Schema, Types } from 'mongoose';

export interface IComment extends Document {
  post: Types.ObjectId;
  comments: {
    user: Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
}

export const commentSchema: Schema<IComment> = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  comments: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

commentSchema.index({ post: 1 });
