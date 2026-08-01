function validarProducto(req, res, next) {
  const { nombre, precio, stock } = req.body;
  const errores = [];

  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
    errores.push('El campo "nombre" es requerido y debe ser texto');
  }
  if (precio === undefined || typeof precio !== 'number' || precio < 0) {
    errores.push('El campo "precio" es requerido y debe ser un numero positivo');
  }
  if (stock === undefined || typeof stock !== 'number' || stock < 0) {
    errores.push('El campo "stock" es requerido y debe ser un numero positivo');
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
}

module.exports = { validarProducto };
