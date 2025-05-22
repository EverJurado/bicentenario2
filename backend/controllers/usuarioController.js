const db = require('../config/db');

const getUsuariosPorRol = async (req, res) => {
  try {
    const result = await db.query("SELECT nombre, id_rol FROM Usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

module.exports = { getUsuariosPorRol };