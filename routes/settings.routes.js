import { Router } from 'express'
import { SettingsController } from '../controllers/settings.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'

export const routesOfSettings = Router()

routesOfSettings.get('/ajustes/tasa', SettingsController.getTasa)

routesOfSettings.patch('/ajustes/tasa', authMiddleware, isAdmin, SettingsController.updateTasa)
