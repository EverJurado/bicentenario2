import { Link } from 'react-router-dom';
import logo from '../assets/Bicentenario-Bo.png';
import '../styles/inicio.css';

export const Inicio = () => {
    return (
        <div className="inicio-container">
            <div className="fondo-degradado" />
            <div className="contenido-inicio">
                <img src={logo} alt="Bicentenario de Bolivia" className="logo-inicio" />
                <h1 className="titulo-inicio">Bicentenario de Bolivia 🇧🇴</h1>
                <p className="subtitulo-inicio">
                    Celebramos 200 años de libertad, cultura e identidad nacional.
                </p>
                <Link to="/chat">
                    <button className="boton-chat">Ir al Chat del Bicentenario</button>
                </Link>
            </div>
        </div>
    );
};
