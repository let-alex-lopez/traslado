document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.getElementById("usuario-lista");
    if (!tbody) {
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("lista-registrados")) || [];
    tbody.innerHTML = "";

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="tabla-vacia">Todavía no hay usuarios registrados.</td></tr>';
        return;
    }

    usuarios.forEach(function (usuario) {
        const fila = document.createElement("tr");
        const clave = usuario.contrasena !== undefined
            ? usuario.contrasena
            : usuario["contraseña"];
        const datos = [
            usuario.usuario,
            usuario.email,
            clave || "—",
            usuario.fechaRegistro || "—"
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato !== undefined && dato !== "" ? dato : "—";
            fila.appendChild(celda);
        });

        tbody.appendChild(fila);
    });
});
