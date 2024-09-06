const mongoose = require('mongoose');
const Mascota = require('../mascota');

const roedorSchema = new mongoose.Schema({
  tipoDeRoedor: { type: String, required: true },
  esDomestico: { type: Boolean, required: true }
});

const Roedor = Mascota.discriminator('Roedor', roedorSchema);
module.exports = Roedor;
