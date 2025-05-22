import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/register.css";
import "../styles/exito.css";
import { useTranslation } from "react-i18next";

export const RegisterForm = () => {
    const captcha = useRef(null);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        email: "",
        password: "",
        confirmPassword: "",
        telefono: "",
        pais: "",
        ciudad: "",
        genero: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [paises, setPaises] = useState([]);
    const [ciudadesDisponibles, setCiudadesDisponibles] = useState([]);

    useEffect(() => {
        fetch("/data/paises.json")
            .then((res) => res.json())
            .then((data) => {
                setPaises(Object.keys(data));
                setCiudadesDisponibles(data[Object.keys(data)[0]] || []);
            })
            .catch((err) => console.error("Error al cargar paises:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaisChange = (e) => {
        const paisSeleccionado = e.target.value;
        fetch("/data/paises.json")
            .then((res) => res.json())
            .then((data) => {
                setFormData({ ...formData, pais: paisSeleccionado, ciudad: "" });
                setCiudadesDisponibles(data[paisSeleccionado] || []);
            })
            .catch((err) => console.error("Error al cargar ciudades:", err));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!captcha.current.getValue()) {
            setErrorMessage("Por favor, completa el CAPTCHA antes de continuar.");
            return;
        }

        if (
            !formData.nombre.trim() ||
            !formData.apellidopaterno.trim() ||
            !formData.apellidomaterno.trim() ||
            !formData.email.trim() ||
            !formData.password.trim() ||
            !formData.genero ||
            !formData.pais ||
            !formData.ciudad
        ) {
            setErrorMessage("Por favor, completa todos los campos.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellidopaterno: formData.apellidopaterno,
                    apellidomaterno: formData.apellidomaterno,
                    email: formData.email,
                    password: formData.password,
                    telefono: formData.telefono,
                    pais: formData.pais,
                    ciudad: formData.ciudad,
                    genero: formData.genero,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage("Error: " + data.error);
                return;
            }

            setShowModal(true);
            setTimeout(() => navigate("/"), 2500);
        } catch (error) {
            console.error("Error al registrar:", error);
            setErrorMessage("Error en el servidor.");
        }
    };

    return (
        <main>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Registro Exitoso 🎉</h2>
                        <p>Serás redirigido a la página de inicio en instantes</p>
                    </div>
                </div>
            )}
            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">{t("Registrarse")}</p>

                <div className="input-container">
                    <input placeholder="Nombre" type="text" name="nombre" onChange={handleChange} />
                </div>

                <div className="input-container">
                    <input placeholder="Apellido Paterno" type="text" name="apellidopaterno" onChange={handleChange} />
                </div>

                <div className="input-container">
                    <input placeholder="Apellido Materno" type="text" name="apellidomaterno" onChange={handleChange} />
                </div>

                <div className="input-container">
                    <input placeholder="Correo electrónico" type="email" name="email" onChange={handleChange} />
                </div>

                <div className="input-container">
                    <input
                        placeholder="Contraseña"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="toggle-password-btn">
                        {showPassword ? "🔓 Ocultar" : "🔒 Mostrar"}
                    </button>
                </div>

                <div className="input-container">
                    <input
                        placeholder="Confirmar contraseña"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="button" onClick={toggleConfirmPasswordVisibility} className="toggle-password-btn">
                        {showConfirmPassword ? "🔓 Ocultar" : "🔒 Mostrar"}
                    </button>
                </div>

                <div className="input-container">
                    <input placeholder="Teléfono" type="text" name="telefono" onChange={handleChange} />
                </div>

                <div className="input-container">
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                        <option value="">Selecciona un género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="no_binario">No binario</option>
                        <option value="otro">Otro</option>
                        <option value="prefiero_no_decirlo">Prefiero no decirlo</option>
                    </select>
                </div>

                <div className="input-container">
                    <select name="pais" value={formData.pais} onChange={handlePaisChange}>
                        <option value="">Selecciona un país</option>
                        {paises.map((pais, index) => (
                            <option key={index} value={pais}>{pais}</option>
                        ))}
                    </select>
                </div>

                <div className="input-container">
                    <select
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        disabled={!formData.pais}
                    >
                        <option value="">Selecciona una ciudad</option>
                        {ciudadesDisponibles.map((ciudad, index) => (
                            <option key={index} value={ciudad}>{ciudad}</option>
                        ))}
                    </select>
                </div>

                <div className="ContainerCaptcha">
                    <ReCAPTCHA ref={captcha} sitekey="6LfF1OkqAAAAAECnyFaS_zNg7p7SvmABCvJScGo8" />
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <button className="submit" type="submit">
                    Crear Cuenta
                </button>
            </form>
        </main>
    );
};
