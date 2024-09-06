const mongoose = require('mongoose');
const Rol = require('./rol');

const veterinarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  cedulaProfesional: {
    type: String,
    required: true,
    unique: true
  },
  rol: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rol',
    required: false
  },
  code: {
    type: Number,
    default: null,
    required: false
  },
  horario: [{
    dia: {
      type: String,
      enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      required: true
    },
    horas: [{
      hora: {
        type: String,
        required: true
      },
      disponible: {
        type: Boolean,
        default: true
      }
    }]
  }]
});

veterinarioSchema.pre('save', async function (next) {
  if (!this.rol) {
    const rolVeterinario = await Rol.findOne({ cveRol: 2 });
    if (rolVeterinario) {
      this.rol = rolVeterinario._id;
    }
  }
  next();
});

module.exports = mongoose.model('Veterinario', veterinarioSchema);
