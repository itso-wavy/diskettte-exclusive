import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Post } from '.';
import Icon from '../icons';

import { toggleLike } from '@/lib/queries/post-interaction';
import { postKeys } from '@/lib/queries/post';
import { cn } from '@/lib/utils';

const LikeButton: React.FC<{
  postId: string;
  username: string;
  isLoggedIn: boolean;
  defaultLiked: boolean;
  defaultCount: number;
}> = ({ postId, username, isLoggedIn, defaultLiked, defaultCount }) => {
  const [isLiked, setIsLiked] = useState<boolean>(defaultLiked);
  const [likesCount, setLikesCount] = useState<number>(defaultCount);

  const queryClient = useQueryClient();
  const queryKey = postKeys.postDetail({ postId, username, isLoggedIn: true });
  const { mutate } = useMutation({
    mutationFn: toggleLike,
    onMutate: ({ isLiked, likesCount }) => {
      setIsLiked(() => !isLiked);
      setLikesCount(() => likesCount + (isLiked ? -1 : 1));
    },
    onError: (err, variables, _context) => {
      console.error(err);

      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        console.log(error);

        toast('에러가 발생했습니다.😥', { description: '새로고침 해주세요.' });
      }

      setIsLiked(() => variables.isLiked);
      setLikesCount(() => variables.likesCount);
    },
    onSuccess: ({ data }) => {
      setIsLiked(() => data.isLiked);
      setLikesCount(() => data.likesCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <div>
      <Post.Button
        ariaLabel='likes'
        onClick={() => {
          !isLoggedIn
            ? toast('로그인이 필요합니다.')
            : mutate({ postId, isLiked, likesCount });
        }}
        count={likesCount}
      >
        <Icon.Heart
          viewBox='0 0 24 24'
          strokeWidth={1}
          className={cn(
            'h-[20px] w-[20px]',
            isLiked && 'svg-fill-theme text-alpha'
          )}
        />
      </Post.Button>
    </div>
  );
};

export default LikeButton;
