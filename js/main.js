// Iagro — comportamiento básico del formulario de contacto.
// Sin backend conectado todavía: arma un mensaje de WhatsApp prellenado
// con los datos ingresados, para que el envío real ocurra por WhatsApp.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const email = form.email.value.trim();
    const ubicacion = form.ubicacion.value.trim();
    const mensaje = form.mensaje.value.trim();

    const partes = [
      `Hola Iagro, soy ${nombre}.`,
      telefono ? `Mi contacto: ${telefono}` : '',
      email ? `Email: ${email}` : '',
      ubicacion ? `Ubicación de mi parcela: ${ubicacion}` : '',
      mensaje ? `Detalle: ${mensaje}` : ''
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/59176871405?text=${encodeURIComponent(partes)}`;
    window.open(url, '_blank', 'noopener');
  });
});
