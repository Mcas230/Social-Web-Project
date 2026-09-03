const password = document.querySelector("#password");
const email = document.querySelector("#email");
const button = document.querySelector("button");


button.addEventListener("click", () => {

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