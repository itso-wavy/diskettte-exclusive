import { z } from 'zod';

export const postContentsSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, '필수 항목입니다.')
    .max(50, '제목은 50자 이하여야 합니다.'),
});
