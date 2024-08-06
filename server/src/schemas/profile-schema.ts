import { z } from 'zod';
import { imageFileValidation } from './imageFileValidator';

export const profileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, '필수 항목입니다.')
    .max(15, '닉네임은 15자 이하여야 합니다.'),
  image: imageFileValidation.nullish(),
  description: z.string().max(200, '소개글은 200자 이하여야 합니다.').nullish(),
});
