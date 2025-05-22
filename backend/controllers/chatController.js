const db = require('../config/db');

const getRespuestaChat = async (req, res) => {
  const { pregunta } = req.body;

  try {
    const regexFecha = /(?:el\s)?(\d{1,2})[\/\- ](\d{1,2})(?:[\/\- ](\d{4}))?/i;
    const match = pregunta.match(regexFecha);

    // 1. Buscar por fecha si existe
    if (match) {
      const [_, dia, mes, anio] = match;
      const fecha = `${anio || new Date().getFullYear()}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

      const eventos = await db.query(`
        SELECT e.*, 
          COALESCE(string_agg(ex.nombre, ', '), 'Sin expositores') AS expositores
        FROM eventos e
        LEFT JOIN eventos_expositores ee ON ee.id_evento = e.id_evento
        LEFT JOIN expositores ex ON ex.id_expositor = ee.id_expositor
        WHERE e.fecha = $1
        GROUP BY e.id_evento
      `, [fecha]);

      if (eventos.rows.length > 0) {
        const respuestas = eventos.rows.map(e => (
          `🎤 *${e.titulo}*\n📍 ${e.ubicacion}\n🕒 ${e.hora_inicio} - ${e.hora_fin}\n👤 ${e.expositores}\n📝 Inscripción: ${e.reunion_iniciada ? 'Finalizada ❌' : 'Disponible ✅'}`
        )).join('\n\n');

        return res.json({ respuesta: `📅 Eventos del ${dia}/${mes}/${anio || new Date().getFullYear()}:\n\n${respuestas}` });
      }
    }

    // 2. Buscar por coincidencia en múltiples campos si no hay fecha o no se encontró nada
    const eventosRelacionados = await db.query(`
      SELECT e.*, 
        COALESCE(string_agg(ex.nombre, ', '), 'Sin expositores') AS expositores
      FROM eventos e
      LEFT JOIN eventos_expositores ee ON ee.id_evento = e.id_evento
      LEFT JOIN expositores ex ON ex.id_expositor = ee.id_expositor
      WHERE 
        LOWER(e.titulo) ILIKE $1 OR
        LOWER(e.descripcion) ILIKE $1 OR
        LOWER(e.ubicacion) ILIKE $1 OR
        LOWER(e.modalidad) ILIKE $1
      GROUP BY e.id_evento
    `, [`%${pregunta.toLowerCase()}%`]);

    if (eventosRelacionados.rows.length > 0) {
      const respuestas = eventosRelacionados.rows.map(e => (
        `🎤 *${e.titulo}*\n📍 ${e.ubicacion}\n🕒 ${e.hora_inicio} - ${e.hora_fin}\n👤 ${e.expositores}\n📝 Inscripción: ${e.reunion_iniciada ? 'Finalizada ❌' : 'Disponible ✅'}`
      )).join('\n\n');

      return res.json({ respuesta: `📌 Encontré estos eventos relacionados:\n\n${respuestas}` });
    }

    // 3. Sin resultados
    return res.json({
      respuesta: "❌ No se encontraron eventos relacionados. Intenta usar otra fecha, título o palabra clave como 'conferencia', 'taller', etc."
    });

  } catch (err) {
    console.error("Error al procesar la pregunta:", err);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = { getRespuestaChat };
