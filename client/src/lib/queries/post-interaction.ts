import client from '../services';

// type InteractionP = { username: string; isLoggedIn: boolean };

export const interactionKeys = {
  userComments: () => {
    // 💓
  },
};

export const toggleLike = ({ postId, isLiked }: any) => {
  return !isLiked
    ? client.post(`post/${postId}/like`)
    : client.delete(`post/${postId}/like`);
};

export const toggleBookmark = ({ postId, isBookmarked }: any) => {
  return !isBookmarked
    ? client.post(`post/${postId}/bookmark`)
    : client.delete(`post/${postId}/bookmark`);
};

export const postComment = ({ queryKey }: any) => {
  const { postId } = queryKey[1];

  return client.post(`post/${postId}/comment`);
};

export const removeComment = ({ queryKey }: any) => {
  const { postId } = queryKey[1];

  return client.delete(`post/${postId}/comment`);
};
