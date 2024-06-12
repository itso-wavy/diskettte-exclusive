import { Document, Schema, Types } from 'mongoose';

export interface IPost extends Document {
  writer: Types.ObjectId;
  contents: {
    text: string | null;
    images: string[] | null;
  };
  createdAt: Date;
  likes: Types.ObjectId;
  comments: Types.ObjectId;
  bookmarks: Types.ObjectId[];
}

export const postSchema: Schema<IPost> = new Schema(
  {
    writer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    contents: {
      text: {
        type: String,
        required: function () {
          return !this.contents.images?.length;
        },
      },
      images: [{ type: String }],
    },
    likes: { type: Schema.Types.ObjectId, ref: 'Like' },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    validateBeforeSave: true,
  }
);
