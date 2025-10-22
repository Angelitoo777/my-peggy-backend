import express from 'express'
import { connectMongoDB } from './databases/mongo.database.js'
import { routesOfUser } from './routes/user.routes.js'
import { routesOfProduct } from './routes/product.routes.js'
import { routesOfOrder } from './routes/order.routes.js'
import { routesOfSettings } from './routes/settings.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
