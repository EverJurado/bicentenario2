import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import "./usuarios.css"; // ✅ corregido
import MenuDashboard from "./menu_dashboard"; // ✅ si está en mismo folder

export default function DashboardUsuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios-por-rol")
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  const normales = usuarios.filter(u => u.id_rol === 1);
  const expositores = usuarios.filter(u => u.id_rol === 2);
  const superusuarios = usuarios.filter(u => u.id_rol === 3);

  const data = {
    labels: ["Usuarios Normales", "Expositores", "Superusuarios"],
    datasets: [
      {
        data: [normales.length, expositores.length, superusuarios.length],
        backgroundColor: ["#1abc9c", "#e67e22", "#9b59b6"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className="dashboard-wrapper">
      <MenuDashboard />

      <main className="main-content">
        <h1>Usuarios Registrados</h1>
        <div className="usuarios-content">
          <div className="usuarios-listas">
            <div className="bloque">
              <h2>👤 Usuarios Normales</h2>
              <ul>{normales.map((u, i) => <li key={i}>{u.nombre}</li>)}</ul>
            </div>
            <div className="bloque">
              <h2>🎤 Expositores</h2>
              <ul>{expositores.map((u, i) => <li key={i}>{u.nombre}</li>)}</ul>
            </div>
            <div className="bloque">
              <h2>🛡️ Superusuarios</h2>
              <ul>{superusuarios.map((u, i) => <li key={i}>{u.nombre}</li>)}</ul>
            </div>
          </div>

          <div className="grafico">
            <Pie data={data} />
          </div>
        </div>
      </main>
    </div>
  );
}
