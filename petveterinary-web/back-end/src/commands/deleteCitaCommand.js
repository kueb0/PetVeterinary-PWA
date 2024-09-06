const Cita = require('../models/cita');
const notificationService = require('../observers/NotificationService');

class DeleteCitaCommand {
  async execute(id) {
    const result = await Cita.findByIdAndDelete(id);
    if (result) {
      notificationService.notify({ ...result.toObject(), accion: 'cancelada' });
    }
    return result;
  }
}

module.exports = new DeleteCitaCommand();
