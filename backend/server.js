require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));

const chatRoutes = require('./routes/chatRoutes');
app.use('/api', chatRoutes);
app.use("/api", require("./routes/usuarioRoutes"));
//mostrar y guardar imagenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//

//app.use("/api", require("./routes/expositorRoutes"));

