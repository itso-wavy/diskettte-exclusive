import { useState, useEffect, PropsWithChildren, createContext } from 'react';
import { ProfileDetail } from '@/lib/types';

export interface FollowContextProps {
  profileDetail: ProfileDetail;
  isFollowing: boolean | null;
  setIsFollowing: React.Dispatch<React.SetStateAction<boolean | null>>;
  followersCount: number | null;
  setFollowersCount: React.Dispatch<React.SetStateAction<number | null>>;
}

export const FollowContext = createContext<FollowContextProps | null>(null);

const FollowProvider: React.FC<
  PropsWithChildren & { profileDetail: ProfileDetail }
> = ({ profileDetail, children }) => {
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (profileDetail?.followers !== undefined)
      setFollowersCount(profileDetail.followers);
  }, [profileDetail?.followers]);

  useEffect(() => {
    if (profileDetail?.isFollowing !== undefined) {
      setIsFollowing(profileDetail.isFollowing);
    }
  }, [profileDetail?.isFollowing]);

  return (
    <FollowContext.Provider
      value={{
        profileDetail,
        isFollowing,
        setIsFollowing,
        followersCount,
        setFollowersCount,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};

export default FollowProvider;
