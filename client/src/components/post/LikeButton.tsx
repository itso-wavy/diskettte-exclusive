import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Post } from '.';
import Icon from '../icons';

import { postKeys } from '@/lib/queries/post';
import { toggleLike } from '@/lib/queries/post-interaction';
import { cn } from '@/lib/utils';

const LikeButton: React.FC<{
  postId: string;
  writer: string;
  isLoggedIn: boolean;
  defaultLiked: boolean;
  defaultCount: number;
}> = ({ postId, writer, isLoggedIn, defaultLiked, defaultCount }) => {
  const [isLiked, setIsLiked] = useState<boolean>(defaultLiked);
  const [likesCount, setLikesCount] = useState<number>(defaultCount);

  const queryKeys = [
    postKeys.viewfeed({ view: 'everyone', isLoggedIn }),
    postKeys.viewfeed({ view: 'following', isLoggedIn }),
    postKeys.userPost({ username: writer, isLoggedIn }),
  ];
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: toggleLike,
    onMutate: ({ isLiked, likesCount }) => {
      setIsLiked(() => !isLiked);
      setLikesCount(() => likesCount + (isLiked ? -1 : 1));

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
            postInArray.isLiked = !isLiked;
            postInArray.likesCount = isLiked
              ? postInArray.likesCount + 1
              : postInArray.likesCount - 1;

            return newPost;
          });
        }
      });

      return { prevPosts };
    },
    onError: (err, variables, context) => {
      setIsLiked(() => variables.isLiked);
      setLikesCount(() => variables.likesCount);

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
      setIsLiked(() => data.isLiked);
      setLikesCount(() => data.likesCount);
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
