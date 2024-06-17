import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { BookmarkButton } from '../form';

import { PostContext } from '@/context/postContext';
import { postKeys } from '@/lib/queries/post';
import { toggleBookmark } from '@/lib/queries/post-interaction';

const PostBookmarkButton: React.FC<{
  defaultBookmarked: boolean;
}> = ({ defaultBookmarked }) => {
  const { post, writer, isLoggedIn } = useContext(PostContext)!;

  const [isBookmarked, setIsBookmarked] = useState(defaultBookmarked);

  const queryKeys = [
    postKeys.viewfeed({ view: 'everyone', isLoggedIn }),
    postKeys.viewfeed({ view: 'following', isLoggedIn }),
    postKeys.userPost({ username: writer, isLoggedIn }),
    postKeys.bookmarkPost({ username: writer }),
    postKeys.postDetail({ postId: post._id, username: writer, isLoggedIn }),
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

            let post;
            if (index === queryKeys.length - 1) {
              post = newPost.data.post;
            } else {
              const postIndex = newPost.data.posts.findIndex(
                (post: any) => post._id === post._id
              );
              post = newPost.data.posts[postIndex];
            }

            post.isBookmarked = !isBookmarked;

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
    <BookmarkButton
      isBookmarked={isBookmarked}
      handleClick={() => {
        !isLoggedIn
          ? toast('로그인이 필요합니다.')
          : mutate({
              postId: post._id,
              isBookmarked,
            });
      }}
      className='ml-auto'
    />
  );
};

export default PostBookmarkButton;
