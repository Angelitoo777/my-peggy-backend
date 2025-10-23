import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'

export const routesOfUser = Router()

routesOfUser.get('/users', authMiddleware, isAdmin, UserController.getAllUsers)
routesOfUser.get('/logout', authMiddleware, UserController.logoutUser)

routesOfUser.post('/register', UserController.register)
routesOfUser.post('/login', UserController.loginUser)
