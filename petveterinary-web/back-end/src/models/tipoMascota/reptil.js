const mongoose = require('mongoose');
const Mascota = require('../mascota');

const reptilSchema = new mongoose.Schema({
  tipoDeReptil: {
    type: String,
    required: true
  },
  esVenenoso: {
    type: Boolean,
    required: true
  }
});

const Reptil = Mascota.discriminator('Reptil', reptilSchema);
module.exports = Reptil;