const express = require("express");
const router = express.Router();
const { crearEvento, getEventos, getTodos, getEventosCompletos } = require("../controllers/eventController");

router.post("/eventos", crearEvento);
router.get("/eventos", getEventos);
router.get("/eventos-todos", getTodos);

// ✅ NUEVA RUTA
router.get("/eventos-completos", getEventosCompletos);

module.exports = router;
