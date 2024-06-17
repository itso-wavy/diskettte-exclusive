import client from '../services';

import { ViewT } from '@/pages/Feed';

type FeedP = { view: ViewT; isLoggedIn: boolean };
type postIdP = { postId: string };
type DetailP = {
  username: string;
  isLoggedIn: boolean;
  postId?: postIdP['postId'];
};
// type CommentP = {
//   postId: string;
//   commentId?: string;
// };

export const postKeys = {
  posts: ['posts'] as const,
  viewfeed: ({ view, isLoggedIn }: FeedP) =>
    [...postKeys.posts, { view, isLoggedIn }] as const,
  userPost: ({ username, isLoggedIn }: DetailP) =>
    [...postKeys.posts, { username, isLoggedIn }] as const,
  postDetail: ({ username, isLoggedIn, postId }: DetailP) =>
    [...postKeys.posts, { username, isLoggedIn, postId }] as const,
  bookmarkPost: ({ username }: { username: string }) =>
    [...postKeys.posts, { username, view: 'bookmark' }] as const,
  // postComment: ({ postId, commentId }: CommentP) =>
  //   [...postKeys.posts, { postId, commentId }, 'comments'] as const,
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

export const getUserBookmarks = ({ queryKey }: any) => {
  const { username } = queryKey[1];

  return client(`user/${username}/bookmark`);
};

export const getPostDetail = ({ queryKey }: any) => {
  const { postId, username, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn
      ? `post/user/${username}/${postId}`
      : `post/user/${username}/${postId}/auth`
  );
};

export const getPostComments = async ({ queryKey }: any) => {
  const { postId } = queryKey[1];

  await client(`post/${postId}/comment`);
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

export const createComment = async (postId: string, request: any) => {
  await client.post(`post/${postId}/comment/create`, request);
};

export const editComment = async (
  postId: string,
  commentId: string,
  request: any
) => {
  return await client.patch(
    `post/${postId}/comment/${commentId}/edit`,
    request
  );
};

export const deleteComment = async (postId: string, commentId: string) => {
  await client.delete(`post/${postId}/comment/${commentId}/delete`);
};
