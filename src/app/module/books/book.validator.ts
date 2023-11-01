import { z } from 'zod'
import { bookEnum } from './bookConstant'

export const createBookValidatorZod = z.object({
  body: z.object({
    title: z.string(),
    image: z.string(),
    genre: z.enum(bookEnum as [string, ...string[]]),
    publicationDate: z.string().datetime(),
  }),
})

export const updateBookValidatorZod = z.object({
  body: z.object({
    title: z.string().optional(),
    image: z.string().optional(),
    genre: z.enum(bookEnum as [string, ...string[]]).optional(),
    publicationDate: z.string().datetime().optional(),
    isFinishd: z.boolean().optional(),
  }),
});
