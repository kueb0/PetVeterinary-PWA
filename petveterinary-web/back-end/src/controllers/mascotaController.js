const MascotaFactory = require('../factories/mascotaFactory');
const Mascota = require('../models/mascota');
const Cliente = require('../models/cliente'); 

class MascotaController {
  async list(req, res) {
    try {
      const mascotas = await Mascota.find().populate('idCliente');
      res.json(mascotas);
    } catch (error) {
      console.error('Error al obtener las mascotas:', error);
      res.status(500).json({ message: 'Error al obtener las mascotas', error });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const mascota = await Mascota.findById(id).populate('idCliente');
      if (mascota) {
        res.json(mascota);
      } else {
        res.status(404).json({ message: 'La mascota no existe' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la mascota', error });
    }
  }

  /*
  //para ver que cliente le pertenece cada mascota, pero este va para el crud de clientes
  async getOne(req, res) {
    try {
      const { idCliente } = req.params; 
      const mascotas = await Mascota.find({ idCliente }).populate('idCliente');
      if (mascotas.length > 0) {
        res.json(mascotas);
      } else {
        res.status(404).json({ message: 'No se encontraron mascotas para este cliente' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las mascotas', error });
    }
  }*/

  async create(req, res) {
    try {
      const { especie, idCliente, ...data } = req.body;
      if (!idCliente) {
        return res.status(400).json({ message: 'idCliente es requerido' });
      }
      const nuevaMascota = MascotaFactory.createMascota(especie, { ...data, especie, idCliente });
      const savedMascota = await nuevaMascota.save();
      res.json({ message: 'Mascota guardada', mascota: savedMascota });
    } catch (error) {
      console.error('Error al guardar la mascota:', error);
      res.status(500).json({ message: 'Error al guardar la mascota', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Mascota.findByIdAndDelete(id);
      res.json({ message: 'La mascota fue eliminada' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la mascota', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedMascota = await Mascota.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ message: 'La mascota fue actualizada', mascota: updatedMascota });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la mascota', error });
    }
  }

  async obtenerMascotasPorUsuario(req, res){
    try {
      const mascotas = await Mascota.find({ idCliente: req.params.idCliente });
      res.json(mascotas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener mascotas', error });
    }
  }
}

module.exports = new MascotaController();
