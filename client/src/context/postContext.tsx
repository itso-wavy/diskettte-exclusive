import { PropsWithChildren, createContext, useState } from 'react';

import { FormType, PostUIType } from '@/components/dialog';

import { Post } from '@/lib/types';

export interface PostContextProps {
  type: PostUIType;
  post: Post;
  writer: string;
  isLoggedIn: boolean;
  formType: FormType | null;
  setFormType: React.Dispatch<React.SetStateAction<FormType | null>>;
}

export const PostContext = createContext<PostContextProps | null>(null);

const PostProvider: React.FC<
  PropsWithChildren & Omit<PostContextProps, 'formType' | 'setFormType'>
> = ({ type, post, writer, isLoggedIn, children }) => {
  const [formType, setFormType] = useState<FormType | null>(null);

  return (
    <PostContext.Provider
      value={{
        type,
        post,
        writer,
        isLoggedIn,
        formType,
        setFormType,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
