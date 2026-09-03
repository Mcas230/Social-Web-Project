const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {

    console.log(req.body);

    res.json({
        mensaje: "Datos recibidos"
    });

});

app.listen(3000, () => {
    console.log("Backend funcionando en http://localhost:3000");
});