const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombreMascota: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  edad: {
    type: Number,
    required: true
  },
  especie: {
    type: String,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  }
});

module.exports = mongoose.model('Mascota', mascotaSchema);
