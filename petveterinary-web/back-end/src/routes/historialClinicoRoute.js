const express = require('express');
const router = express.Router();
const historialClinicoController = require('../controllers/historialClinicoController');

router.get('/', historialClinicoController.list);
router.get('/:id', historialClinicoController.getOne);
router.post('/', historialClinicoController.create);
router.put('/:id', historialClinicoController.update);
router.delete('/:id', historialClinicoController.delete);

module.exports = router;
