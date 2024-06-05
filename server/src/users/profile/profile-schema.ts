import { z } from 'zod';

export const profileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, '필수 항목입니다.')
    .max(10, '닉네임은 10자 이하여야 합니다.'),
  image: z
    .string()
    .refine(
      value => {
        const extension = value.split(';')[0]!.split('/')[1];
        return allowedExtensions.includes(extension || '');
      },
      {
        message: '허용되지 않는 파일 형식입니다.',
      }
    )
    .refine(
      value => {
        const size = Buffer.from(value.split(',')[1]!, 'base64').length;
        return size <= 5 * 1024 * 1024;
      },
      {
        message: '파일 크기는 5MB 이하여야 합니다.',
      }
    )
    .nullish(),
  description: z.string().max(50, '소개글은 50자 이하여야 합니다.').nullish(),
});

const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'webp'];
