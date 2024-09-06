const express = require("express");
const router = express.Router();
const { login, verify, logout } = require("../controllers/authController");

router.post("/login", login);

router.post("/verify", verify);

router.post("/logout", logout)

module.exports = router;
