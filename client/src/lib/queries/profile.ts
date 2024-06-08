import client from '../services';

export const profileKeys = {
  profile: ['profile'] as const,
  userProfile: ({
    username,
    isUserMatch,
  }: {
    username: string;
    isUserMatch: boolean;
  }) => [...profileKeys.profile, { username, isUserMatch }] as const,
};

export const getUserProfile = ({ queryKey }: any) => {
  const { username, isUserMatch } = queryKey[1];

  return client(
    !isUserMatch ? `user/${username}/profile` : `user/${username}/profile/auth`
  );
};
