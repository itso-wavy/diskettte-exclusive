import { Document, Schema, Types } from 'mongoose';

export interface IComment extends Document {
  post: Types.ObjectId;
  comments: {
    _id: Types.ObjectId;
    writer: Types.ObjectId;
    content: string;
    createdAt: Date;
  }[];
}

export const commentSchema: Schema<IComment> = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  comments: [
    {
      _id: { type: Schema.Types.ObjectId, default: Types.ObjectId },
      writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

commentSchema.path('comments._id').index({ unique: true });
