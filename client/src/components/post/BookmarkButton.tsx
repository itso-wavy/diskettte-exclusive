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
  username: string;
  isLoggedIn: boolean;
  defaultBookmarked: boolean;
}> = ({ postId, username, isLoggedIn, defaultBookmarked }) => {
  const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);

  const queryClient = useQueryClient();
  const queryKey = postKeys.postDetail({ postId, username, isLoggedIn: true });
  const { mutate } = useMutation({
    mutationFn: toggleBookmark,
    onMutate: ({ isBookmarked }) => {
      setIsBookmarked(() => !isBookmarked);
    },
    onError: (err, variables, _context) => {
      console.error(err);

      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        console.log(error);

        toast('에러가 발생했습니다.😥', { description: '새로고침 해주세요.' });
      }

      setIsBookmarked(() => variables.isBookmarked);
    },
    onSuccess: ({ data }) => {
      setIsBookmarked(() => data.isBookmarked);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
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
