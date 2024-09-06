const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascotaController');

router.get('/', mascotaController.list);
router.get('/:id', mascotaController.getOne);
//router.get('/cliente/:idCliente', mascotaController.getOne); //para ver que mascota tiene cadd cliente, pero este va para el crud de clientes
router.post('/', mascotaController.create);
router.delete('/:id', mascotaController.delete);
router.put('/:id', mascotaController.update);
router.get('/cliente/:idCliente', mascotaController.obtenerMascotasPorUsuario);

module.exports = router;

