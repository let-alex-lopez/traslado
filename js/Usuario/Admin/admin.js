document.addEventListener("DOMContentLoaded", function () {
    const sesiones = JSON.parse(localStorage.getItem("usuario-logueado")) || [];
    const admin = sesiones.find(function (sesion) {
        return sesion.usuario === "admin";
    });

    if (!admin) {
        window.location.href = "../../index.html";
        return;
    }

    const usuarioHeader = document.getElementById("usuario");
    const usuarioBienvenida = document.getElementById("usuario-bienvenida");

    if (usuarioHeader) {
        usuarioHeader.textContent = admin.usuario;
    }

    if (usuarioBienvenida) {
        usuarioBienvenida.textContent = admin.usuario;
    }
});
