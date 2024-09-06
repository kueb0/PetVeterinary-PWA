const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rolController");

router.post("/reg",rolController.registrarRol);

router.get("/get" ,rolController.obtenerRoles);

module.exports = router;