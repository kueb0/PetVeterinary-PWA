const HistorialClinico = require('../models/historialClinico');
const HistorialClinicoPrototype = require('../prototypes/historialClinicoPrototype');

class HistorialClinicoController {
  async list(req, res) {
    try {
      const historiales = await HistorialClinico.find().populate('idMascota').populate('idCliente');
      res.json(historiales);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los historiales clínicos', error });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const historial = await HistorialClinico.findById(id).populate('idMascota').populate('idCliente');
      if (historial) {
        res.json(historial);
      } else {
        res.status(404).json({ message: 'El historial clínico no existe' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el historial clínico', error });
    }
  }

  async create(req, res) {
    try {
      const { idHistorialBase, ...data } = req.body;
      let nuevoHistorial;

      if (idHistorialBase) {
        const historialBase = await HistorialClinico.findById(idHistorialBase);
        if (!historialBase) {
          return res.status(404).json({ message: 'El historial base no existe' });
        }
        const prototipo = new HistorialClinicoPrototype(historialBase.toObject());
        prototipo.personalizar(data);
        nuevoHistorial = await prototipo.save();
      } else {
        nuevoHistorial = await HistorialClinico.create(data);
      }

      res.status(201).json({ message: 'Historial clínico creado', historial: nuevoHistorial });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el historial clínico', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedHistorial = await HistorialClinico.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ message: 'El historial clínico fue actualizado', historial: updatedHistorial });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el historial clínico', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await HistorialClinico.findByIdAndDelete(id);
      res.json({ message: 'El historial clínico fue eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el historial clínico', error });
    }
  }
}

module.exports = new HistorialClinicoController();
