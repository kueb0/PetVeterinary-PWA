const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cliente = require("../models/cliente");
const Veterinario = require("../models/veterinario");
const Admin = require("../models/admin");

const login = async (req, res) => {
    try {
        const { email, contrasenia } = req.body;
        if (!email || !contrasenia) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        let user = await Cliente.findOne({ email });
        let tipoUsuario = 'cliente';

        if (!user) {
            user = await Veterinario.findOne({ email });
            tipoUsuario = 'veterinario';
        } 
        
        if (!user) {
            user = await Admin.findOne({ email });
            tipoUsuario = 'admin';
        }

        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        if (!await bcrypt.compare(contrasenia, user.contrasenia)) {
            return res.status(400).json({ error: 'Error en usuario / contraseña' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        user.code = verificationCode;
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'petveterinarycitas@gmail.com',
                pass: 'wagw xwwq rjjm jmcj'
            },
            tls: {
                rejectUnauthorized: false
            },
        });

        const mailOptions = {
            from: 'petveterinarycitas@gmail.com',
            to: user.email,
            subject: 'Código de verificación',
            text: `Tu código de verificación es: ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ error: 'Error al enviar el correo' });
            } else {
                console.log('Correo enviado:', info.response);
                return res.json({ success: 'Login correcto, se ha enviado un código de verificación a tu correo' });
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Hubo un problema al iniciar sesión' });
    }
};

const verify = async (req, res) => {
    try {
        const { code } = req.body;

        // Busca el usuario por código en cualquiera de las colecciones
        let user = await Cliente.findOne({ code }).populate('rol', 'nomRol');
        if (!user) {
            user = await Veterinario.findOne({ code }).populate('rol', 'nomRol');
        }
        if (!user) {
            user = await Admin.findOne({ code }).populate('rol', 'nomRol');
        }

        if (user) {
            user.code = null;
            await user.save();

            const token = jwt.sign({
                userId: user.id,
                tipoUsuario: user instanceof Cliente ? 'cliente' : user instanceof Veterinario ? 'veterinario' : user instanceof Admin ? 'admin' : 'admin',
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50m" });

            res.status(200).json({
                token,
                nombre: user.nombre,
                rol: user.rol.nomRol,
                _id: user._id,
                tipoUsuario: user instanceof Cliente ? 'cliente' : user instanceof Veterinario ? 'veterinario' : user instanceof Admin ? 'admin' : 'admin',
            });
        } else {
            res.status(401).json({ error: 'Código incorrecto' });
        }
    } catch (error) {
        console.error('Error al verificar el código:', error);
        res.status(500).json({ error: 'Hubo un problema al verificar el código' });
    }
};


const logout = async (req, res) => {
    res.json({ success: 'Deslogueo exitoso' });
}

module.exports = { login, verify, logout };
