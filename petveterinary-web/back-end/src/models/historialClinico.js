const mongoose = require('mongoose');

const historialClinicoSchema = new mongoose.Schema({
  idMascota: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mascota',
    required: true
  },
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  tratamientosPrevios: [{
    tipo: String,
    descripcion: String,
    fecha: Date
  }],
  vacunas: [{
    nombre: String,
    fecha: Date
  }],
  visitas: [{
    motivo: String,
    fecha: Date,
    hallazgos: String
  }]
});

module.exports = mongoose.model('HistorialClinico', historialClinicoSchema);