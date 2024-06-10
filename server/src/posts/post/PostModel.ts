import { Document, Schema, Types } from 'mongoose';

export interface IPost extends Document {
  writer: Types.ObjectId;
  contents: {
    text: string | null;
    images: string[] | null;
  };
  createdAt: Date;
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
  },
  {
    validateBeforeSave: true,
  }
);
