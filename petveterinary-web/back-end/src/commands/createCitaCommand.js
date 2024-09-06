const Cita = require('../models/cita');
const notificationService = require('../observers/NotificationService');

class CreateCitaCommand {
  async execute(data) {
    console.log('Datos recibidos para crear la cita:', data); // Añade este log
    const { estatus, ...dataWithoutStatus } = data;
    const newCita = new Cita(data);
    try {
      const savedCita = await newCita.save();
      console.log('Cita guardada:', savedCita); // Añade este log
      
      notificationService.notify({ ...savedCita.toObject(), accion: 'creada' });

      return savedCita;
    } catch (error) {
      console.error('Error al guardar la cita:', error);
      throw error;
    }
  }
}

module.exports = new CreateCitaCommand();