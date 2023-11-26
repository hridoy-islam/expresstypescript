import { z } from 'zod'

const userNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const userAddressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
})
const orderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
})

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z.string(),
  fullName: userNameSchema,
  age: z.number().optional(),
  email: z.string().email(),
  isActive: z.boolean().optional(),
  hobbies: z.array(z.string()).optional(),
  address: userAddressSchema,
  order: z.array(orderSchema).optional(),
})

export default UserValidationSchema
