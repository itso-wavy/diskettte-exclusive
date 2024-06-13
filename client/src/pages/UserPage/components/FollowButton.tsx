import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Button } from '@/components/form';

import { profileKeys, toggleUserFollow } from '@/lib/queries/profile';
import { cn } from '@/lib/utils';
import { postKeys } from '@/lib/queries/post';

const FollowButton: React.FC<{
  username: string;
  isLoggedIn: boolean;
  defaultIsFollowing: boolean | undefined;
  defaultFollowersCount: number | undefined;
  setFollowersCount: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({
  username,
  isLoggedIn,
  defaultIsFollowing,
  defaultFollowersCount,
  setFollowersCount,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (defaultIsFollowing !== undefined) {
      setIsFollowing(defaultIsFollowing);
    }
  }, [defaultIsFollowing]);

  const queryKey = profileKeys.userProfile({ username, isLoggedIn });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: toggleUserFollow,
    onMutate: async ({ isFollowing, followersCount }) => {
      setIsFollowing(() => !isFollowing);
      setFollowersCount(() => followersCount + (!isFollowing ? 1 : -1));

      await queryClient.cancelQueries({ queryKey });
      const prevProfile = queryClient.getQueryData(queryKey);

      if (prevProfile) {
        queryClient.setQueryData(queryKey, (prev: any) => {
          const newProfile = { ...prev };

          const profileDetail = newProfile.data.profileDetail;

          profileDetail.isFollowing === !isFollowing;
          profileDetail.followers = !isFollowing
            ? profileDetail.followers + 1
            : profileDetail.followers - 1;

          return newProfile;
        });
      }

      return { prevProfile };
    },
    onError: (err, variables, context) => {
      setIsFollowing(() => variables.isFollowing);
      setFollowersCount(() => variables.followersCount);

      console.error(err);

      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        console.log(error);

        toast('에러가 발생했습니다.😥', {
          description: '다음에 다시 시도해주세요.',
        });
      }

      queryClient.setQueryData(queryKey, context!.prevProfile);
    },
    // onSuccess: ({ data }) => {
    // setIsFollowing(() => data.isFollowing);
    // setFollowersCount(() => data.followersCount);
    // },
    onSettled: () => {
      const queryKeys = [
        profileKeys.userProfile({ username, isLoggedIn }),
        postKeys.viewfeed({ view: 'following', isLoggedIn }),
      ];

      queryKeys.forEach(queryKey => {
        queryClient.invalidateQueries({
          queryKey,
          refetchType: 'all',
        });
      });
    },
  });

  return (
    <Button
      onClick={() => {
        !isLoggedIn
          ? toast('로그인이 필요합니다.')
          : mutate({
              isFollowing,
              username,
              followersCount: defaultFollowersCount,
            });
      }}
      className={cn('w-full bg-gamma hover:ring', isFollowing && 'bg-alpha')}
    >
      {isFollowing ? 'following' : 'follow'}
    </Button>
  );
};

export default FollowButton;
