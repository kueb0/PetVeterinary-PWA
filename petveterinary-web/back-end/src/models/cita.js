const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  hora: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  estatus: {
    type: String,
    enum: ['atendida', 'no atendida', 'no se presentó'],
    default: 'no atendida'
  },
  motivo: {
    type: String,
    required: true
  },
  prescripciones: {
    type: String,
    required: false
  },
  idVeterinario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinario',
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  idMascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
    required: true
  }

});

module.exports = mongoose.model('Cita', citaSchema);