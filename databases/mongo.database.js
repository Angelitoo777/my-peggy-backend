import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

export const connectMongoDB = async () => {
  await mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to MongoDB')
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error)
    })
}
