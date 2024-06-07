import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';

import { Form } from '.';
import ProfileAvatar from '../ProfileAvatar';

import client from '@/lib/services';
import { profileSchema, imageFileValidation } from '@/lib/schemas';
import { store, setProfile } from '@/lib/store';
import { convertToBase64 } from '@/lib/utils';
import { UserProfile } from '@/lib/types';

const ProfileForm: React.FC<{
  username: string;
  profile: UserProfile;
}> = ({ username, profile }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<UserProfile>({
    defaultValues: {
      nickname: profile.nickname,
      image: profile.image,
      description: profile.description,
    },
    resolver: zodResolver(profileSchema),
  });
  const [success, setSuccess] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(
    profile.image
  );
  const navigate = useNavigate();

  const onSubmit = async (request: FieldValues) => {
    try {
      const {
        data: { profile },
      } = await client.post(`profile/${username}/edit`, {
        ...request,
        image: selectedImage,
      });

      store.dispatch(setProfile({ profile }));

      setSuccess('변경 완료되었습니다.');
      setTimeout(() => {
        navigate('/');
        setSuccess('');
      }, 1000);
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        const { data, status } = err.response!;

        if (data) {
          const errors = Object.entries(data) as [
            key: keyof UserProfile,
            message: string,
          ][];
          errors.forEach(([key, message]) => {
            setError(key, { message });
          });
        }

        if (status === 413) {
          setError('image', { message: '파일 크기는 5MB 이하여야 합니다.' });
          return;
        }
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setSelectedImage('');
      return;
    }

    const result = imageFileValidation.safeParse(file);

    if (result.success) {
      const file = result.data!;
      const base64 = await convertToBase64(file);
      setSelectedImage(base64);

      clearErrors('image');
    } else {
      const errorMessage = result.error.issues[0]?.message;
      setError('image', { message: errorMessage });

      setSelectedImage('');
    }
  };

  return (
    <Form.Layout handleSubmit={handleSubmit(onSubmit)} className='gap-5'>
      <div>
        <input
          type='file'
          id='profile-image'
          accept='image/*'
          className='hidden'
          onClick={() => setSelectedImage(null)}
          {...register('image', {
            onChange: handleImageChange,
          })}
        />
        <label
          htmlFor='profile-image'
          className='mx-auto mb-4 block aspect-square w-44 cursor-pointer overflow-hidden rounded-4xl bg-input shadow-inner hover:bg-blue-50/50 hover:shadow-gray-200 dark:bg-blue-100/5
          dark:shadow-gray-300/20 dark:hover:bg-blue-100/15'
        >
          {selectedImage && (
            <ProfileAvatar
              nickname={profile.nickname}
              image={selectedImage}
              className='h-full w-full'
            />
          )}
        </label>
        {errors.image && (
          <Form.Feedback type='error' className='mb-2 text-center'>
            {errors.image?.message || ''}
          </Form.Feedback>
        )}
      </div>
      <div>
        <Form.Input
          label='Nickname'
          placeholder='nickname'
          className='bg-input'
          error={
            errors.nickname?.message
              ? (errors.nickname.message as ReactNode)
              : ''
          }
          {...register('nickname')}
        />
        <Form.Input
          type='textarea'
          label='Description'
          placeholder='Introduce you...'
          rows={3}
          className='bg-input'
          error={
            errors.description?.message
              ? (errors.description.message as ReactNode)
              : ''
          }
          success={success || ''}
          {...register('description')}
        />
      </div>
      <Form.SubmitButton text='Edit' />
    </Form.Layout>
  );
};

export default ProfileForm;
