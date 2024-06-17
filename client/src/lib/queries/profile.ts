import client from '../services';

type SearchP = { isLoggedIn: boolean; searchQuery: string };

export const profileKeys = {
  profile: ['profile'] as const,
  userProfile: ({
    username,
    isLoggedIn,
  }: {
    username: string;
    isLoggedIn: boolean;
  }) => [...profileKeys.profile, { username, isLoggedIn }] as const,
  searchUser: ({ isLoggedIn, searchQuery }: SearchP) =>
    [...profileKeys.profile, 'search', { isLoggedIn, searchQuery }] as const,
};

export const getUserProfile = ({ queryKey }: any) => {
  const { username, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn ? `user/${username}/profile` : `user/${username}/profile/auth`
  );
};

export const searchUsers = ({ queryKey }: any) => {
  const { isLoggedIn, searchQuery } = queryKey[2];

  return client(
    !isLoggedIn
      ? `/search?keyword=${searchQuery}`
      : `/search/auth?keyword=${searchQuery}`
  );
};

export const toggleUserFollow = ({ isFollowing, username }: any) => {
  return !isFollowing
    ? client.post(`user/${username}/follower`)
    : client.delete(`user/${username}/follower`);
};
