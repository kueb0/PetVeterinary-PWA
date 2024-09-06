const CreateCitaCommand = require('../commands/createCitaCommand');
const UpdateCitaCommand = require('../commands/updateCitaCommand');
const DeleteCitaCommand = require('../commands/deleteCitaCommand');
const Cita = require('../models/cita');
const Mascota = require('../models/mascota');
const Veterinario = require('../models/veterinario');
const notificationService = require('../observers/NotificationService');
const EmailNotifier = require('../observers/EmailNotifier');

const emailNotifier = new EmailNotifier();
notificationService.subscribe(emailNotifier);

class CitaController {
  async list(req, res) {
    try {
      const citas = await Cita.find();
      res.json(citas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las citas', error });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const cita = await Cita.findById(id);
      if (cita) {
        res.json(cita);
      } else {
        res.status(404).json({ message: 'La cita no existe' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la cita', error });
    }
  }

  async create(req, res) {
    try {
      const result = await CreateCitaCommand.execute(req.body);
      res.json({ message: 'Cita creada', cita: result });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cita', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const result = await UpdateCitaCommand.execute(id, req.body);
      res.json({ message: 'Cita actualizada', cita: result });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await DeleteCitaCommand.execute(id);
      res.json({ message: 'Cita eliminada' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la cita', error });
    }
  }
  
  // Actualizar disponibilidad después de crear una cita
  async actualizarDisponibilidad(req, res) {
    try {
      const { idVeterinario, dia, horaSeleccionada } = req.body;

      const veterinario = await Veterinario.findById(idVeterinario);
      if (!veterinario) return res.status(404).json({ message: 'Veterinario no encontrado' });

      const horarioDia = veterinario.horario.find(h => h.dia === dia);
      if (!horarioDia) return res.status(404).json({ message: 'Día no encontrado en el horario' });

      const hora = horarioDia.horas.find(h => h.hora === horaSeleccionada);
      if (!hora) return res.status(404).json({ message: 'Hora no encontrada en el horario' });

      hora.disponible = false;
      await veterinario.save();

      res.status(200).json({ message: 'Disponibilidad actualizada' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar disponibilidad', error });
    }
  }

  // Ruta para obtener citas por idVeterinario
 async getCitasPorVeterinario (req, res) {
  try {
    const citas = await Cita.find({ idVeterinario: req.params.idVeterinario });
    res.json(citas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  };

  async getCitasPorVeterinarioAntes (req, res) {
    try {
      const ahora = new Date();
      const citasA = await Cita.find({
        idVeterinario: req.params.idVeterinario,
        fecha: { $lt: ahora } // Filtra por fecha anterior a la fecha actual
      });
      res.json(citasA);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    };

    async getCitasPorVeterinarioPro(req, res) {
      try {
        const ahora = new Date();
        const citasP = await Cita.find({
          idVeterinario: req.params.idVeterinario,
          fecha: { $gt: ahora } // Filtra por fecha futura
        }).populate('idCliente');
  
        // Agregar la información de la mascota relacionada a cada cita
        const citasConMascotas = await Promise.all(citasP.map(async cita => {
          // Obtener la mascota usando el ID de la mascota en la cita
          const mascota = await Mascota.findById(cita.idMascota);
          return {
            ...cita.toObject(),
            mascota // Incluye solo la mascota relacionada con la cita
          };
        }));
  
        res.json(citasConMascotas);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    }
  
    // Método para obtener la mascota asociada a una cita (deja este si también lo necesitas)
    async obtenerMascotaPorCita(req, res) {
      try {
        const citaId = req.params.idCita;
        const cita = await Cita.findById(citaId);
  
        if (!cita) {
          return res.status(404).json({ message: 'Cita no encontrada' });
        }
  
        const mascota = await Mascota.findById(cita.idMascota);
  
        if (!mascota) {
          return res.status(404).json({ message: 'Mascota no encontrada' });
        }
  
        res.json(mascota);
      } catch (error) {
        res.status(500).json({ message: 'Error al obtener la mascota', error });
      }
    }
  }



module.exports = new CitaController();
