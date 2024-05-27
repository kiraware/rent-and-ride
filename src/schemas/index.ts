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

export const PesanKendaraanSchema = z
  .object({
    userId: z.string().min(1, { message: 'userId is required' }),
    vehicleId: z.string().min(1, { message: 'vehicleId is required' }),
    price: z.string().min(1, { message: 'price is required' }),
    startDate: z.string(),
    endDate: z.string(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'endDate must be after or equal to startDate',
  })
