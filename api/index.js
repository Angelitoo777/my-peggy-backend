import express from 'express'
import { connectMongoDB } from '../databases/mongo.database.js'
import { routesOfUser } from '../routes/user.routes.js'
import { routesOfProduct } from '../routes/product.routes.js'
import { routesOfOrder } from '../routes/order.routes.js'
import { routesOfSettings } from '../routes/settings.routes.js'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from '../middlewares/cors.middleware.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware)

try {
  await connectMongoDB()
} catch (error) {
  console.error('Error connecting to MongoDB:', error)
}

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

app.use('/auth', routesOfUser)
app.use('/api', routesOfProduct)
app.use('/api', routesOfOrder)
app.use('/api', routesOfSettings)

export default app
