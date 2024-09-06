const transporter = require('../config/emailconfig');
const Cliente = require('../models/cliente');
const Veterinario = require('../models/veterinario'); // Asegúrate de tener el modelo de Veterinario

class EmailNotifier {
  async update(cita) {
    try {
      const cliente = await Cliente.findById(cita.idCliente);
      const veterinario = await Veterinario.findById(cita.idVeterinario); // Asume que 'idVeterinario' está en 'cita'

      const mailOptionsCliente = {
        from: 'petveterinarycitas@gmail.com',
        to: cliente.email,
        subject: 'Notificación de Cita Veterinaria',
        text: `Hola ${cliente.nombre}, tu cita ha sido ${cita.accion}: ${cita.motivo} el ${cita.fecha} a las ${cita.hora}.`
      };

      const mailOptionsVeterinario = {
        from: 'petveterinarycitas@gmail.com',
        to: veterinario.email,
        subject: 'Notificación de Cita Veterinaria',
        text: `Hola Dr(a). ${veterinario.nombre}, se ha ${cita.accion} una cita: ${cita.motivo} con ${cliente.nombre} el ${cita.fecha} a las ${cita.hora}.`
      };

      await transporter.sendMail(mailOptionsCliente);
      console.log('Correo enviado al cliente correctamente');
      
      await transporter.sendMail(mailOptionsVeterinario);
      console.log('Correo enviado al veterinario correctamente');
      
    } catch (error) {
      console.error('Error al enviar los correos:', error);
    }
  }
}

module.exports = EmailNotifier;
