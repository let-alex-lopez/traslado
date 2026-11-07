document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("menu-principal");

    const sesiones = JSON.parse(localStorage.getItem("usuario-logueado") || "[]");
    const sesion = Array.isArray(sesiones) && sesiones.length > 0
        ? sesiones[sesiones.length - 1]
        : null;
    const navEnd = nav && nav.querySelector(".navbar-item-end");

    if (navEnd) {
        navEnd.querySelectorAll("[data-nav-visitante]").forEach(function (elemento) {
            elemento.hidden = Boolean(sesion);
        });
        navEnd.querySelectorAll("[data-nav-sesion]").forEach(function (elemento) {
            elemento.hidden = !sesion;
        });

        if (sesion) {
            const usuario = navEnd.querySelector("[data-nav-usuario]");
            const esAdmin = sesion.usuario === "admin";

            navEnd.querySelectorAll("[data-nav-client-only]").forEach(function (elemento) {
                elemento.hidden = esAdmin;
            });
            navEnd.querySelectorAll("[data-nav-admin-only]").forEach(function (elemento) {
                elemento.hidden = !esAdmin;
            });
            if (usuario) {
                usuario.textContent = sesion.usuario;
            }
        }
    }

    if (toggle && nav) {
        const cerrarMenu = function () {
            nav.classList.remove("abierto");
            toggle.classList.remove("activo");
            toggle.setAttribute("aria-expanded", "false");
        };

        toggle.addEventListener("click", function () {
            const abierto = nav.classList.toggle("abierto");
            toggle.classList.toggle("activo", abierto);
            toggle.setAttribute("aria-expanded", String(abierto));
        });

        nav.querySelectorAll("a").forEach(function (enlace) {
            enlace.addEventListener("click", cerrarMenu);
        });

        document.addEventListener("keydown", function (evento) {
            if (evento.key === "Escape") {
                cerrarMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 980) {
                cerrarMenu();
            }
        });
    }

    if (header) {
        const actualizarSombra = function () {
            header.classList.toggle("scrolled", window.scrollY > 8);
        };

        actualizarSombra();
        window.addEventListener("scroll", actualizarSombra, { passive: true });
    }

    document.querySelectorAll("[data-cerrar-sesion]").forEach(function (enlace) {
        enlace.addEventListener("click", function () {
            localStorage.removeItem("usuario-logueado");
        });
    });
});
