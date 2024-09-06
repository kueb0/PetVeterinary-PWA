const mongoose = require('mongoose');
const Mascota = require('../mascota');

const perroSchema = new mongoose.Schema({
  raza: { type: String, required: true },
  tamaño: { type: String, required: true }
});

const Perro = Mascota.discriminator('Perro', perroSchema);
module.exports = Perro;