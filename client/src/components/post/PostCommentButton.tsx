import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CommentButton } from '@/components/form';
import { CommentForm, FormType, PostUIType } from '@/components/dialog';
import { DialogLayout } from '@/components/layout';

import { PostContext } from '@/context/postContext';
import { RootState } from '@/lib/store';

const PostCommentButton: React.FC<{
  commentsCount: number;
}> = ({ commentsCount }) => {
  const { type, post, isLoggedIn, formType, setFormType } =
    useContext(PostContext)!;
  const { profile } = useSelector((state: RootState) => state.user);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div role='button'>
          <CommentButton
            hasCommented={false}
            handleClick={
              type === PostUIType.DETAIL && !isLoggedIn
                ? () => toast('로그인이 필요합니다.')
                : () => setFormType(FormType.CREATE)
            }
            commentsCount={commentsCount}
            stopPropagation={false}
          />
        </div>
      </DialogTrigger>
      {formType === FormType.CREATE && (
        <DialogLayout
          title=''
          className='w-full gap-0 px-4 max-[580px]:px-3 sm:w-[580px] sm:max-w-full'
        >
          <CommentForm type={formType} post={post} commenterProfile={profile} />
        </DialogLayout>
      )}
    </Dialog>
  );
};

export default PostCommentButton;
