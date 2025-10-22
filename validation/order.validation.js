import { z } from 'zod'

const itemDelCarritoSchema = z.object({
  productId: z.string({
    required_error: 'El ID del producto es requerido.'
  })
    .regex(/^[0-9a-fA-F]{24}$/, {
      message: 'El ID del producto no es un ObjectId de MongoDB válido.'
    }),
  quantity: z
    .number({
      required_error: 'La cantidad es requerida.',
      invalid_type_error: 'La cantidad debe ser un número.'
    })
    .int({ message: 'La cantidad debe ser un número entero.' })
    .min(1, { message: 'La cantidad mínima es 1.' })
})

const updatedStatusSchema = z.object({
  estado: z.enum(['completado', 'cancelado'], {
    required_error: 'El campo estado es requerido.',
    invalid_type_error: 'El estado debe ser "completado" o "cancelado".'
  })
})

const createOrderSchema = z
  .array(itemDelCarritoSchema)
  .nonempty({ message: 'El carrito no puede estar vacío.' })

export const createOrderValidation = (data) => {
  return createOrderSchema.safeParse(data)
}

export const validateUpdate = (data) => {
  return updatedStatusSchema.safeParse(data)
}
