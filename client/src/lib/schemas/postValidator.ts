import { z } from 'zod';

export const postSchema = z.object({
  text: z
    .string()
    .trim()
    .min(0)
    .max(2000, '텍스트 내용은 2000자 이하여야 합니다.'),
});

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, '내용을 입력해주세요.')
    .max(2000, '내용은 2000자 이하여야 합니다.'),
});
