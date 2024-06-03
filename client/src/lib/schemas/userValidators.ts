import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, '사용자 이름은 3자 이상이어야 합니다.')
    .max(20, '사용자 이름은 20자 이하여야 합니다.'),
  password: z
    .string()
    .trim()
    .min(4, '비밀번호는 4자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.'
    ),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, '사용자 이름은 3자 이상이어야 합니다.')
      .max(20, '사용자 이름은 20자 이하여야 합니다.'),
    password: z
      .string()
      .trim()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        '비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.'
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });
