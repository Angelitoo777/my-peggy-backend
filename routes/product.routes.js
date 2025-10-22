import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

export const routesOfProduct = Router()

routesOfProduct.get('/products', ProductController.getAllProducts)
routesOfProduct.get('/products/:_id', ProductController.getAllProductById)

routesOfProduct.post('/products', ProductController.createProduct)
routesOfProduct.patch('/products/:_id', ProductController.updateProduct)
routesOfProduct.delete('/products/:_id', ProductController.deleteProduct)
