import { z } from 'zod';

export const profileSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(1, '필수 항목입니다.')
    .max(20, '닉네임은 20자 이하여야 합니다.'),
  description: z
    .string()
    .trim()
    .max(50, '소개글은 50자 이하여야 합니다.')
    .nullish(),
});
