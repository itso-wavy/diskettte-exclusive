import client from '../services';

import { ViewT } from '@/pages/Feed';

type FeedP = { view: ViewT; isLoggedIn: boolean };
type DetailP = {
  username: string;
  isLoggedIn: boolean;
  postId?: string | undefined;
};

export const postKeys = {
  posts: ['posts'] as const,
  viewfeed: ({ view, isLoggedIn }: FeedP) =>
    [...postKeys.posts, { view, isLoggedIn }] as const,
  userPost: ({ username, isLoggedIn }: DetailP) =>
    [...postKeys.posts, { username, isLoggedIn }] as const,
  postDetail: ({ postId, username, isLoggedIn }: DetailP) =>
    [...postKeys.posts, { postId, username, isLoggedIn }] as const,
};

export const getViewFeed = ({ signal, queryKey }: any) => {
  const { view, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn ? `posts/view/${view}` : `posts/view/${view}/auth`,
    {
      signal,
    }
  );
};

export const getUserPosts = ({ queryKey }: any) => {
  const { username, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn ? `posts/user/${username}` : `posts/user/${username}/auth`
  );
};

export const getPostDetail = ({ queryKey }: any) => {
  const { postId, username, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn
      ? `post/user/${username}/${postId}`
      : `post/user/${username}/${postId}/auth`
  );
};

export const createPost = async (request: any) => {
  await client.post(`post/create`, request);
};

export const editPost = async (postId: string | undefined, request: any) => {
  return await client.patch(`post/${postId}/edit`, request);
};

export const deletePost = async (postId: string) => {
  await client.delete(`post/${postId}/delete`);
};
