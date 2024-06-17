import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Form, PictureButton, XButton } from '../form';
import { DialogLayout } from '../layout';
import { Post } from '../post';
import ProfileAvatar from '../ProfileAvatar';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

import { RootState } from '@/lib/store';
import { postSchema, imageFileValidation } from '@/lib/schemas';
import { convertToBase64 } from '@/lib/utils';
import { postKeys, createPost, editPost } from '@/lib/queries/post';
import { Post as PostT } from '@/lib/types';
import { FormType } from '.';

const PostForm: React.FC<{
  type?: FormType;
  username: string;
  post?: PostT;
}> = ({ type = 'create', username, post }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, dirtyFields },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm<PostT['contents']>({
    defaultValues: post
      ? post.contents
      : {
          text: '',
          images: [],
        },
    resolver: zodResolver(postSchema),
  });

  const [selectedImages, setSelectedImages] = useState<string[]>(
    post?.contents.images || []
  );
  const { profile } = useSelector((state: RootState) => state.user);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (request: any) => {
      switch (type) {
        case FormType.CREATE:
          createPost(request);
          break;
        case FormType.EDIT:
          const response = await editPost(post?._id, request);
          const { text, images } = response.data || {};

          setValue('text', text);
          setValue('images', images);
          break;
        default:
          break;
      }
    },
    onMutate: () => {
      toast('게시 중...');

      reset();
      setSelectedImages([]);

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
        const { data, status } = err.response!;

        if (data) {
          const errors = Object.entries(data) as [
            key: keyof PostT['contents'],
            message: string,
          ][];
          errors.forEach(([key, message]) => {
            setError(key, { message });
          });
        }

        if (status === 413) {
          setError('images', { message: '파일 크기는 5MB 이하여야 합니다.' });
        }
      }
    },
  });

  const onSubmit = (request: FieldValues) => {
    if (!request.text && selectedImages.length < 1) {
      setError('text', { message: '내용을 입력해주세요.' });
      return;
    }

    mutate({
      ...request,
      images: selectedImages,
    });

    reset();
  };

  const ImageInput = ({ index }: { index: number }) => {
    const handleImageChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      // const index = e.target.dataset.imageIndex;
      const file = e.target.files?.[0];
      if (!file) {
        return;
      }

      const result = imageFileValidation.safeParse(file);

      if (result.success) {
        const file = result.data!;
        const base64 = await convertToBase64(file);
        setSelectedImages(prev => [...prev, base64]);
        clearErrors('images');
      } else {
        const errorMessage = result.error.issues[0]?.message;
        setError('images', { message: errorMessage });
        // setSelectedImages(prev => [...prev]);
      }
    };

    return (
      <>
        <input
          type='file'
          id={`images${index}`}
          accept='image/*'
          className='sr-only'
          // onClick={() =>
          //   setSelectedImages((prev: string[]) => {
          //     prev.splice(index, 1);
          //     return prev;
          //   })
          // }
          {...register(`images.${index}`, {
            onChange: handleImageChange,
          })}
        />
        <label htmlFor={`images${index}`}>
          {!selectedImages[index] && (
            <PictureButton
              handleClick={() =>
                document.getElementById(`images${index}`)?.click()
              }
            />
          )}
        </label>
      </>
    );
  };

  return (
    <DialogLayout
      title={type === 'create' ? 'New Post' : 'Edit Post'}
      className='w-full max-[580px]:px-3 sm:w-[580px] sm:max-w-full'
    >
      <Post.Layout
        avatarPart={
          <ProfileAvatar
            image={profile.image}
            nickname={profile.nickname}
            className='h-9 w-9 rounded-full'
          />
        }
        topLinePart={<p className='font-semibold'>{profile.nickname}</p>}
        className='border-b-0 sm:px-0'
      >
        <Form.Layout handleSubmit={handleSubmit(onSubmit)}>
          <Form.Input
            type='textarea'
            label='new-post'
            labelHidden={true}
            placeholder='내용을 입력하세요...'
            // rows={1}
            rows={3}
            className='mt-2'
            error={
              errors.text?.message ? (errors.text.message as ReactNode) : ''
            }
            {...register('text')}
          />
          <ScrollArea onClick={e => e.stopPropagation()}>
            {selectedImages?.length ? (
              <div className='flex w-max space-x-1.5 pb-3 '>
                {selectedImages.map((image, index) => (
                  <div key={index} className='relative'>
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      draggable='false'
                      className='h-[245px] max-w-[245px] rounded-lg border object-cover'
                    />
                    <XButton
                      handleClick={() =>
                        setSelectedImages(prev =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className='absolute right-1.5 top-1.5 h-7 w-7 bg-gray-950/40 text-white before:content-none'
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
          {errors.images && (
            <Form.Feedback type='error' className='mb-1'>
              {errors.images?.message || ''}
            </Form.Feedback>
          )}
          <div className='-mb-1 -ml-[3px] flex items-center *:space-y-1'>
            <ImageInput index={0} />
            {selectedImages[0] && <ImageInput index={1} />}
            {selectedImages[1] && <ImageInput index={2} />}
          </div>
          <Form.SubmitButton
            text={type === 'create' ? 'Register' : type}
            disabled={!dirtyFields.text && selectedImages.length < 1}
            className='first-letter:uppercase'
          />
        </Form.Layout>
      </Post.Layout>
    </DialogLayout>
  );
};

export default PostForm;
