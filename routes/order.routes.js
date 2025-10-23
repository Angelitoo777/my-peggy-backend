import { Router } from 'express'
import { OrderController } from '../controllers/order.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'

export const routesOfOrder = Router()

routesOfOrder.get('/pedidos', authMiddleware, isAdmin, OrderController.getAll)
routesOfOrder.get('/pedidos/:_id', authMiddleware, isAdmin, OrderController.getById)

routesOfOrder.post('/pedidos/crear', OrderController.createOrder)
routesOfOrder.patch('/pedidos/:_id', authMiddleware, isAdmin, OrderController.updatedOrderStatus)
