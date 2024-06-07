import { Document, Schema, Types } from 'mongoose';

export interface IBookmark extends Document {
  user: Types.ObjectId;
  bookmarks: Types.ObjectId[];
}

export const bookmarkSchema: Schema<IBookmark> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});
