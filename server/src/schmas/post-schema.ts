import { z } from 'zod';

export const postContentsSchema = z.object({
  text: z.string().trim().min(0).max(2000, '내용은 2000자 이하여야 합니다.'),
});
