const pool = require("../config/db");

const getExpositores = async (req, res) => {
    try {
        const result = await pool.query("SELECT id_expositor, nombre FROM expositores ORDER BY nombre ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener expositores:", error);
        res.status(500).json({ error: "Error al obtener expositores" });
    }
};

module.exports = { getExpositores };