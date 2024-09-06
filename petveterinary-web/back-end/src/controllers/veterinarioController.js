const asyncHandler = require("express-async-handler");
const Veterinario = require("../models/veterinario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrarVeterinario = asyncHandler(async (req, res) => {
    try {
        const { nombre, telefono, cedulaProfesional, email, contrasenia, horario } = req.body;
        if (!nombre || !telefono || !cedulaProfesional || !email || !contrasenia || !horario) {
            res.status(400);
            throw new Error("Todos los campos son obligatorios!");
        }

        const veterinarioDisponible = await Veterinario.findOne({ email });
        if (veterinarioDisponible) {
            res.status(400);
            throw new Error("El veterinario ya existe!");
        }

        const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

        const veterinario = await Veterinario.create({
            nombre,
            telefono,
            cedulaProfesional,
            email,
            contrasenia: contraseniaEncriptada,
            horario
        });

        if (veterinario) {
            res.status(201).json({ _id: veterinario.id, email: veterinario.email });
        } else {
            res.status(400);
            throw new Error("Los datos del veterinario no son válidos");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

const actualVeterinario = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401);
        throw new Error("No hay token de autenticación");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const veterinarioId = decoded.veterinarioId;
    const veterinario = await Veterinario.findById(veterinarioId);
    res.json(veterinario);
});

const obtenerVeterinarios = asyncHandler(async (req, res) => {
    try {
        const veterinarios = await Veterinario.find();
        res.status(200).json(veterinarios);
    } catch (error) {
        console.error("Error al obtener los veterinarios:", error);
        res.status(500).json({ message: "Hubo un problema al obtener los veterinarios." });
    }
});

const eliminarVeterinario = asyncHandler(async (req, res) => {
    const { id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
    try {
        const veterinario = await Veterinario.findByIdAndDelete(id); // Buscar y eliminar el veterinario por ID
        if (!veterinario) {
            res.status(404);
            throw new Error("Veterinario no encontrado");
        }
        res.status(200).json({ message: "Veterinario eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el veterinario:", error);
        res.status(500).json({ message: "Hubo un problema al eliminar el veterinario." });
    }
});

const obtenerVeterinarioPorId = asyncHandler(async (req, res) => {
    try {
        const veterinarioId = req.params.id;
        if (!veterinarioId) {
            res.status(400);
            throw new Error("ID de veterinario no proporcionado.");
        }

        const veterinario = await Veterinario.findById(veterinarioId);
        if (!veterinario) {
            res.status(404);
            throw new Error("Veterinario no encontrado.");
        }

        res.status(200).json(veterinario);
    } catch (error) {
        console.error("Error al obtener el veterinario:", error);
        res.status(500).json({ message: "Hubo un problema al obtener el veterinario." });
    }
});

const obtenerCitasPorVeterinario = asyncHandler(async (req, res) => {
    const { id } = req.params; // ID del veterinario desde los parámetros de la solicitud

    try {
        const citas = await Cita.find({ idVeterinario: id });
        if (!citas) {
            return res.status(404).json({ message: 'No se encontraron citas para este veterinario' });
        }
        res.status(200).json(citas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las citas', error });
    }
});

const obtenerHorariosDisponibles = async (req, res) => {
    try {
        const veterinario = await Veterinario.findById(req.params.id).select('horario');
        if (!veterinario) return res.status(404).json({ message: 'Veterinario no encontrado' });

        // Filtrar los horarios disponibles
        const horariosDisponibles = veterinario.horario.map(h => ({
            dia: h.dia,
            horas: h.horas.filter(hora => hora.disponible) // Solo horas disponibles
        })).filter(h => h.horas.length > 0); // Solo días con horas disponibles

        res.status(200).json(horariosDisponibles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener horarios disponibles', error });
    }
};

const actualizarDisponibilidad = async (req, res) => {
    try {
        const { idVeterinario, dia, hora } = req.body;
        
        const veterinario = await Veterinario.findById(idVeterinario);
        if (!veterinario) return res.status(404).json({ message: 'Veterinario no encontrado' });

        // Encontrar el día y la hora específica
        const diaHorario = veterinario.horario.find(h => h.dia === dia);
        if (!diaHorario) return res.status(404).json({ message: 'Día no encontrado' });

        const horaHorario = diaHorario.horas.find(h => h.hora === hora);
        if (!horaHorario) return res.status(404).json({ message: 'Hora no encontrada' });

        // Actualizar la disponibilidad
        horaHorario.disponible = false;

        await veterinario.save();

        res.status(200).json({ message: 'Disponibilidad actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la disponibilidad', error });
    }
};

module.exports = {actualizarDisponibilidad,obtenerHorariosDisponibles, registrarVeterinario, actualVeterinario, obtenerVeterinarios, eliminarVeterinario, obtenerVeterinarioPorId, obtenerCitasPorVeterinario };