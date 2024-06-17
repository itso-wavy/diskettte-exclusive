import { PropsWithChildren, createContext } from 'react';
import { Comment, Post } from '@/lib/types';

export interface CommentContextProps {
  post: Post;
  comment: Comment;
}

export const CommentContext = createContext<CommentContextProps | null>(null);

const CommentProvider: React.FC<PropsWithChildren & CommentContextProps> = ({
  post,
  comment,
  children,
}) => {
  return (
    <CommentContext.Provider value={{ post, comment }}>
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
