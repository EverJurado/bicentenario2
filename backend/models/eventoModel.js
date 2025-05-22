const pool = require("../config/db");

class EventoModel {
    static async crearEvento({titulo, descripcion, foto_evento, hora_inicio, hora_fin, fecha, costo,
         modalidad, ubicacion, link_reunion, categoria, latitud, longitud}) {
    const query = `
        INSERT INTO eventos (
            titulo, descripcion, fecha, hora_inicio, hora_fin,
            costo, modalidad, ubicacion, link_reunion,
            reunion_iniciada, foto_evento, categoria, latitud, longitud
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        RETURNING *;
    `;

    const values = [
        titulo, descripcion, fecha, hora_inicio, hora_fin,
        costo, modalidad, ubicacion, link_reunion,
        false, foto_evento, categoria,latitud,longitud
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
}


    static async vincularExpositores(id_evento, expositores) {
        for (const id of Array.isArray(expositores) ? expositores : [expositores]) {
            await pool.query(
                "INSERT INTO eventos_expositores (id_evento, id_expositor) VALUES ($1, $2)",
                [id_evento, id]
            );
        }
    }

    static async vincularPatrocinadores(id_evento, patrocinadores) {
        for (const id of Array.isArray(patrocinadores) ? patrocinadores : [patrocinadores]) {
            await pool.query(
                "INSERT INTO eventos_patrocinadores (id_evento, id_patrocinador) VALUES ($1, $2)",
                [id_evento, id]
            );
        }
    }

    static async obtenerEventosConFiltros({ fecha, modalidad, precio, categoria }) {
        let query = `SELECT * FROM eventos WHERE 1=1`;
        const params = [];

        if (fecha) {
            query += ` AND fecha = $${params.length + 1}`;
            params.push(fecha);
        }

        if (modalidad) {
            query += ` AND modalidad = $${params.length + 1}`;
            params.push(modalidad);
        }

        if (precio) {
            query += ` AND costo::numeric <= $${params.length + 1}`;
            params.push(precio);
        }
        if (categoria) {
            query += ` AND categoria = $${params.length + 1}`;
            params.push(categoria);
        }


        const result = await pool.query(query, params);
        return result.rows;
    }
    
    static async obtenerTodosLosEventos() {
        const result = await pool.query("SELECT * FROM eventos ORDER BY fecha DESC");
        return result.rows;
    }
}

module.exports = EventoModel;