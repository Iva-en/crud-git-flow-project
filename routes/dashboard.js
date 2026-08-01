const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'productos.json');

// GET /api/dashboard - resumen general para el usuario
router.get('/', (req, res) => {
  const productos = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

  const totalProductos = productos.length;
  const valorInventario = productos.reduce((acc, p) => acc + p.precio * p.stock, 0);
  const stockBajo = productos.filter(p => p.stock < 10);

  res.json({
    totalProductos,
    valorInventario: Number(valorInventario.toFixed(2)),
    productosConStockBajo: stockBajo
  });
});

module.exports = router;
