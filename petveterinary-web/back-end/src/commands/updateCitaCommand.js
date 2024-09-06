const Cita = require('../models/cita');
const notificationService = require('../observers/NotificationService');

class UpdateCitaCommand {
  async execute(id, data) {
    const cita = await Cita.findById(id);
    if (!cita) {
      throw new Error('La cita no existe');
    }
    if (cita.estatus !== 'no atendida') {
      throw new Error('Solo se pueden editar citas con estatus "no atendida"');
    }
    const result = await Cita.findByIdAndUpdate(id, data, { new: true });
    notificationService.notify({ ...result.toObject(), accion: 'actualizada' });
    return result;
  }
}

module.exports = new UpdateCitaCommand();