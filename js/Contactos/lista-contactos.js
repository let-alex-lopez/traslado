document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.getElementById("contactos-lista");
    if (!tbody) {
        return;
    }

    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    tbody.innerHTML = "";

    if (contactos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="tabla-vacia">Todavía no hay consultas registradas.</td></tr>';
        return;
    }

    contactos.forEach(function (contacto) {
        const fila = document.createElement("tr");
        const datos = [
            contacto.nombre,
            contacto.apellido,
            contacto.edad,
            contacto.telefono || "—",
            contacto.mensaje
        ];

        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato !== undefined && dato !== "" ? dato : "—";
            fila.appendChild(celda);
        });

        tbody.appendChild(fila);
    });
});
