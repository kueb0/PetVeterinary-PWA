const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const validarToken = require("../middlewares/validarToken");

router.post("/registro", adminController.registrarAdmin);

router.get("/actual", validarToken, adminController.actualAdmin);

router.get("/todos", adminController.obtenerAdmins);

module.exports = router;