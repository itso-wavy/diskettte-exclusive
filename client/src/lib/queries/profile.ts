import client from '../services';

export const profileKeys = {
  profile: ['profile'] as const,
  userProfile: ({
    username,
    isLoggedIn,
  }: {
    username: string;
    isLoggedIn: boolean;
  }) => [...profileKeys.profile, { username, isLoggedIn }] as const,
};

export const getUserProfile = ({ queryKey }: any) => {
  const { username, isLoggedIn } = queryKey[1];

  return client(
    !isLoggedIn ? `user/${username}/profile` : `user/${username}/profile/auth`
  );
};

export const toggleUserFollow = ({ isFollowing, username }: any) => {
  return !isFollowing
    ? client.post(`user/${username}/follower`)
    : client.delete(`user/${username}/follower`);
};
