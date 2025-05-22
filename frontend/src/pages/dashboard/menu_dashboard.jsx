import React from "react";
import { Link } from "react-router-dom";
import "../dashboard.css"; // usa el mismo CSS que ya tienes

export default function MenuDashboard() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Mi Dashboard</h2>
      <nav className="menu">
        <Link to="/dashboard" className="menu-item">📊 Panel Principal</Link>
        <Link to="/dashboard/usuarios" className="menu-item">Usuarios</Link>
        <Link to="/dashboard/eventos" className="menu-item">Eventos</Link>
        {/* <Link to="/dashboard/expositores" className="menu-item">Expositores</Link>
        <Link to="/dashboard/patrocinadores" className="menu-item">Patrocinadores</Link> */}
        {/* <Link to="/dashboard/configuracion" className="menu-item">⚙️ Configuración</Link> */}
      </nav>
    </aside>
  );
}
