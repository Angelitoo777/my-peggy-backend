import { Order } from '../models/order.model.js'
import { Product } from '../models/products.model.js'
import { Settings } from '../models/settings.model.js'
import { generarLink } from '../utils/genLink.utils.js'
import { createOrderValidation, validateUpdate } from '../validation/order.validation.js'

export class OrderController {
  static async getAll (req, res) {
    try {
      const orders = await Order.find().populate('items.productId')
      return res.status(200).json(orders)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getById (req, res) {
    const { _id } = req.params

    try {
      const order = await Order.findById(_id).populate('items.productId')

      if (!order) {
        return res.status(404).json({ message: 'Orden no encontrada' })
      }

      return res.status(200).json(order)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async createOrder (req, res) {
    const validation = createOrderValidation(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const items = validation.data

    const itemProcesados = []
    let totalCalculadoUSD = 0

    try {
      const settings = await Settings.findOne({ name: 'configuracionGlobal' })

      if (!settings) {
        return res.status(500).json({ message: 'Error: Tasa de cambio no configurada.' })
      }

      const tasaActual = settings.tasaDolarBs

      const productsIds = items.map(item => item.productId)
      const productsInDb = await Product.find({ _id: { $in: productsIds } })

      const productMap = new Map(
        productsInDb.map((product) => [product._id.toString(), product])
      )

      for (const item of items) {
        const productFound = productMap.get(item.productId)

        if (!productFound) {
          return res.status(404).json({ message: `El producto con ID ${item.productId} no fue encontrado` })
        }

        if (item.quantity > productFound.stock) {
          return res.status(400).json({ message: `Stock insuficiente para ${productFound.name}. Solicitado: ${item.quantity}, Disponible: ${productFound.stock}` })
        }

        itemProcesados.push({
          productId: productFound._id,
          name: productFound.name,
          quantity: item.quantity,
          unitPrice: productFound.priceUsd
        })

        totalCalculadoUSD += productFound.priceUsd * item.quantity
      }

      const totalCalculadoBS = totalCalculadoUSD * tasaActual

      const newOrder = new Order({
        items: itemProcesados,
        total: totalCalculadoUSD,
        tasaDelDia: tasaActual,
        totalBs: totalCalculadoBS,
        estado: 'pendiente'
      })

      await newOrder.save()

      const linkWhatsapp = generarLink(newOrder)

      return res.status(201).json({ link_whatsapp: linkWhatsapp })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async updatedOrderStatus (req, res) {
    const { _id } = req.params
    const validation = validateUpdate(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const { estado } = validation.data

    try {
      const order = await Order.findById(_id)

      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' })
      }

      if (order.estado === 'completado' || order.estado === 'cancelado') {
        return res.status(400).json({ message: `El pedido ya fue ${order.estado}` })
      }

      if (estado === 'completado') {
        const operaciones = order.items.map(item => ({
          updateOne: {
            filter: { _id: item.productId },
            update: { $inc: { stock: -item.quantity } }
          }
        }))

        await Product.bulkWrite(operaciones)
      }

      order.estado = estado
      await order.save()

      return res.status(200).json({ message: `Pedido actualizado a: ${estado}`, order })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
