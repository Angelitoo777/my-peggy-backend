import { z } from 'zod'

const createUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['User', 'Admin']).optional()
})

const loginUserSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long')
})

export const validationRegister = (data) => {
  return createUserSchema.safeParse(data)
}

export const validationLogin = (data) => {
  return loginUserSchema.safeParse(data)
}
