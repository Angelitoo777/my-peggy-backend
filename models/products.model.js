import mongoose from 'mongoose'

const { Schema } = mongoose

const productSchema = new Schema({
  name: { type: String, required: true },
  priceUsd: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  stock: { type: Number, required: true, min: 0, default: 0 }
}, {
  timestamps: true
})

export const Product = mongoose.model('Product', productSchema)
