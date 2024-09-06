const asyncHandler = require("express-async-handler");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrarAdmin = asyncHandler(async (req, res) => {
    try {
        const { nombre, telefono, direccion, email, contrasenia } = req.body;
        if (!nombre || !telefono || !direccion || !email || !contrasenia) {
            res.status(400);
            throw new Error("Todos los campos son obligatorios!");
        }

        const adminDisponible = await Admin.findOne({ email });
        if (adminDisponible) {
            res.status(400);
            throw new Error("El admin ya existe!");
        }

        const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);
        console.log("Contraseña encriptada: ", contraseniaEncriptada);

        const admin = await Admin.create({
            nombre,
            telefono,
            direccion,
            email,
            contrasenia: contraseniaEncriptada
        });

        console.log(`Admin creado ${admin}`);
        if (admin) {
            res.status(201).json({ _id: admin.id, email: admin.email });
        } else {
            res.status(400);
            throw new Error("Los datos del admin no son válidos");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


const actualAdmin = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401);
        throw new Error("No hay token de autenticación");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const adminId = decoded.adminId; // se obtiene el id del admin desde el token
    const admin = await Admin.findById(adminId);
    res.json(admin);
});

const obtenerAdmins = asyncHandler(async (req, res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (error) {
        console.error("Error al obtener los admins:", error);
        res.status(500).json({ message: "Hubo un problema al obtener los clientes." });
    }
});

module.exports = { registrarAdmin, actualAdmin, obtenerAdmins};