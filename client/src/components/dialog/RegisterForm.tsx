import { ReactNode, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';

import { Form } from '../form';
import { DialogLayout } from '../layout';

import client from '@/lib/services';
import { registerSchema } from '@/lib/schemas';

const RegisterForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  });
  const [success, setSuccess] = useState<string>('');

  const onSubmit = async (request: FieldValues) => {
    try {
      await client.post('register', request);

      setSuccess('회원가입이 완료되었습니다.');
      setTimeout(() => {
        document.getElementById('dialog-close')?.click();
        setSuccess('');
        reset();
      }, 750);
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        const error = err.response!.data.error;
        if (error.username) {
          setError('username', { message: error.username });
        }
        if (error.password) {
          setError('password', { message: error.password });
        }
        if (error.confirmPassword) {
          setError('confirmPassword', { message: error.confirmPassword });
        }
      }
    }
  };

  return (
    <DialogLayout title='Register'>
      <Form.Layout handleSubmit={handleSubmit(onSubmit)}>
        <Form.Input
          label='Username'
          placeholder='username'
          error={
            errors.username?.message
              ? (errors.username.message as ReactNode)
              : ''
          }
          {...register('username')}
        />
        <Form.Input
          label='Password'
          type='password'
          placeholder='password'
          error={
            errors.password?.message
              ? (errors.password.message as ReactNode)
              : ''
          }
          {...register('password')}
        />
        <Form.Input
          label='Confirm Password'
          type='password'
          placeholder='confirm password'
          error={
            errors.confirmPassword?.message
              ? (errors.confirmPassword.message as ReactNode)
              : ''
          }
          success={success || ''}
          {...register('confirmPassword')}
        />
        <Form.SubmitButton text='Register' disabled={!isDirty} />
      </Form.Layout>
    </DialogLayout>
  );
};

export default RegisterForm;
