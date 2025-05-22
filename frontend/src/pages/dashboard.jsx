import React from "react";
import MenuDashboard from "../pages/dashboard/menu_dashboard"; // importa el componente
import "./dashboard.css"; // si quieres reutilizar estilos

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <MenuDashboard />
      <main className="main-content">
        <h1 className="main-title">Bienvenido al Dashboard</h1>
        <div className="cards-container">
          <div className="card">
            <h2>Estadística 1</h2>
            <p>Contenido relacionado...</p>
          </div>
          <div className="card">
            <h2>Estadística 2</h2>
            <p>Contenido relacionado...</p>
          </div>
          <div className="card">
            <h2>Estadística 3</h2>
            <p>Contenido relacionado...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
