const asyncHandler = require("express-async-handler");
const Rol = require("../models/rol");

const registrarRol = asyncHandler(async (req, res) => {
    try {
        const { cveRol, nomRol } = req.body;
        if (!nomRol || !cveRol) {
            res.status(400);
            throw new Error("Todos los campos son obligatorios!");
        }

        const rolDisponible = await Rol.findOne({ cveRol });
        if (rolDisponible) {
            res.status(400);
            throw new Error("El rol ya existe!");
        }

        const rol = await Rol.create({
            cveRol,
            nomRol
        });

        console.log(`Rol creado ${rol}`);
        if (rol) {
            res.status(201).json({ _id: rol.id});
        } else {
            res.status(400);
            throw new Error("Los datos del rol no son válidos");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

const obtenerRoles = asyncHandler(async (req, res) => {
    try {
        const roles = await Rol.find();
        if (roles) {
            res.status(200).json(roles);
        } else {
            res.status(404);
            throw new Error("No se encontraron roles");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = {registrarRol, obtenerRoles};