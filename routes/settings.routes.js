import { Router } from 'express'
import { SettingsController } from '../controllers/settings.controller.js'

export const routesOfSettings = Router()

routesOfSettings.get('/ajustes/tasa', SettingsController.getTasa)

routesOfSettings.patch('/ajustes/tasa', SettingsController.updateTasa)
