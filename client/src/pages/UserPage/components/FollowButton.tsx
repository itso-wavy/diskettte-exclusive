import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Button } from '@/components/form';

import { profileKeys, toggleUserFollow } from '@/lib/queries/profile';
import { cn } from '@/lib/utils';

const FollowButton: React.FC<{
  username: string;
  isLoggedIn: boolean;
  defaultFollowing: boolean | undefined;
}> = ({ username, isLoggedIn, defaultFollowing }) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (defaultFollowing !== undefined) {
      setIsFollowing(defaultFollowing);
    }
  }, [defaultFollowing]);

  const queryClient = useQueryClient();
  const queryKey = profileKeys.userProfile({
    username,
    isLoggedIn,
  });
  const { mutate } = useMutation({
    mutationFn: toggleUserFollow,
    onMutate: ({ isFollowing }) => {
      setIsFollowing(() => !isFollowing);
    },
    onError: (err, variables, _context) => {
      console.error(err);

      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        console.log(error);

        toast('에러가 발생했습니다.😥', { description: '새로고침 해주세요.' });
      }

      setIsFollowing(() => variables.isFollowing);
    },
    onSuccess: ({ data }) => {
      setIsFollowing(() => data.isFollowing);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <Button
      onClick={() => {
        !isLoggedIn
          ? toast('로그인이 필요합니다.')
          : mutate({ isFollowing, username });
      }}
      className={cn('w-full bg-gamma hover:ring', isFollowing && 'bg-alpha')}
    >
      {isFollowing === null ? 'loading' : isFollowing ? 'following' : 'follow'}
    </Button>
  );
};

export default FollowButton;
