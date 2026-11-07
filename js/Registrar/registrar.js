document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("registrar-form");
    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validarFormulario()) {
            alert("Revisá los datos marcados antes de continuar.");
            return;
        }

        const registrados = JSON.parse(localStorage.getItem("lista-registrados")) || [];

        registrados.push({
            usuario: valor("usuario"),
            email: valor("email"),
            contrasena: valor("contrasena"),
            fechaRegistro: new Date().toLocaleDateString("es-AR")
        });

        localStorage.setItem("lista-registrados", JSON.stringify(registrados));

        alert("¡Cuenta creada con éxito! Ahora podés iniciar sesión.");
        window.location.href = "../Login/login.html";
    });
});

function valor(id) {
    const campo = document.getElementById(id);
    return campo ? campo.value.trim() : "";
}

function limpiarErrores() {
    ["error-usuario", "error-email", "error-contrasena", "error-confirmar-contrasena"]
        .forEach(function (id) {
            const error = document.getElementById(id);
            if (error) {
                error.innerText = "";
            }
        });
}

function validarFormulario() {
    const usuario = valor("usuario");
    const email = valor("email");
    const contrasena = valor("contrasena");
    const confirmarContrasena = valor("confirmar-contrasena");

    const errorUsuario = document.getElementById("error-usuario");
    const errorEmail = document.getElementById("error-email");
    const errorContrasena = document.getElementById("error-contrasena");
    const errorConfirmarContrasena = document.getElementById("error-confirmar-contrasena");

    limpiarErrores();

    const registrados = JSON.parse(localStorage.getItem("lista-registrados")) || [];
    const usuarioEnUso = registrados.some(function (registrado) {
        return registrado.usuario === usuario;
    });
    const emailEnUso = registrados.some(function (registrado) {
        return registrado.email === email;
    });

    let error = false;

    if (usuario === "") {
        errorUsuario.innerText = "El usuario es obligatorio.";
        error = true;
    } else if (usuario.length < 3) {
        errorUsuario.innerText = "El usuario debe tener al menos 3 caracteres.";
        error = true;
    } else if (usuario.length > 20) {
        errorUsuario.innerText = "El usuario no puede tener más de 20 caracteres.";
        error = true;
    } else if (usuarioEnUso) {
        errorUsuario.innerText = "Ese nombre de usuario ya está en uso.";
        error = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        errorEmail.innerText = "El email es obligatorio.";
        error = true;
    } else if (!emailRegex.test(email)) {
        errorEmail.innerText = "El email no es válido.";
        error = true;
    } else if (emailEnUso) {
        errorEmail.innerText = "Ese email ya está registrado.";
        error = true;
    }

    if (contrasena === "") {
        errorContrasena.innerText = "La contraseña es obligatoria.";
        error = true;
    } else if (contrasena.length < 5) {
        errorContrasena.innerText = "La contraseña debe tener al menos 5 caracteres.";
        error = true;
    } else if (contrasena.length > 12) {
        errorContrasena.innerText = "La contraseña no puede tener más de 12 caracteres.";
        error = true;
    }

    if (confirmarContrasena === "") {
        errorConfirmarContrasena.innerText = "Tenés que confirmar la contraseña.";
        error = true;
    } else if (contrasena !== confirmarContrasena) {
        errorConfirmarContrasena.innerText = "Las contraseñas no coinciden.";
        error = true;
    }

    return !error;
}
