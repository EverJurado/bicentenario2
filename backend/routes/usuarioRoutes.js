const express = require("express");
const router = express.Router();
const { getUsuariosPorRol } = require("../controllers/usuarioController");

router.get("/usuarios-por-rol", getUsuariosPorRol);

module.exports = router;
