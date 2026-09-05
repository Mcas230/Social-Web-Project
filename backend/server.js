require("dotenv").config({ path: ".env.local" });
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

console.log("ANTES DE LA CONSULTA");

pool.query("SELECT * FROM usuarios", (error, result) => {
    console.log("LA CONSULTA TERMINÓ");

    if (error) {
        console.error("ERROR:", error);
    } else {
        console.log("RESULTADO:", result.rows);
    }
});


console.log("DESPUÉS DE LA CONSULTA");


app.post("/login", (req, res) => {

    const { email, password } = req.body;

    pool.query(
        "SELECT * FROM usuarios WHERE email = $1",
        [email],
        async (error, result) => {

            if (error) {
                console.error("ERROR:", error);
                return res.status(500).json({
                    mensaje: "Error del servidor"
                });
            }

            if (result.rows.length === 0) {
                return res.status(401).json({
                    mensaje: "Correo o contraseña incorrectos"
                });
            }

            const usuario = result.rows[0];

            const contraseñaCorrecta = await bcrypt.compare(
                password,
                usuario.password_hash
            );

            if (!contraseñaCorrecta) {
                return res.status(401).json({
                    mensaje: "Correo o contraseña incorrectos"
                });
            }

            res.json({
                mensaje: "Login correcto",
                usuario: usuario.usuario
            });

        }
    );

});


if (require.main === module) {
    app.listen(3000, () => {
        console.log("Backend funcionando en http://localhost:3000");
    });
}

app.post("/signup", async (req, res) => {

    const { usuario, nombre_usuario, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    pool.query(
        "INSERT INTO usuarios (usuario, nombre_usuario ,email, password_hash) VALUES ($1, $2, $3, $4)",
        [usuario, nombre_usuario, email, passwordHash],
        (error, result) => {

            if (error) {
                console.error("ERROR:", error);
                return res.status(500).json({
                    mensaje: "Error al registrar usuario"
                });
            }

            res.json({
                mensaje: "Usuario registrado correctamente"
            });

        }
    );

});


module.exports = app;

