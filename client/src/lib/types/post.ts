import { ProfileDetail } from './user';

export interface Post {
  _id: string;
  writer: {
    username: string;
    profile: {
      nickname: string;
      image: string | null;
      description: string | null;
    };
  };
  contents: {
    text: string | undefined;
    images: string[] | undefined;
  };
  createdAt: Date;
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  isBookmarked: boolean;
}

export interface Comment {
  _id: string;
  writer: Pick<ProfileDetail, 'username' | 'profile'>;
  content: string;
  createdAt: Date;
}
