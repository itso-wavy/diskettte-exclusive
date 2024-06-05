import { z } from 'zod';

export const imageFileValidation = z
  .instanceof(File)
  .refine(
    file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(extension || '');
    },
    { message: '허용되지 않는 파일 형식입니다.' }
  )
  .refine(file => file?.size <= 5 * 1024 * 1024, {
    message: '파일 크기는 5MB 이하여야 합니다.',
  });

const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'jfif', 'webp'];
