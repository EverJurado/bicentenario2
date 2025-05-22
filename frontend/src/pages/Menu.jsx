import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Menu = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(!!localStorage.getItem("token"));
            setUserRole(localStorage.getItem("id_rol")); // 👈 Leer rol del usuario
        };

        checkAuth(); // Llamado inmediato
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("id_rol");
        setIsAuthenticated(false);
        setUserRole(null);
        navigate("/");
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setShowDropdown(false);
    };

    return (
        <nav className="menu">
            <Link to="/">{t("Inicio")}</Link>
            <Link to="/contacto">{t("Contacto")}</Link>
            <Link to="/mostrar-evento">{t("Mostrar Eventos")}</Link>
            {/* Mostrar Agenda solo si está autenticado */}
            {isAuthenticated && (
                <Link to="/agenda">{t("Agenda")}</Link>
            )}
            {/* 👑 Mostrar si es ADMIN */}
            {userRole === "3" && (
                <>
                    <Link to="/dashboard">{t("Dashboard")}</Link>
                    <Link to="/crear-evento">{t("Crear Evento")}</Link>
                </>
            )}

            {/* 👤 Mostrar si es EXPOSITOR */}
            {userRole === "2" && (
                <>
                    <Link to="/crear-evento">{t("Crear Evento")}</Link>
                </>
            )}

            {!isAuthenticated ? (
                <>
                    <Link to="/register">{t("Registrarse")}</Link>
                    <Link to="/login">{t("Iniciar Sesión")}</Link>
                </>
            ) : (
                <button onClick={handleLogout} className="logout-button">
                    {t("Cerrar sesión")}
                </button>
            )}

            {/* Idiomas */}
            <div className="language-dropdown">
                <button onClick={() => setShowDropdown(!showDropdown)} className="dropdown-toggle">
                    🌎 {t("")}
                </button>
                {showDropdown && (
                    <ul className="dropdown-menu">
                        <li onClick={() => changeLanguage("es")}>🇪🇸 Español</li>
                        <li onClick={() => changeLanguage("en")}>🇺🇸 English</li>
                        <li onClick={() => changeLanguage("ay")}>🌄 Aymara</li>
                        <li onClick={() => changeLanguage("qu")}>🏔️ Quechua</li>
                    </ul>
                )}
            </div>
        </nav>
    );
};
