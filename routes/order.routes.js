import { Router } from 'express'
import { OrderController } from '../controllers/order.controller.js'

export const routesOfOrder = Router()

routesOfOrder.get('/pedidos', OrderController.getAll)
routesOfOrder.get('/pedidos/:_id', OrderController.getById)

routesOfOrder.post('/pedidos/crear', OrderController.createOrder)
routesOfOrder.patch('/pedidos/:_id', OrderController.updatedOrderStatus)
