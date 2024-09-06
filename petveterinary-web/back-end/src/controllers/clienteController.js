const asyncHandler = require("express-async-handler");
const Cliente = require("../models/cliente");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrarCliente = asyncHandler(async (req, res) => {
    try {
        const { nombre, telefono, direccion, email, contrasenia } = req.body;
        if (!nombre || !telefono || !direccion || !email || !contrasenia) {
            res.status(400);
            throw new Error("Todos los campos son obligatorios!");
        }

        const clienteDisponible = await Cliente.findOne({ email });
        if (clienteDisponible) {
            res.status(400);
            throw new Error("El cliente ya existe!");
        }

        const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);
        console.log("Contraseña encriptada: ", contraseniaEncriptada);

        const cliente = await Cliente.create({
            nombre,
            telefono,
            direccion,
            email,
            contrasenia: contraseniaEncriptada
        });

        console.log(`Cliente creado ${cliente}`);
        if (cliente) {
            res.status(201).json({ _id: cliente.id, email: cliente.email });
        } else {
            res.status(400);
            throw new Error("Los datos del cliente no son válidos");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


const actualCliente = asyncHandler(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401);
        throw new Error("No hay token de autenticación");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const clienteId = decoded.clienteId; // se obtiene el id del cliente desde el token
    const cliente = await Cliente.findById(clienteId);
    res.json(cliente);
});

const obtenerClientes = asyncHandler(async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        res.status(500).json({ message: "Hubo un problema al obtener los clientes." });
    }
});

const obtenerClientePorId = asyncHandler(async (req, res) => {
    try {
        const clienteId = req.params.id;
        if (!clienteId) {
            res.status(400);
            throw new Error("ID de cliente no proporcionado.");
        }

        const cliente = await Cliente.findById(clienteId);
        if (!cliente) {
            res.status(404);
            throw new Error("Cliente no encontrado.");
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        res.status(500).json({ message: "Hubo un problema al obtener el cliente." });
    }
});


const update = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ message: 'El cliente fue actualizado', cliente: updatedCliente });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar cliente', error });
    }
  });


const actualizarClientePorId = asyncHandler(async (req, res) => {
    try {
        // Obtener el ID del cliente desde los parámetros de la URL
        const clienteId = req.params.id;

        // Validar que se ha proporcionado un ID
        if (!clienteId) {
            res.status(400);
            throw new Error("ID de cliente no proporcionado.");
        }

        // Obtener los datos de actualización desde el cuerpo de la solicitud
        const { nombre, email, telefono } = req.body;

        // Validar que se han proporcionado datos válidos para actualizar
        if (!nombre && !email && !telefono) {
            res.status(400);
            throw new Error("No se proporcionaron datos válidos para actualizar.");
        }

        // Buscar el cliente por ID
        const cliente = await Cliente.findById(clienteId);
        if (!cliente) {
            res.status(404);
            throw new Error("Cliente no encontrado.");
        }

        // Actualizar el cliente con los nuevos datos
        cliente.nombre = nombre || cliente.nombre;
        cliente.email = email || cliente.email;
        cliente.telefono = telefono || cliente.telefono;

        // Guardar los cambios en la base de datos
        await cliente.save();

        // Enviar la respuesta con el cliente actualizado
        res.status(200).json(cliente);
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ message: "Hubo un problema al actualizar el cliente." });
    }
});


module.exports = { update, registrarCliente, actualCliente, obtenerClientes, obtenerClientePorId, actualizarClientePorId};