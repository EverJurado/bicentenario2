const pool = require("../config/db");

const getPatrocinadores = async (req, res) => {
    try {
        const result = await pool.query("SELECT id_patrocinador, razon_social FROM patrocinadores ORDER BY razon_social ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener patrocinadores:", error);
        res.status(500).json({ error: "Error al obtener patrocinadores" });
    }
};

module.exports = { getPatrocinadores };