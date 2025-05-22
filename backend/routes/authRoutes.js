const express = require("express");
//
const multer = require("multer");
const path = require("path");
//
const { register, login, confirmAccount, recoverPassword, resetPassword } = require("../controllers/authController");
const { crearEvento , getEventos ,getTodos } = require("../controllers/eventController");
const { getExpositores } = require("../controllers/expositorController");
const { getPatrocinadores } = require("../controllers/patrocinadorController");
const { registrarEnAgenda } = require("../controllers/agendaController");
const { obtenerAgendaUsuario } = require("../controllers/agendaController");

const router = express.Router();

//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });
//


router.post("/register", register);
router.post("/login", login);
router.get("/confirmar/:token", confirmAccount);
router.post("/recover-password", recoverPassword);
router.post("/reset-password", resetPassword);
router.post("/crear-evento", upload.single("foto_evento"), crearEvento);
router.get("/expositores", getExpositores);
router.get("/patrocinadores", getPatrocinadores);
router.get("/eventos", getEventos);
router.get("/eventos-todos", getTodos);
router.post("/agenda", registrarEnAgenda);
router.get("/agenda/:id_usuario", obtenerAgendaUsuario);


module.exports = router;