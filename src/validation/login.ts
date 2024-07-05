import { z } from 'zod';

export const loginSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits long' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
