const AgendaModel = require("../models/agendaModel");

const registrarEnAgenda = async (req, res) => {
  try {
    const { id_usuario, id_evento, actividad } = req.body;

    if (!id_usuario || !id_evento) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const yaExiste = await AgendaModel.yaRegistrado(id_usuario, id_evento);
    if (yaExiste) {
      return res.status(409).json({ error: "Ya estás registrado en este evento" });
    }

    const registro = await AgendaModel.registrarEvento({
      id_usuario,
      id_evento,
      actividad: actividad || "Registro manual",
    });

    res.status(201).json({ message: "Registrado en agenda", data: registro });
  } catch (error) {
    console.error("Error al registrar en agenda:", error);
    res.status(500).json({ error: "Error al registrar en agenda" });
  }
};

const obtenerAgendaUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const eventos = await AgendaModel.obtenerAgendaUsuario(id_usuario);
    res.json(eventos);
  } catch (error) {
    console.error("Error al obtener agenda:", error);
    res.status(500).json({ error: "Error al obtener agenda" });
  }
};


module.exports = { registrarEnAgenda , obtenerAgendaUsuario };
