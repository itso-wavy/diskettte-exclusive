import { useContext, useState } from 'react';
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
import { FormType, CommentForm } from '@/components/dialog';
import { MoreButton } from '../form';
import { DialogLayout } from '../layout';

import { CommentContext, CommentContextProps } from '@/context/commentContext';
import { RootState } from '@/lib/store';
import { postKeys, deleteComment } from '@/lib/queries/post';
import { cn } from '@/lib/utils';

const CommentMoreButton: React.FC<{
  isWriter: boolean;
}> = ({ isWriter }) => {
  const { post, comment } = useContext<CommentContextProps | null>(
    CommentContext
  )!;

  const [formType, setFormType] = useState<FormType | null>(null);
  const { isDarkmode } = useSelector((state: RootState) => state.theme);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: () => deleteComment(post?._id, comment?._id),
    onMutate: () => toast('삭제 중...'),
    onSuccess: () => {
      toast('삭제되었습니다');

      queryClient.invalidateQueries({
        queryKey: postKeys.posts,
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
            <MoreButton className='ml-auto text-muted-foreground' />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(
            isDarkmode && 'dark',
            '-translate-x-5 -translate-y-3 font-normal *:text-[13px] sm:-translate-x-11 md:-translate-x-14'
          )}
        >
          {!isWriter ? (
            <>
              <DropdownMenuItem
                onClick={e => {
                  toast('차단!🚨');
                  e.stopPropagation();
                }}
              >
                차단하기
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={e => {
                  toast('신고!🚨');
                  e.stopPropagation();
                }}
              >
                신고하기
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onClick={e => {
                    setFormType(FormType.EDIT);
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
      {formType === FormType.EDIT && (
        <DialogLayout
          title=''
          className='w-full gap-0 px-4 max-[580px]:px-3 sm:w-[580px] sm:max-w-full'
        >
          <CommentForm
            type={formType}
            post={post}
            commenterProfile={comment?.writer.profile}
            comment={comment}
          />
        </DialogLayout>
      )}
    </Dialog>
  );
};

export default CommentMoreButton;
