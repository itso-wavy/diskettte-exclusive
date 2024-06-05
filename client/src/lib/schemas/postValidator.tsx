import { z } from 'zod';

export const postSchema = z.object({
  text: z.string().trim().min(0).max(2000),
});
