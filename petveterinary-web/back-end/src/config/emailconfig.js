const nodemailer = require('nodemailer');

let transporter;

try {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'petveterinarycitas@gmail.com',
            pass: 'wagw xwwq rjjm jmcj'
        },
        tls: {
            rejectUnauthorized: false // Desactivar la validación del certificado
        },
    });

    transporter.verify((error, success) => {
        if (error) {
            console.error('Error al conectar con el servidor SMTP:', error);
        } else {
            console.log('Servidor SMTP conectado:', success);
        }
    });
} catch (error) {
    console.error('Error al configurar el transporte de correo electrónico:', error);
}

module.exports = transporter;