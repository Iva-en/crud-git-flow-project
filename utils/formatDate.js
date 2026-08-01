// BUG ORIGINAL: se usaba `new Date().toString()`, lo que generaba un formato
// inconsistente y dependiente del locale/timezone del servidor (ej:
// "Fri Jul 31 2026 14:23:10 GMT-0400"), rompiendo la serializacion JSON
// esperada por el cliente.
//
// FIX: se estandariza el formato de fecha a ISO 8601 (YYYY-MM-DD), consistente
// y facil de parsear en cualquier cliente/frontend.
function formatearFecha(fecha = new Date()) {
  return fecha.toISOString().split('T')[0];
}

module.exports = { formatearFecha };
