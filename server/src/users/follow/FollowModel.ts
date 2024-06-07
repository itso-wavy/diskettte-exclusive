import { Document, Schema, Types } from 'mongoose';

export interface IFollow extends Document {
  user: Types.ObjectId;
  following: Types.ObjectId[];
  followers: Types.ObjectId[];
}

export const followSchema: Schema<IFollow> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
