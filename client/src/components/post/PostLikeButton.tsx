import { useState, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { HeartButton } from '../form';

import { PostContext } from '@/context/postContext';
import { postKeys } from '@/lib/queries/post';
import { toggleLike } from '@/lib/queries/post-interaction';

const PostLikeButton: React.FC<{
  defaultLiked: boolean;
  defaultCount: number;
}> = ({ defaultLiked, defaultCount }) => {
  const { post, writer, isLoggedIn } = useContext(PostContext)!;

  const [isLiked, setIsLiked] = useState<boolean>(defaultLiked);
  const [likesCount, setLikesCount] = useState<number>(defaultCount);

  const queryKeys = [
    postKeys.viewfeed({ view: 'everyone', isLoggedIn }),
    postKeys.viewfeed({ view: 'following', isLoggedIn }),
    postKeys.userPost({ username: writer, isLoggedIn }),
    postKeys.postDetail({ postId: post._id, username: writer, isLoggedIn }),
  ];
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: toggleLike,
    onMutate: ({ isLiked, likesCount }) => {
      setIsLiked(() => !isLiked);
      setLikesCount(() => likesCount + (!isLiked ? 1 : -1));

      const prevPosts: any[] = [];
      queryKeys.forEach(async (queryKey, index) => {
        await queryClient.cancelQueries({ queryKey });

        prevPosts[index] = queryClient.getQueryData(queryKey);
        if (prevPosts[index]) {
          queryClient.setQueryData(queryKey, (prev: any) => {
            const newPost = { ...prev };

            let post;
            if (index === queryKeys.length - 1) {
              post = newPost.data.post;
            } else {
              const postIndex = newPost.data.posts.findIndex(
                (post: any) => post._id === post._id
              );
              post = newPost.data.posts[postIndex];
            }

            post.isLiked = !isLiked;
            post.likesCount = !isLiked
              ? post.likesCount + 1
              : post.likesCount - 1;

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
    <HeartButton
      handleClick={() => {
        !isLoggedIn
          ? toast('로그인이 필요합니다.')
          : mutate({ postId: post._id, isLiked, likesCount });
      }}
      isLiked={isLiked}
      likesCount={likesCount}
    />
  );
};

export default PostLikeButton;
