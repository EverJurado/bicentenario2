const pool = require("../config/db");

class AgendaModel {
    static async registrarEvento({ id_usuario, id_evento, actividad }) {
        const query = `
        INSERT INTO agenda (id_usuario, id_evento, actividad, fecha, asistio)
        VALUES ($1, $2, $3, CURRENT_DATE, false)
        RETURNING *;
        `;
        const values = [id_usuario, id_evento, actividad];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async yaRegistrado(id_usuario, id_evento) {
        const query = `SELECT * FROM agenda WHERE id_usuario = $1 AND id_evento = $2`;
        const result = await pool.query(query, [id_usuario, id_evento]);
        return result.rows.length > 0;
    }

    static async obtenerAgendaUsuario(id_usuario) {
        const query = `
            SELECT a.*, e.titulo, e.descripcion, e.fecha, e.modalidad, e.costo
            FROM agenda a
            JOIN eventos e ON a.id_evento = e.id_evento
            WHERE a.id_usuario = $1
            ORDER BY e.fecha DESC
        `;
        const result = await pool.query(query, [id_usuario]);
        return result.rows;
    }

}

module.exports = AgendaModel;
