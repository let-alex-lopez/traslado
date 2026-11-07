# Configuración del envío de consultas

El formulario utiliza EmailJS para enviar consultas desde este sitio estático.
Antes de que pueda enviar correos:

1. Creá una cuenta en EmailJS y vinculá el correo que recibirá las consultas.
2. Creá una plantilla y configurá `xopeza@gmail.com` como destinatario.
3. En el cuerpo de la plantilla, insertá las variables; por ejemplo:
   `Nombre: {{nombre_completo}}`, `Edad: {{edad}}`, `Teléfono: {{telefono}}`,
   `Fecha: {{fecha}}` y `Consulta: {{mensaje}}`. También se envía `{{name}}`,
   `{{from_name}}` y `{{message}}` para las plantillas predeterminadas de EmailJS.
4. El Service ID, Template ID y Public Key ya están cargados en el objeto
   `EMAILJS_CONFIG`, al inicio de `js/Contactos/contacto.js`.
5. Restringí la Public Key al dominio donde publiques el sitio y activá las
   protecciones antispam disponibles en EmailJS.

Mientras esos tres valores no estén configurados, el formulario indicará que
el mensaje no se envió y no lo guardará como una consulta enviada.
