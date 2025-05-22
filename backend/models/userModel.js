const pool = require("../config/db");

class UserModel {
    static async createUser({ nombre, apellidopaterno, apellidomaterno, email, contrasena, telefono, pais, ciudad, genero, id_rol = 1 }) {
        const query = `
            INSERT INTO usuarios 
            (id_rol, nombre, apellidopaterno, apellidomaterno, email, contrasena, telefono, pais, ciudad, genero, verificado, foto)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING *;
        `;

        const values = [
            id_rol,
            nombre,
            apellidopaterno,
            apellidomaterno,
            email,
            contrasena,
            telefono,
            pais,
            ciudad,
            genero,
            false,
            ""
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findUserByEmail(email) {
        const query = "SELECT * FROM usuarios WHERE email = $1";
        const result = await pool.query(query, [email]);
        return result.rows[0];  
    }

    static async updateUserVerification(userId) {
        const query = "UPDATE usuarios SET verificado = true WHERE id_usuario = $1";
        await pool.query(query, [userId]);
    }

    static async updateUserResetToken(userId, token) {
        const query = "UPDATE usuarios SET reset_token = $1 WHERE id_usuario = $2";
        await pool.query(query, [token, userId]);
    }

    static async updateUserPassword(userId, password) {
        const query = "UPDATE usuarios SET contrasena = $1, reset_token = NULL WHERE id_usuario = $2";
        await pool.query(query, [password, userId]);
    }
}

module.exports = UserModel;
