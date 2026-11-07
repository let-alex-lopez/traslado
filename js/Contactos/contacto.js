const EMAILJS_CONFIG = {
    serviceId: "service_y049o7k",
    templateId: "template_dvojm03",
    publicKey: "VnNwqChjHf0d0yHfA"
};

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formulario-contacto");
    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!validarFormulario()) {
            alert("Revisá los campos marcados antes de enviar.");
            return;
        }

        const nombre = valor("nombre");
        const apellido = valor("apellido");
        const mensaje = valor("mensaje");
        const telefono = valor("telefono") || "No informado";
        const edad = valor("edad");
        const fecha = new Date().toLocaleString("es-AR");
        const nombreCompleto = nombre + " " + apellido;
        const detalleConsulta = [
            "Nombre: " + nombreCompleto,
            "Edad: " + edad,
            "Teléfono: " + telefono,
            "Fecha de envío: " + fecha,
            "",
            "Consulta:",
            mensaje
        ].join("\n");
        const contacto = {
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            telefono: telefono,
            mensaje: mensaje,
            fecha: fecha,
            nombre_completo: nombreCompleto,
            name: nombreCompleto,
            from_name: nombreCompleto,
            title: "Nueva consulta desde la página web",
            subject: "Nueva consulta de " + nombreCompleto,
            message: detalleConsulta
        };
        const estadoEnvio = document.getElementById("estado-envio");
        const botonEnviar = formulario.querySelector('button[type="submit"]');

        if (!EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId || !EMAILJS_CONFIG.publicKey) {
            mostrarEstado(estadoEnvio, "El envío por correo todavía no está configurado. No se envió la consulta.", "error");
            return;
        }

        if (!window.emailjs || typeof window.emailjs.send !== "function") {
            mostrarEstado(estadoEnvio, "No se pudo cargar el servicio de correo. Revisá tu conexión e intentá nuevamente.", "error");
            return;
        }

        botonEnviar.disabled = true;
        botonEnviar.textContent = "Enviando...";
        mostrarEstado(estadoEnvio, "Enviando tu consulta...", "");

        try {
            await window.emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                contacto,
                { publicKey: EMAILJS_CONFIG.publicKey }
            );
        } catch (error) {
            console.error("No se pudo enviar la consulta por correo.", error);
            mostrarEstado(estadoEnvio, "No se pudo enviar la consulta. Revisá tu conexión e intentá nuevamente.", "error");
            return;
        } finally {
            botonEnviar.disabled = false;
            botonEnviar.textContent = "Enviar consulta";
        }

        try {
            const contactos = JSON.parse(localStorage.getItem("contactos") || "[]");
            if (!Array.isArray(contactos)) {
                throw new Error("El registro local de consultas no tiene un formato válido.");
            }
            contactos.push(contacto);
            localStorage.setItem("contactos", JSON.stringify(contactos));
            mostrarEstado(estadoEnvio, "¡Consulta enviada! Te vamos a contactar a la brevedad.", "exito");
        } catch (error) {
            console.error("La consulta se envió, pero no se pudo guardar en este navegador.", error);
            mostrarEstado(estadoEnvio, "La consulta se envió por correo, pero no se pudo guardar en este navegador.", "error");
        }

        formulario.reset();
        limpiarErrores();
    });
});

function mostrarEstado(elemento, mensaje, tipo) {
    if (!elemento) {
        return;
    }

    elemento.textContent = mensaje;
    elemento.className = "estado-envio" + (tipo ? " " + tipo : "");
}

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
