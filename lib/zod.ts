import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from './constants';

export const UploadSchema = z.object({
  pdf: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, `PDF file must be less than 50MB`)
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      'Only PDF files are accepted'
    ),
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  author: z
    .string()
    .min(1, 'Author name is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must be less than 100 characters'),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      'Cover image must be less than 10MB'
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPEG, PNG, and WebP images are accepted'
    ),
  voiceId: z
    .string()
    .min(1, 'Please select a voice'),
});

export type UploadFormData = z.infer<typeof UploadSchema>;
