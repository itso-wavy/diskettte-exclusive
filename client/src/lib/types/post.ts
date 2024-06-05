// import { ObjectId } from 'mongoose';

interface Comment {
  // user: ObjectId;
  user: string;
  contents: string;
  createdAt: Date;
}

export interface Post {
  // _id: ObjectId;
  _id: string;
  writer: {
    username: string;
    profile: {
      nickname: string;
      image: string | null;
      description: string | null;
    };
  };
  createdAt: Date;
  contents: {
    text: string | undefined;
    images: string[] | undefined;
  };
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  comments: Comment[] | undefined;
}
