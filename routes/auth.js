const express = require('express');
const router = express.Router();

// Usuario de demostracion (en un proyecto real esto vendria de una base de datos)
const USUARIO_DEMO = { usuario: 'admin', password: '1234' };

// POST /api/auth/login - formulario de login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ error: 'Usuario y password son requeridos' });
  }

  if (usuario === USUARIO_DEMO.usuario && password === USUARIO_DEMO.password) {
    return res.json({ mensaje: 'Login exitoso', token: 'demo-token-123' });
  }

  return res.status(401).json({ error: 'Credenciales invalidas' });
});

module.exports = router;
