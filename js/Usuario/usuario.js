document.addEventListener("DOMContentLoaded", function () {
    const sesiones = JSON.parse(localStorage.getItem("usuario-logueado")) || [];
    const sesion = sesiones.length > 0 ? sesiones[sesiones.length - 1] : null;

    if (!sesion) {
        window.location.href = "../Login/login.html";
        return;
    }

    const usuarioHeader = document.getElementById("usuario");
    const usuarioBienvenida = document.getElementById("usuario-bienvenida");

    if (usuarioHeader) {
        usuarioHeader.textContent = sesion.usuario;
    }

    if (usuarioBienvenida) {
        usuarioBienvenida.textContent = sesion.usuario;
    }
});
