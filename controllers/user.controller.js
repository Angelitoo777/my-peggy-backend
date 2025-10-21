import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationRegister, validationLogin } from '../validation/user.validation.js'

const JWT_SECRET = process.env.JWT_SECRET

export class UserController {
  static async getAllUsers (req, res) {
    try {
      const users = await User.find().select('-password')
      return res.status(200).json(users)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async register (req, res) {
    const validation = validationRegister(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const { username, password } = validation.data

    try {
      const existingUser = await User.findOne({ username })

      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya existe' })
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new User({
        username,
        password: hashedPassword
      })

      await newUser.save()

      return res.status(201).json({ message: 'Usuario registrado exitosamente' })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async loginUser (req, res) {
    const validation = validationLogin(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.errors })
    }

    const { username, password } = validation.data

    try {
      const user = await User.findOne({ username })

      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Credenciales inválidas' })
      }

      const token = jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role
      }, JWT_SECRET, { expiresIn: '1h' })

      return res
        .cookie('access_token', token,
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
          })
        .status(200)
        .json({ message: 'Inicio de sesión exitoso' })
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  }

  static async logoutUser (req, res) {
    const refreshToken = req.cookies.access_token

    if (!refreshToken) {
      return res.status(204).json({ message: 'No hay sesión activa.' })
    }

    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    })

    return res.status(200).json({ message: 'Sesión cerrada exitosamente.' })
  }
}
