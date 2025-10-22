import { z } from 'zod'

const createUserSchema = z.object({
  username: z.string().min(3, 'Username tiene que ser minimo de 3 caracteres'),
  password: z.string().min(6, 'Password tiene que ser minimo de 6 caracteres'),
  role: z.enum(['User', 'Admin']).optional()
})

const loginUserSchema = z.object({
  username: z.string().min(3, ' Username tiene que ser minimo de 3 caracteres'),
  password: z.string().min(6, 'Password tiene que ser minimo de 6 caracteres')
})

export const validationRegister = (data) => {
  return createUserSchema.safeParse(data)
}

export const validationLogin = (data) => {
  return loginUserSchema.safeParse(data)
}
