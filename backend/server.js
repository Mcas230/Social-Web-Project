require("dotenv").config({ path: "../.env.local" });


const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
const { Pool } = require("pg");


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

module.exports = app;