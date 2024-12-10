import { z } from 'zod';

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string()
      .email('Invalid email format')
      .min(1, 'Email is required'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    name: z.string()
      .min(1, 'Name is required')
      .max(50, 'Name must be less than 50 characters')
  })
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string()
      .email('Invalid email format')
      .min(1, 'Email is required'),
    password: z.string()
      .min(1, 'Password is required')
  })
});