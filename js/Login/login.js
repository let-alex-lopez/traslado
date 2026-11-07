document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("login-form");
    if (!formulario) {
        return;
    }

    const errorMensaje = document.getElementById("error-mensaje");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = document.getElementById("nombreUsuario").value.trim();
        const contrasena = document.getElementById("contrasena").value;

        if (errorMensaje) {
            errorMensaje.innerText = "";
        }

        if (usuario === "" || contrasena === "") {
            if (errorMensaje) {
                errorMensaje.innerText = "Completá usuario y contraseña.";
            }
            return;
        }

        const registrados = JSON.parse(localStorage.getItem("lista-registrados")) || [];
        const sesiones = JSON.parse(localStorage.getItem("usuario-logueado")) || [];
        const fechaLog = new Date().toLocaleString("es-AR");

        const admin = {
            usuario: "admin",
            contrasena: "admin123",
            fechaLog: fechaLog
        };

        const encontrado = registrados.find(function (registrado) {
            const clave = registrado.contrasena !== undefined
                ? registrado.contrasena
                : registrado["contraseña"];

            return registrado.usuario === usuario && clave === contrasena;
        });

        if (encontrado) {
            sesiones.push({
                usuario: encontrado.usuario,
                contrasena: contrasena,
                fechaLog: fechaLog
            });
            localStorage.setItem("usuario-logueado", JSON.stringify(sesiones));
            window.location.href = "../Clientes/clientes.html";
        } else if (usuario === admin.usuario && contrasena === admin.contrasena) {
            sesiones.push(admin);
            localStorage.setItem("usuario-logueado", JSON.stringify(sesiones));
            window.location.href = "../Admin/admin.html";
        } else if (errorMensaje) {
            errorMensaje.innerText = "Usuario o contraseña incorrectos.";
        }
    });
});
