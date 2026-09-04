const password = document.querySelector("#password");
const email = document.querySelector("#email");
const button = document.querySelector("button");

console.log("SCRIPTS.JS CARGADO");

button.addEventListener("click", () => {

    console.log("BOTÓN PRESIONADO");

    const passwordValue = password.value;
    const emailValue = email.value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    })
    .then(response => {
        console.log("RESPUESTA DEL SERVIDOR:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("DATOS DEL SERVIDOR:", data.mensaje);
        if (data.mensaje === "Login correcto") {
            window.location.href = "../index.html";
        }
    })
    .catch(error => {
        console.error("ERROR FETCH:", error);
    });

});


function validarCampos() {
    if (password.value.length >= 6 && email.value.length >= 1) {
        button.classList.add("activo");
    } else {
        button.classList.remove("activo");
    }
}

password.addEventListener("input", validarCampos);
email.addEventListener("input", validarCampos);