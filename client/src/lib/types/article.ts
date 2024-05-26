import { ObjectId } from 'mongoose';

export interface Article {
  _id: ObjectId;
  title: string;
  cover: string;
  intro: string | null;
  content: string;
  author: ObjectId;
  createdAt: Date;
}
