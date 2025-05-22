const transporter = require("../config/email");

const sendConfirmationEmail = async (email, token) => {
    const confirmLink = `${process.env.FRONTEND_URL}/confirmar/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Confirma tu Registro",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #333333; margin-bottom: 20px;">¡Confirma tu registro!</h2>
              <p style="color: #555555; font-size: 15px;">Gracias por registrarte. Para activar tu cuenta y comenzar a usar nuestros servicios, haz clic en el botón de abajo:</p>
              
              <a href="${confirmLink}" style="
                display: inline-block;
                margin-top: 25px;
                background-color: #3b5998;
                color: #ffffff;
                padding: 12px 20px;
                text-decoration: none;
                border-radius: 8px;
                font-size: 16px;
              ">Confirmar Registro</a>
      
              <p style="color: #999999; font-size: 13px; margin-top: 30px;">Si no solicitaste esta cuenta, puedes ignorar este correo.</p>
              <hr style="margin-top: 40px; border: none; border-top: 1px solid #eeeeee;">
              <p style="color: #aaa; font-size: 12px; text-align: center; margin-top: 20px;">Este mensaje fue enviado automáticamente, por favor no respondas a este correo.</p>
            </div>
          </div>
        `,
      };
    await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, token) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperación de Contraseña",
        html: `
            <h2>Recuperación de Contraseña</h2>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${resetLink}" style="background-color:#4CAF50; color:white; padding:10px 15px; text-decoration:none; border-radius:5px;">
                Restablecer Contraseña
            </a>
            <p>Este enlace expira en 1 hora.</p>`
    };
    await transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail, sendPasswordResetEmail };