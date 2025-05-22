import { useEffect, useState } from "react";
import "../styles/agenda.css";

export const AgendaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const id_usuario = localStorage.getItem("id_usuario");

  useEffect(() => {
    fetch(`http://localhost:5000/api/agenda/${id_usuario}`)
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error("Error al cargar agenda:", err));
  }, []);

    return (
        <main className="agenda-page">
            <h2 className="agenda-title">Mis eventos registrados</h2>
            {eventos.length === 0 ? (
            <p>No tienes eventos en tu agenda</p>
        ) : (
            <ul className="agenda-list">
            {eventos.map(evento => (
                <li key={evento.id_agenda} className="agenda-item">
                <strong>{evento.titulo}</strong>
                <div className="agenda-info">
                    {evento.fecha} - {evento.modalidad} - <span className="agenda-cost">Bs. {evento.costo}</span>
                </div>
                </li>
            ))}
            </ul>
        )}
    </main>
  );
};
