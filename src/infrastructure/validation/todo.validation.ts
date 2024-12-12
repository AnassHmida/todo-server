import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters'),
    completed: z.boolean()
  })
});

export const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid todo ID')
  }),
  body: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .max(100, 'Title must be less than 100 characters')
      .optional(),
    completed: z.boolean().optional()
  })
});