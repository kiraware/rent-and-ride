import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
})

export const SignupSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimun 6 characters length' }),
  name: z.string().min(1, { message: 'Name is required' }),
})
