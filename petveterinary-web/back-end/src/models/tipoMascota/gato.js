const mongoose = require('mongoose');
const Mascota = require('../mascota');

const gatoSchema = new mongoose.Schema({
  raza: { type: String, required: true },
  esDomestico: { type: Boolean, required: true }
});

const Gato = Mascota.discriminator('Gato', gatoSchema);
module.exports = Gato;