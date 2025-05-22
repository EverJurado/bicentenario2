import React, { useEffect, useState } from "react";
import MenuDashboard from "./menu_dashboard";
//import "../../styles/expositores.css";

export default function DashboardExpositores() {
  const [expositores, setExpositores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/expositores-completos")
      .then(res => res.json())
      .then(data => setExpositores(data))
      .catch(err => console.error("Error al cargar expositores:", err));
  }, []);

  return (
    <div className="dashboard-wrapper">
      <MenuDashboard />
      <main className="main-content">
        <h1>Expositores</h1>
        {expositores.map((expositor, i) => (
          <div key={i} className="expositor-card">
            <div className="expositor-header">
              <img
                src={`http://localhost:5000/uploads/${expositor.foto_perfil || "default.jpg"}`}
                alt="perfil"
                className="foto-perfil"
              />
              <div>
                <h2>{expositor.nombre}</h2>
                <p><strong>Especialidad:</strong> {expositor.especialidad}</p>
                <p><strong>CI:</strong> {expositor.ci}</p>
                <p><strong>Teléfono:</strong> {expositor.telefono}</p>
                <p><strong>Correo:</strong> {expositor.correo}</p>
              </div>
            </div>

            <div className="conteo">
              <p><strong>Veces que expuso:</strong> {expositor.veces_expositor}</p>
              <p><strong>Veces que ayudó:</strong> {expositor.veces_ayudante}</p>
            </div>

            <div className="eventos-participacion">
              <h3>Eventos en los que participó:</h3>
              <ul>
                {expositor.eventos.map((ev, j) => (
                  <li key={j}>
                    <strong>{ev.titulo}</strong> — {ev.fecha} <span>({ev.rol})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
