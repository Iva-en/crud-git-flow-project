const express = require('express');
const productosRouter = require('./routes/productos');
const paymentRouter = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API CRUD Git Flow Project funcionando correctamente' });
});

app.use('/api/productos', productosRouter);
app.use('/api/payment', paymentRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;
