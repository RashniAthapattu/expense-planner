import { z } from 'zod';

export const addAmountSchema = z.object({
  description: z
    .string()
    .min(5, {
      message: 'Description must be at least 5 characters.',
    })
    .max(100, {
      message: 'Description must not be longer than 100 characters.',
    }),
    type: z
    .string(),
  amount: z
    .number()
    .min(0.01, {
      message: 'Amount must be greater than 0.',
    })
});