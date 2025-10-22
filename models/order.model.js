import mongoose from 'mongoose'

const { Schema } = mongoose

const OrderModel = new Schema({
  items: [
    {

      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },

      unitPrice: {
        type: Number,
        required: true
      }
    }
  ],
  tasaDelDia: {
    type: Number,
    required: true
  },

  totalBs: {
    type: Number,
    required: true
  },

  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'completado', 'cancelado'],
    default: 'pendiente'

  }
}, {
  timestamps: true
})

export const Order = mongoose.model('Order', OrderModel)
