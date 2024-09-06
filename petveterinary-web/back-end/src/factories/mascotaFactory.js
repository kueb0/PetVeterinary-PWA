const Perro = require('../models/tipoMascota/perro');
const Gato = require('../models/tipoMascota/gato');
const Ave = require('../models/tipoMascota/ave');
const Reptil = require('../models/tipoMascota/reptil');
const Roedor = require('../models/tipoMascota/roedor');

class MascotaFactory {
  static createMascota(tipo, data) {
    switch (tipo) {
      case 'Perro':
        return new Perro(data);
      case 'Gato':
        return new Gato(data);
      case 'Ave':
        return new Ave(data);
      case 'Reptil':
        return new Reptil(data);
      case 'Roedor':
        return new Roedor(data);
      default:
        throw new Error('Tipo de mascota no soportado');
    }
  }
}

module.exports = MascotaFactory;
