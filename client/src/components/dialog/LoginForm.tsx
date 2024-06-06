import { ReactNode, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';

import { Form } from '../form';
import { DialogLayout } from '../layout';

import client from '@/lib/services';
import { loginSchema } from '@/lib/schemas';
import { store, setLogin } from '@/lib/store';

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    setError,
    reset,
  } = useForm({
    defaultValues: { username: '', password: '' },
    resolver: zodResolver(loginSchema),
  });
  const [success, setSuccess] = useState<string>('');

  const onSubmit = async (request: FieldValues) => {
    try {
      const {
        data: { username, accessToken, profile },
      } = await client.post('login', request);

      store.dispatch(setLogin({ username, token: accessToken, profile }));

      setSuccess('로그인에 성공했습니다.');
      setTimeout(() => {
        document.getElementById('dialog-close')?.click();
        setSuccess('');
        reset();
      }, 750);
    } catch (err) {
      console.log(err);
      if (isAxiosError(err)) {
        const error = err.response!.data;
        if (error.username) {
          setError('username', { message: error.username });
        }
        if (error.password) {
          setError('password', { message: error.password });
        }
      }
    }
  };

  return (
    <DialogLayout title='Login'>
      <Form.Layout handleSubmit={handleSubmit(onSubmit)}>
        <div>
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
            success={success || ''}
            {...register('password')}
          />
        </div>
        <Form.SubmitButton text='Login' disabled={!isDirty} />
      </Form.Layout>
    </DialogLayout>
  );
};

export default LoginForm;
