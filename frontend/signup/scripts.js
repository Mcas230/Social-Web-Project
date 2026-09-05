const nickname = document.querySelector("#signNickname");
const user = document.querySelector("#signUser");
const email = document.querySelector("#signEmail");
const password = document.querySelector("#signPassword");
const button = document.querySelector("#signUpButton");


button.addEventListener("click", () => {


    const nicknameValue = nickname.value;
    const userValue = user.value;
    const emailValue = email.value;
    const passwordValue = password.value;

        if (passwordValue.length < 8) {
            console.log("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (userValue.length < 1) {
            console.log("El usuario es obligatorio");
            return;
        }

        if (!email.checkValidity()) {
            console.log("El correo no es válido");
            return;
        }

    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: nicknameValue,
            nombre_usuario: userValue,
            email: emailValue,
            password: passwordValue
        })
    })
    .then(response => {
        console.log("RESPUESTA DEL SERVIDOR:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("DATOS DEL SERVIDOR:", data);
    })
    .catch(error => {
        console.error("ERROR FETCH:", error);
    });

});