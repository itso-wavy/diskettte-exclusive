import { PropsWithChildren, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Post } from '.';
import { PostForm, PostFormType } from '@/components/dialog';
import Icon from '@/components/icons';

import client from '@/lib/services';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import { Post as PostT } from '@/lib/types';

const MoreButton = ({
  username,
  isWriter,
  post,
}: PropsWithChildren<{
  username: string;
  isWriter: boolean;
  post: PostT;
}>) => {
  const [postFormType, setPostFormType] = useState<PostFormType | null>(null);
  const { isDarkmode } = useSelector((state: RootState) => state.theme);
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await client.delete(`post/${post?._id}/delete`);
    },
    onMutate: () => toast('삭제 중...'),
    onSuccess: () => {
      toast('삭제되었습니다');

      const pathParts = pathname.split('/');
      if (pathParts.length === 3 && pathParts[1]!.startsWith('@'))
        navigate('..');
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts', { postId: post._id }],
      });
    },
    onError: err => {
      console.log(err);
      toast('에러가 발생했습니다.');
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Post.Button
              ariaLabel='more'
              className='ml-auto text-muted-foreground'
            >
              <Icon.More viewBox='0 0 24 24' className='h-5 w-5' />
            </Post.Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            isDarkmode && 'dark',
            '-translate-x-4 -translate-y-3 font-normal *:text-[13px] sm:-translate-x-10 md:-translate-x-14'
            // w-44
          )}
        >
          {!isWriter ? (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={e => {
                    toast('차단!🚨');
                    e.stopPropagation();
                  }}
                >
                  차단하기
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={e => {
                    toast('신고!🚨');
                    e.stopPropagation();
                  }}
                >
                  신고하기
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          ) : (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={e => {
                    setPostFormType(PostFormType.EDIT);
                    e.stopPropagation();
                  }}
                >
                  수정하기
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={e => {
                    mutate();
                    e.stopPropagation();
                  }}
                >
                  삭제하기
                </DropdownMenuItem>
              </DialogTrigger>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {postFormType && (
        <PostForm type={postFormType} username={username} post={post} />
      )}
    </Dialog>
  );
};

export default MoreButton;
