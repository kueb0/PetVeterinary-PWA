const mongoose = require('mongoose');
const Mascota = require('../mascota');

const aveSchema = new mongoose.Schema({
  tipoDeAve: {
    type: String,
    required: true
  },
  puedeVolar: {
    type: Boolean,
    required: true
  }
});

const Ave = Mascota.discriminator('Ave', aveSchema);
module.exports = Ave;