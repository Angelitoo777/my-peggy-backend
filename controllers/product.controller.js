import { Product } from '../models/products.model.js'
import { validateProduct, validatePartialProduct } from '../validation/product.validation.js'

export class ProductController {
  static async getAllProducts (req, res) {
    try {
      const products = await Product.find()

      return res.status(200).json(products)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async getAllProductById (req, res) {
    const { _id } = req.params

    try {
      const productById = await Product.findById(_id)

      if (!productById) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      return res.status(200).json(productById)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async createProduct (req, res) {
    const validation = validateProduct(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const { name, priceUsd, description, stock } = validation.data

    try {
      const newProduct = new Product({
        name,
        priceUsd,
        description,
        stock
      })
      await newProduct.save()

      return res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async updateProduct (req, res) {
    const { _id } = req.params
    const validation = validatePartialProduct(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const updateData = validation.data

    try {
      const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true })

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      return res.status(200).json({ message: 'Producto actualizado exitosamente', product: updatedProduct })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async deleteProduct (req, res) {
    const { _id } = req.params

    try {
      const deletedProduct = await Product.findByIdAndDelete(_id)

      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      return res.status(200).json({ message: 'Producto eliminado exitosamente' })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }
}
