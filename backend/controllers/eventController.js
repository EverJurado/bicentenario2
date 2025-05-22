const EventoModel = require("../models/eventoModel");

const crearEvento = async (req, res) => {
    try {
        const {
            titulo, descripcion, fecha, hora_inicio, hora_fin,
            costo, modalidad, ubicacion, link_reunion, categoria
            , latitud, longitud
        } = req.body;


        const expositores = req.body.expositores || [];
        const patrocinadores = req.body.patrocinadores || [];
        const reunion_iniciada = false;
        const foto_evento = req.file ? req.file.filename : "";

        const nuevoEvento = await EventoModel.crearEvento({
            titulo, descripcion, fecha, hora_inicio, hora_fin,
            costo, modalidad, ubicacion, link_reunion,
            reunion_iniciada, foto_evento, categoria, latitud,
            longitud
        });

        const id_evento = nuevoEvento.id_evento;

        await EventoModel.vincularExpositores(id_evento, expositores);
        await EventoModel.vincularPatrocinadores(id_evento, patrocinadores);

        res.status(201).json({ message: "Evento creado exitosamente", evento: nuevoEvento });
    } catch (error) {
        console.error("Error al crear evento:", error);
        res.status(500).json({ error: "Error interno del servidor." });
    }
};

const getEventos = async (req, res) => {
    try {
        const eventos = await EventoModel.obtenerEventosConFiltros(req.query);
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ error: "Error al obtener eventos" });
    }
};

const getTodos = async (req, res) => {
    try {
        const eventos = await EventoModel.obtenerTodosLosEventos();
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ error: "Error al obtener eventos" });
    }
};

module.exports = { crearEvento, getEventos, getTodos };

