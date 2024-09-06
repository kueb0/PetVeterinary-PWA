const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

router.get('/', citaController.list);
router.get('/:id', citaController.getOne);
router.post('/', citaController.create);
router.put('/actualiza/:id', citaController.update);
router.delete('/:id', citaController.delete);
router.post('/actualizar-disponibilidad', citaController.actualizarDisponibilidad);
router.get('/citas/veterinario/:idVeterinario', citaController.getCitasPorVeterinario);
router.get('/citas/veterinarioA/:idVeterinario', citaController.getCitasPorVeterinarioAntes);
router.get('/citas/veterinarioP/:idVeterinario', citaController.getCitasPorVeterinarioPro.bind(citaController));
router.get('/citas/:idCita/mascota', citaController.obtenerMascotaPorCita.bind(citaController));


module.exports = router;
