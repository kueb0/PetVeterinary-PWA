const express = require("express");
const router = express.Router();
const veterinarioController = require("../controllers/veterinarioController");

router.post("/registro", veterinarioController.registrarVeterinario);

router.get("/todos", veterinarioController.obtenerVeterinarios);

router.delete("/eliminar/:id", veterinarioController.eliminarVeterinario);

router.get("/vet/:id", veterinarioController.obtenerVeterinarioPorId); 

router.get('/:id/horarios', veterinarioController.obtenerHorariosDisponibles);

router.put('/actualizar-disponibilidad', veterinarioController.actualizarDisponibilidad);

module.exports = router;