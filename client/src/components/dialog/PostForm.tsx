import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

import { Form } from '../form';
import { DialogLayout } from '../layout';
import { Post } from '../post';
import ProfileAvatar from '../ProfileAvatar';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import Icon from '../icons';

import { RootState } from '@/lib/store';
import { postSchema, imageFileValidation } from '@/lib/schemas';
import { convertToBase64 } from '@/lib/utils';
import { postKeys, createPost, editPost } from '@/lib/queries/post';
import { Post as PostT } from '@/lib/types';
import { PostFormType } from '.';

const PostForm: React.FC<{
  type?: PostFormType;
  username: string;
  post?: PostT;
}> = ({ type = 'create', username, post }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
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

  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const { profile } = useSelector((state: RootState) => state.user);
  const queryClient = useQueryClient();

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (request: any) => {
      switch (type) {
        case PostFormType.CREATE:
          createPost(request);
          break;
        case PostFormType.EDIT:
          const response = await editPost(post?._id, request);
          const body = response.data;

          setValue('text', body.text);
          setValue('images', body.images);
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
    mutate({
      ...request,
      images: selectedImage,
    });
  };

  // const ImageInput = ({
  //   index,
  //   onChange,
  //   selectedImage,
  //   setSelectedImage,
  //   register,
  // }: any) => {
  //   const handleImageChange = async (
  //     e: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     // const index = e.target.dataset.imageIndex;
  //     const file = e.target.files?.[0];
  //     if (!file) {
  //       return;
  //     }

  //     const result = imageFileValidation.safeParse(file);
  //     if (result.success) {
  //       const file = result.data!;
  //       const base64 = await convertToBase64(file);
  //       // setSelectedImage(base64);
  //       setSelectedImage((prev: string[]) => [...prev, base64]);

  //       clearErrors('images');
  //     } else {
  //       const errorMessage = result.error.issues[0]?.message;
  //       setError('images', { message: errorMessage });
  //       // setSelectedImage('');
  //     }

  //     console.log(selectedImage);
  //   };

  //   return (
  //     <>
  //       <input
  //         type='file'
  //         id={`image${index}`}
  //         // data-image-index={index}
  //         accept='image/*'
  //         className='hidden'
  //         onClick={() =>
  //           setSelectedImage((prev: string[]) => {
  //             prev.splice(index, 1);
  //             return prev;
  //           })
  //         }
  //         {...register(`image${index}`, {
  //           onChange: handleImageChange,
  //         })}
  //       />
  //       <label htmlFor={`image${index}`}>
  //         {!selectedImage[index] && (
  //           <PostButton
  //             ariaLabel='add-image'
  //             onClick={() => {
  //               document.getElementById(`image${index}`)?.click();
  //             }}
  //           >
  //             <Icon.Picture
  //               viewBox='0 0 24 24'
  //               strokeWidth={1}
  //               className='h-[20px] w-[20px]'
  //             />
  //           </PostButton>
  //         )}
  //       </label>
  //     </>
  //   );
  // };

  return (
    <DialogLayout
      title='New Post'
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
          {/* <div className='-mb-1 -ml-[3px] flex items-center *:space-y-1'> */}
          {/* <ScrollArea onClick={e => e.stopPropagation()}>
            <div className='flex w-max space-x-1.5 overflow-x-auto pb-3'>
              {selectedImage?.length &&
                selectedImage.map((i, index) => (
                  <img
                    key={index}
                    src={i}
                    alt={`Image ${index}`}
                    draggable='false'
                    className='mt-2 h-[245px] max-w-[245px] rounded-lg border object-cover'
                  />
                ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
          <ImageInput
            index={0}
            register={register}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          {selectedImage[0] && (
            <ImageInput
              index={1}
              register={register}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          )}
          {selectedImage[1] && (
            <ImageInput
              index={2}
              register={register}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          )} */}
          {/* </div> */}
          {/* {errors.image && (
        <Form.Feedback type='error' className='mb-2 text-center'>
          {errors.image?.message || ''}
        </Form.Feedback>
      )} */}
          <Form.SubmitButton
            text={type === 'create' ? 'Register' : type}
            disabled={!isDirty}
            className='first-letter:uppercase'
          />
        </Form.Layout>
      </Post.Layout>
    </DialogLayout>
  );
};

export default PostForm;

//     <div>
//       <label
//         htmlFor='profile-image'
//         className='border border-teal-100 hover:opacity-80'
//         // className='mx-auto mb-4 block aspect-square w-44 cursor-pointer overflow-hidden rounded-4xl bg-input shadow-inner hover:bg-blue-50/50 hover:shadow-gray-200 dark:bg-blue-100/5
//         //   dark:shadow-gray-300/20 dark:hover:bg-blue-100/15'
//       >
//         {selectedImage[index] && (
//           <img
//             alt={`image${index}`}
//             src={selectedImage[index]}
//             className='h-full w-full object-cover'
//           />
//         )}
//         {!selectedImage[index] && index === 0 && (
//           <PostButton ariaLabel='likes'>
//             <Icon.Picture
//               viewBox='0 0 24 24'
//               strokeWidth={1}
//               className='h-[20px] w-[20px]'
//             />
//           </PostButton>
//         )}
//         {!selectedImage[index] && index !== 0 && selectedImage[index - 1] && (
//           <PostButton ariaLabel='likes'>
//             <Icon.Picture
//               viewBox='0 0 24 24'
//               strokeWidth={1}
//               className='h-[20px] w-[20px]'
//             />
//           </PostButton>
//         )}
//       </label>
//     </div>
//   );
// };
