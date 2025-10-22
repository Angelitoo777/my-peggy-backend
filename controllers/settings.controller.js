import { Settings } from '../models/settings.model.js'
import { validateTasa } from '../validation/settings.validation.js'

export class SettingsController {
  static async getTasa (req, res) {
    try {
      const tasa = await Settings.findOne({ name: 'configuracionGlobal' })

      return res.status(200).json(tasa)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async updateTasa (req, res) {
    const validation = validateTasa(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const update = validation.data
    try {
      const tasa = await Settings.findOneAndUpdate({ name: 'configuracionGlobal' }, update, { new: true })

      if (!tasa) {
        return res.status(404).json({ message: 'La tasa no fue encontrada' })
      }

      return res.status(200).json({ message: 'Tasa actualizada exitosamente', tasa })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
