interface Comment {
  user: string;
  contents: string;
  createdAt: Date;
}

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
  comments: Comment[] | undefined;
}
