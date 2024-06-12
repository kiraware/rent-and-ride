import { ColorEnum, MerkEnum, VehicleTypeEnum } from '@prisma/client'
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

export const CancelOrderSchema = z.object({
  orderId: z.string().min(1, { message: 'Order Id is required' }),
})

export const ProcessOrderSchema = z.object({
  orderId: z.string().min(1, { message: 'Order Id is required' }),
  action: z.enum(['bayar', 'ambil', 'kembalikan'], {
    message: 'Action must be either "ambil" or "kembalikan"',
  }),
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

export const CreateVehicleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  image: z.string().min(1, { message: 'image is required' }),
  merk: z.string().min(1, { message: 'merk is required' }),
  color: z.string().min(1, { message: 'color is required' }),
  type: z.string().min(1, { message: 'type is required' }),
  price: z.string().min(1, { message: 'price is required' }),
})

export const EditVehicleSchema = z.object({
  id: z.string().min(1, { message: 'Id is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  image: z.string().min(1, { message: 'image is required' }),
  merk: z.string().min(1, { message: 'merk is required' }),
  color: z.string().min(1, { message: 'color is required' }),
  type: z.string().min(1, { message: 'type is required' }),
  price: z.string().min(1, { message: 'price is required' }),
})
