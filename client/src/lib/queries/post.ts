import { ViewT } from '@/pages/Feed';

import client from '../services';

type FeedP = { view: ViewT; isLoggedIn: boolean };
type DetailP = {
  postId: string | undefined;
  username: string;
  isLoggedIn: boolean;
};

export const postKeys = {
  posts: ['posts'] as const,
  viewfeed: ({ view, isLoggedIn }: FeedP) =>
    [...postKeys.posts, { view, isLoggedIn }] as const,
  userPost: (username: string) => [...postKeys.posts, { username }] as const,
  postDetail: ({ postId, username, isLoggedIn }: DetailP) =>
    [...postKeys.posts, { postId, username, isLoggedIn }] as const,
};

export const getViewFeed = ({ signal, queryKey }: any) => {
  const { view, isLoggedIn } = queryKey[1];

  return client(!isLoggedIn ? `post/${view}` : `post/${view}/auth`, { signal });
};

export const getUserPosts = ({ queryKey }: any) => {
  const { username } = queryKey[1];

  return client(`post/${username}`);
};

export const getPostDetail = ({ queryKey }: any) => {
  const { postId, username, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn
      ? `post/${username}/${postId}`
      : `post/${username}/${postId}/auth`
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
