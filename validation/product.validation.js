import { z } from 'zod'

const productSchema = z.object({
  name: z.string().min(1, 'Nombre del producto es requeridos'),
  description: z.string().min(1, 'Descripcion del producto es requerida'),
  priceUsd: z.number().positive('Precio debe ser numero positivo'),
  stock: z.number().int().nonnegative('Stock no puede ser negativo')
})

export const validateProduct = (data) => {
  return productSchema.safeParse(data)
}

export const validatePartialProduct = (data) => {
  return productSchema.partial().safeParse(data)
}
