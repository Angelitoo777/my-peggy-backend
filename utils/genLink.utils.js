import dotenv from 'dotenv'

dotenv.config()

export function generarLink (pedido) {
  const numeroDestino = process.env.WHATSAPP_NUMBER
  if (!numeroDestino) return null

  let mensaje = '¡Hola! Quisiera hacer el siguiente pedido:\n\n'

  for (const item of pedido.items) {
    const precioUnitarioBs = (item.unitPrice * pedido.tasaDelDia).toFixed(2)

    mensaje += `*${item.quantity}x* ${item.name}\n`
    mensaje += `   (Precio Unitario: ${precioUnitarioBs} Bs)\n`
  }

  mensaje += `\n*Total a Pagar (Bs): ${pedido.totalBs.toFixed(2)} Bs*`

  mensaje += `\n\n(Tasa usada: ${pedido.tasaDelDia} Bs/$)`

  const mensajeCodificado = encodeURIComponent(mensaje)

  return `https://wa.me/${numeroDestino}?text=${mensajeCodificado}`
}
