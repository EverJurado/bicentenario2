const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../config/auth");
const UserModel = require("../models/userModel");
const { sendConfirmationEmail, sendPasswordResetEmail } = require("../services/emailService");

const register = async (req, res) => {
    const {
        nombre,
        apellidopaterno,
        apellidomaterno,
        email,
        password,
        telefono,
        pais,
        ciudad,
        genero,
        id_rol = 1
    } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.createUser({
            nombre,
            apellidopaterno,
            apellidomaterno,
            email,
            contrasena: hashedPassword, // 👈 ahora se pasa como contrasena
            telefono,
            pais,
            ciudad,
            genero,
            id_rol
        });

        const token = generateToken({ id: newUser.id_usuario });
        await sendConfirmationEmail(email, token);

        res.status(201).json({
            message: "Usuario registrado con éxito.",
            usuario: newUser
        });
    } catch (error) {
        console.error("Error en el registro:", error.message);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const user = await UserModel.findUserByEmail(correo);

        if (!user) return res.status(400).json({ error: "Correo o contraseña incorrectos." });

        console.log("DEBUG:", {
            inputPassword: password,
            storedHash: user.contrasena,
            type: typeof user.contrasena
        });

        const isValid = await bcrypt.compare(password, user.contrasena);

        if (!isValid) return res.status(400).json({ error: "Correo o contraseña incorrectos." });

        if (!user.verificado) return res.status(400).json({ error: "Cuenta no verificada." });

        const token = generateToken({ id: user.id_usuario });

        res.json({
            message: "Inicio de sesión exitoso",
            token,
            usuario: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                email: user.email,
                id_rol: user.id_rol
            }
        });
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

const confirmAccount = async (req, res) => {
    const { token } = req.params;
    try {
        const decoded = verifyToken(token);
        await UserModel.updateUserVerification(decoded.id);
        res.json({ message: "Cuenta confirmada correctamente." });
    } catch (error) {
        res.status(400).json({ error: "Token inválido o expirado." });
    }
};

const recoverPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findUserByEmail(email);
        if (!user) return res.status(404).json({ error: "Correo no registrado." });

        const token = generateToken({ id: user.id_usuario }, "1h");
        await UserModel.updateUserResetToken(user.id_usuario, token);
        await sendPasswordResetEmail(email, token);

        res.json({ message: "Correo de recuperación enviado." });
    } catch (error) {
        console.error("Error en recoverPassword:", error);
        res.status(500).json({ error: "Error en el servidor." });
    }
};

const resetPassword = async (req, res) => {
    const { token, contrasena } = req.body;

    try {
        const decoded = verifyToken(token);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        await UserModel.updateUserPassword(decoded.id, hashedPassword);

        res.json({ message: "Contraseña actualizada correctamente." });
    } catch (error) {
        res.status(400).json({ error: "Token inválido o expirado." });
    }
};

module.exports = {
    register,
    login,
    confirmAccount,
    recoverPassword,
    resetPassword
};
