document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-contacto");
    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validarFormulario()) {
            alert("Revisá los campos marcados antes de enviar.");
            return;
        }

        const contactos = JSON.parse(localStorage.getItem("contactos")) || [];

        contactos.push({
            nombre: valor("nombre"),
            apellido: valor("apellido"),
            edad: valor("edad"),
            telefono: valor("telefono") || "—",
            mensaje: valor("mensaje"),
            fecha: new Date().toLocaleDateString("es-AR")
        });

        localStorage.setItem("contactos", JSON.stringify(contactos));

        alert("¡Consulta enviada! Te vamos a contactar a la brevedad.");
        formulario.reset();
        limpiarErrores();
    });
});

function valor(id) {
    const campo = document.getElementById(id);
    return campo ? campo.value.trim() : "";
}

function limpiarErrores() {
    document.querySelectorAll("#formulario-contacto .error").forEach(function (error) {
        error.innerText = "";
    });
}

function validarFormulario() {
    const nombre = valor("nombre");
    const apellido = valor("apellido");
    const edad = valor("edad");
    const mensaje = valor("mensaje");

    const errorNombre = document.getElementById("error-nombre");
    const errorApellido = document.getElementById("error-apellido");
    const errorEdad = document.getElementById("error-edad");
    const errorMensaje = document.getElementById("error-mensaje");

    limpiarErrores();

    let error = false;

    if (nombre === "") {
        errorNombre.innerText = "El nombre es obligatorio.";
        error = true;
    } else if (nombre.length < 3) {
        errorNombre.innerText = "El nombre debe tener al menos 3 caracteres.";
        error = true;
    } else if (nombre.length > 20) {
        errorNombre.innerText = "El nombre no puede tener más de 20 caracteres.";
        error = true;
    }

    if (apellido === "") {
        errorApellido.innerText = "El apellido es obligatorio.";
        error = true;
    } else if (apellido.length < 3) {
        errorApellido.innerText = "El apellido debe tener al menos 3 caracteres.";
        error = true;
    } else if (apellido.length > 20) {
        errorApellido.innerText = "El apellido no puede tener más de 20 caracteres.";
        error = true;
    }

    if (edad === "") {
        errorEdad.innerText = "La edad es obligatoria.";
        error = true;
    } else if (Number(edad) < 18) {
        errorEdad.innerText = "Debés tener al menos 18 años.";
        error = true;
    } else if (Number(edad) > 60) {
        errorEdad.innerText = "La edad no puede ser mayor a 60.";
        error = true;
    }

    if (mensaje === "") {
        errorMensaje.innerText = "El mensaje es obligatorio.";
        error = true;
    } else if (mensaje.length < 15) {
        errorMensaje.innerText = "El mensaje debe tener al menos 15 caracteres.";
        error = true;
    } else if (mensaje.length > 200) {
        errorMensaje.innerText = "El mensaje no puede tener más de 200 caracteres.";
        error = true;
    }

    return !error;
}
