import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  author: z.string()
    .min(1, 'Author is required'),
  excerpt: z.string()
    .min(1, 'Excerpt is required')
    .max(300, 'Excerpt cannot exceed 300 characters'),
  content: z.string()
    .min(1, 'Content is required'),
  tags: z.string(),
  images: z.array(z.instanceof(File)).max(5, 'Maximum 5 images allowed').optional(),
});

export const postSchema = z.object({
  _id: z.string(),
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300),
  coverImage: z.string().url().optional(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const paginationSchema = z.object({
  currentPage: z.number().positive(),
  totalPages: z.number().positive(),
  totalItems: z.number().nonnegative(),
  itemsPerPage: z.number().positive(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
});

export const paginatedResponseSchema = z.object({
  data: z.array(z.any()),
  pagination: z.object({
    currentPage: z.number().positive(),
    totalPages: z.number().positive(),
    totalItems: z.number().min(0),
    itemsPerPage: z.number().positive(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
  }),
});

export const queryParamsSchema = z.object({
  page: z.number().positive().default(1),
  limit: z.number().positive().max(50).default(9),
  search: z.string().default(''),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type PaginatedResponseSchema = z.infer<typeof paginatedResponseSchema>;
export type QueryParamsSchema = z.infer<typeof queryParamsSchema>;