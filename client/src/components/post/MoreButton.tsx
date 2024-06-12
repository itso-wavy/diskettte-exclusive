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
import { PostForm, PostFormType } from '@/components/dialog';

import { RootState } from '@/lib/store';
import { postKeys, deletePost } from '@/lib/queries/post';
import { cn } from '@/lib/utils';
import { Post as PostT } from '@/lib/types';

const MoreButton = ({
  username,
  isWriter,
  post,
  children,
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
    mutationFn: () => deletePost(post?._id),
    onMutate: () => toast('삭제 중...'),
    onSuccess: () => {
      toast('삭제되었습니다');

      queryClient.invalidateQueries({
        queryKey: postKeys.posts,
      });

      const pathParts = pathname.split('/');
      if (pathParts.length === 3 && pathParts[1]!.startsWith('@'))
        navigate('..');
    },
    onError: err => {
      console.log(err);
      toast('에러가 발생했습니다.');
    },
  });

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            isDarkmode && 'dark',
            '-translate-x-5 -translate-y-3 font-normal *:text-[13px] sm:-translate-x-11 md:-translate-x-14'
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
              <DropdownMenuItem
                onClick={e => {
                  mutate();
                  e.stopPropagation();
                }}
              >
                삭제하기
              </DropdownMenuItem>
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
