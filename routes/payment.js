const express = require('express');
const router = express.Router();

// Simulacion de integracion con una API de pagos externa
router.post('/checkout', (req, res) => {
  const { productoId, monto, metodoPago } = req.body;

  if (!productoId || !monto || !metodoPago) {
    return res.status(400).json({ error: 'productoId, monto y metodoPago son requeridos' });
  }

  // Simulacion de respuesta de un gateway de pago
  const transaccion = {
    id: `txn_${Date.now()}`,
    productoId,
    monto,
    metodoPago,
    estado: 'aprobado'
  };

  res.status(201).json({ mensaje: 'Pago procesado correctamente', transaccion });
});

module.exports = router;
