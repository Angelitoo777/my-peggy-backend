export const isAdmin = (req, res, next) => {
  const userRoles = req.user.role

  if (!userRoles || !userRoles.includes('Admin')) {
    return res.status(403).json({ message: 'Acceso no autorizado' })
  }

  next()
}
