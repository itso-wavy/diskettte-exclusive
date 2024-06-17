import { ReactNode } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Button, Form } from '../form';
import { CommentFormPost, Post } from '../post';
import ProfileAvatar from '../ProfileAvatar';

import { commentSchema } from '@/lib/schemas';
import { createComment, editComment, postKeys } from '@/lib/queries/post';
import { Comment as CommentT, Post as PostT, UserProfile } from '@/lib/types';
import { FormType } from '.';

const CommentForm: React.FC<{
  type?: FormType;
  post: PostT;
  commenterProfile: UserProfile;
  comment?: CommentT;
}> = ({ type = 'create', post, commenterProfile, comment }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm<{ content: string }>({
    defaultValues: comment ? { content: comment.content } : { content: '' },
    resolver: zodResolver(commentSchema),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (request: any) => {
      switch (type) {
        case FormType.CREATE:
          createComment(post?._id, request);
          break;
        case FormType.EDIT:
          const response = await editComment(post?._id, comment?._id!, request);
          const content = response?.data || '';

          setValue('content', content);
          break;
        default:
          break;
      }
    },
    onMutate: () => {
      toast('게시 중...');

      reset();
      document.getElementById('dialog-close')?.click();
    },
    onSuccess: () => {
      toast('게시되었습니다.');
      clearErrors();

      queryClient.invalidateQueries({
        queryKey: postKeys.posts,
      });
    },
    onError: err => {
      console.log(err);
      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        if (error.content) {
          setError('content', { message: error.content });
        }
      }
    },
  });

  const onSubmit = (request: FieldValues) => {
    mutate(request);
  };

  return (
    <>
      <CommentFormPost
        post={post}
        className='relative border-0 before:absolute before:left-[calc(24px+18px-1px)] before:top-[calc(12px+40.25px+8px)] before:block before:h-[calc(100%-36px-16px)] before:w-0.5 before:bg-gamma before:opacity-60'
      />
      <Post.Layout
        className='border-0'
        avatarPart={
          <ProfileAvatar
            image={commenterProfile.image}
            nickname={commenterProfile.nickname}
            className='h-9 w-9 overflow-hidden rounded-full'
          />
        }
        topLinePart={
          <div className='select text-[13px] text-muted-foreground'>
            to @{post.writer.username}
          </div>
        }
      >
        <Form.Layout handleSubmit={handleSubmit(onSubmit)}>
          <div className='mt-1 flex '>
            <div className='w-full '>
              <Form.Input
                type='textarea'
                label='editor'
                labelHidden
                autoFocus
                placeholder='Comment...'
                className='overflow-visible border bg-transparent text-[15px] caret-gamma placeholder:text-[15px] placeholder:font-medium placeholder:text-muted-foreground'
                error={
                  errors.content?.message
                    ? (errors.content.message as ReactNode)
                    : ''
                }
                {...register('content')}
              />
            </div>
            <Button
              type='submit'
              className='block h-fit border border-muted-foreground bg-background text-[13px] text-foreground first-letter:uppercase hover:bg-background'
            >
              {type === FormType.CREATE ? 'add' : 'edit'}
            </Button>
          </div>
        </Form.Layout>
      </Post.Layout>
    </>
  );
};

export default CommentForm;
