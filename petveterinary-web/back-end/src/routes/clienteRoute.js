const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clienteController");
const validarToken = require("../middlewares/validarToken");

router.post("/registro", clienteController.registrarCliente);

router.get("/actual", validarToken ,clienteController.actualCliente);

router.get("/todos", clienteController.obtenerClientes);

router.get("/:id", clienteController.obtenerClientePorId); 

module.exports = router;