import { z } from 'zod'

const actualizarTasaSchema = z.object({
  tasaDolarBs: z
    .number({
      required_error: 'El campo tasaDolarBs es requerido.',
      invalid_type_error: 'La tasa debe ser un valor numérico.'
    })
    .positive({ message: 'La tasa debe ser un número positivo mayor que cero.' })
})

export const validateTasa = (data) => {
  return actualizarTasaSchema.safeParse(data)
}
