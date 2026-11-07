document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.getElementById("login-lista");
    if (!tbody) {
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuario-logueado")) || [];
    tbody.innerHTML = "";

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="tabla-vacia">Todavía no hay inicios de sesión registrados.</td></tr>';
        return;
    }

    usuarios.forEach(function (usuario) {
        const fila = document.createElement("tr");
        const clave = usuario.contrasena !== undefined
            ? usuario.contrasena
            : usuario["contraseña"];
        const datos = [
            usuario.usuario,
            clave || "—",
            usuario.fechaLog || "—"
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        tbody.appendChild(fila);
    });
});
