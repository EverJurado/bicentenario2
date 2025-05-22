import { useEffect, useState } from "react";
import { MapaTodosEventos } from "../components/MapaTodosEventos";

export const MostrarEventosForm = () => {
    const [eventos, setEventos] = useState([]);
    //filtros
    const [filtros, setFiltros] = useState({ fecha: "", modalidad: "", precio: "", categoria: "" });
//
    const handleChange = (e) => {
        setFiltros({ ...filtros, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const query = new URLSearchParams(filtros).toString();
        fetch(`http://localhost:5000/api/eventos?${query}`)
            .then(res => res.json())
            .then(data => setEventos(data))
            .catch(err => console.error("Error al obtener eventos:", err));
    }, [filtros]);


    const handleRegister = async (id_evento) => {
        const id_usuario = localStorage.getItem("id_usuario");
        if (!id_usuario) return alert("Debes iniciar sesión");

        await fetch("http://localhost:5000/api/agenda", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario, id_evento, actividad: "Registro" }),
        });

        alert("Te registraste al evento");
    };

    return (
        <main className="contenedor-eventos-grid">
            <aside className="filtros-container">
                <h3>Filtrar por:</h3>

                <input type="date" name="fecha" onChange={handleChange} />

                <select name="modalidad" onChange={handleChange}>
                <option value="">Todas las modalidades</option>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Híbrido">Híbrido</option>
                </select>

                <input type="number" placeholder="Precio máximo" name="precio" onChange={handleChange} />

                <select name="categoria" onChange={handleChange}>
                <option value="">Todas las categorías</option>
                <option value="Negocios">Negocios</option>
                <option value="Comida y bebida">Comida y bebida</option>
                <option value="Salud">Salud</option>
                <option value="Música">Música</option>
                <option value="Automóviles, barcos y aviones">Automóviles, barcos y aviones</option>
                <option value="Organización benéfica y causas sociales">Organización benéfica y causas sociales</option>
                <option value="Comunidad">Comunidad</option>
                <option value="Familia y educación">Familia y educación</option>
                <option value="Moda">Moda</option>
                <option value="Cine y medios de comunicación">Cine y medios de comunicación</option>
                <option value="Aficiones">Aficiones</option>
                <option value="Hobbies">Hobbies</option>
                <option value="Hogar y vida">Hogar y vida</option>
                <option value="Artes escénicas y visuales">Artes escénicas y visuales</option>
                <option value="Gobierno">Gobierno</option>
                <option value="Actividades escolares">Actividades escolares</option>
                <option value="Ciencia y tecnología">Ciencia y tecnología</option>
                <option value="Vacaciones">Vacaciones</option>
                <option value="Deportes y bienestar físico">Deportes y bienestar físico</option>
                <option value="Viajes y actividades al aire libre">Viajes y actividades al aire libre</option>
                <option value="Otros">Otros</option>
                </select>
            </aside>
            {eventos.length > 0 && <MapaTodosEventos eventos={eventos} />}

            <section className="lista-eventos">
                {eventos.length === 0 && <p>No hay eventos disponibles</p>}
                {eventos.map((evento) => (
                <div key={evento.id_evento} className="evento-card">
                    <img
                        src={
                            evento.foto_evento
                            ? `http://localhost:5000/uploads/${evento.foto_evento}`
                            : "https://via.placeholder.com/300x200?text=Sin+imagen"
                        }
                        alt={evento.titulo}
                        className="evento-img"
                    />


                    <div>
                    <h3>{evento.titulo}</h3>
                    <p>{evento.descripcion}</p>
                    <p><b>Fecha:</b> {evento.fecha}</p>
                    <p><b>Modalidad:</b> {evento.modalidad}</p>
                    <p><b>Costo:</b> {evento.costo}</p>
                    <p><b>Categoría:</b> {evento.categoria || 'No especificada'}</p>
                    <button onClick={() => handleRegister(evento.id_evento)}>Registrarse</button>
                    </div>
                </div>
                ))}
            </section>
            </main>
    );
};
