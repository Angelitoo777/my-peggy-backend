import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/isAdmin.middleware.js'

export const routesOfProduct = Router()

routesOfProduct.get('/products', ProductController.getAllProducts)
routesOfProduct.get('/products/:_id', ProductController.getAllProductById)

routesOfProduct.post('/products', authMiddleware, isAdmin, ProductController.createProduct)
routesOfProduct.patch('/products/:_id', authMiddleware, isAdmin, ProductController.updateProduct)
routesOfProduct.delete('/products/:_id', authMiddleware, isAdmin, ProductController.deleteProduct)
