const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'productos.json');

function leerProductos() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function guardarProductos(productos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(productos, null, 2));
}

// GET /api/productos - listar todos
router.get('/', (req, res) => {
  const productos = leerProductos();
  res.json(productos);
});

// GET /api/productos/:id - obtener uno
router.get('/:id', (req, res) => {
  const productos = leerProductos();
  const producto = productos.find(p => p.id === parseInt(req.params.id, 10));
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
});

// POST /api/productos - crear
router.post('/', (req, res) => {
  const productos = leerProductos();
  const nuevoProducto = {
    id: productos.length ? Math.max(...productos.map(p => p.id)) + 1 : 1,
    nombre: req.body.nombre,
    precio: req.body.precio,
    stock: req.body.stock
  };
  productos.push(nuevoProducto);
  guardarProductos(productos);
  res.status(201).json(nuevoProducto);
});

// PUT /api/productos/:id - actualizar
router.put('/:id', (req, res) => {
  const productos = leerProductos();
  const index = productos.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  productos[index] = { ...productos[index], ...req.body, id: productos[index].id };
  guardarProductos(productos);
  res.json(productos[index]);
});

// DELETE /api/productos/:id - eliminar
router.delete('/:id', (req, res) => {
  const productos = leerProductos();
  const index = productos.findIndex(p => p.id === parseInt(req.params.id, 10));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const eliminado = productos.splice(index, 1);
  guardarProductos(productos);
  res.json({ mensaje: 'Producto eliminado', producto: eliminado[0] });
});

module.exports = router;
