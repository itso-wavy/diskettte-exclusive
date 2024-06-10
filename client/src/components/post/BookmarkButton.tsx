import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Post } from '.';
import Icon from '../icons';

import { postKeys } from '@/lib/queries/post';
import { toggleBookmark } from '@/lib/queries/post-interaction';
import { cn } from '@/lib/utils';

const BookmarkButton: React.FC<{
  postId: string;
  writer: string;
  isLoggedIn: boolean;
  defaultBookmarked: boolean;
}> = ({ postId, writer, isLoggedIn, defaultBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);

  const queryKeys = [
    postKeys.viewfeed({ view: 'everyone', isLoggedIn }),
    postKeys.viewfeed({ view: 'following', isLoggedIn }),
    postKeys.userPost({ username: writer, isLoggedIn }),
  ];
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: toggleBookmark,
    onMutate: ({ isBookmarked }) => {
      setIsBookmarked(() => !isBookmarked);

      const prevPosts: any[] = [];
      queryKeys.forEach(async (queryKey, index) => {
        await queryClient.cancelQueries({ queryKey });

        prevPosts[index] = queryClient.getQueryData(queryKey);
        if (prevPosts[index]) {
          queryClient.setQueryData(queryKey, (prev: any) => {
            const newPost = { ...prev };

            const postIndex = newPost.data.posts.findIndex(
              (post: any) => post._id === postId
            );
            const postInArray = newPost.data.posts[postIndex];

            postInArray.isBookmarked = !isBookmarked;

            return newPost;
          });
        }
      });

      return { prevPosts };
    },
    onError: (err, variables, context) => {
      setIsBookmarked(() => variables.isBookmarked);

      console.error(err);

      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        console.log(error);

        toast('에러가 발생했습니다.😥', {
          description: '다음에 다시 시도해주세요.',
        });
      }

      context!.prevPosts.forEach((prevPost, index) => {
        queryClient.setQueryData(queryKeys[index]!, prevPost);
      });
    },
    onSuccess: ({ data }) => {
      setIsBookmarked(() => data.isBookmarked);
    },
    onSettled: () => {
      queryKeys.forEach(queryKey => {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: 'all',
        });
      });
    },
  });

  return (
    <Post.Button
      ariaLabel='bookmark'
      onClick={() => {
        !isLoggedIn
          ? toast('로그인이 필요합니다.')
          : mutate({
              postId,
              isBookmarked,
            });
      }}
      className='ml-auto'
    >
      <Icon.Bookmark
        viewBox='0 0 24 24'
        strokeWidth={0.9}
        className={cn(
          'h-[20px] w-[20px]',
          isBookmarked && 'svg-fill-theme text-alpha'
        )}
      />
    </Post.Button>
  );
};

export default BookmarkButton;
