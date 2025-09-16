function guardarUser(){

    const namem = "Bryant Facenda"

    document.getElementById("user").textContent = `¡Hola!, ${namem}`
}

// Guardar la fecha y hora de la última conexión
function guardarUltimaConexion() {
  localStorage.setItem('ultimaConexion', new Date().toISOString());
}

// Mostrar la última conexión
function mostrarUltimaConexion() {
  const ultimaConexion = localStorage.getItem('ultimaConexion');
  if (ultimaConexion) {

    const fecha = new Date(ultimaConexion);

    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);

    document.getElementById('ultimoAcceso').textContent = `Última conexión: ${fechaFormateada}`;

  } else {
    document.getElementById('ultimoAcceso').textContent = 'Nunca te has conectado.';
  }
}

// Llamar a la función al cargar la página
window.onload = function() {
  guardarUltimaConexion();
  mostrarUltimaConexion();
  guardarUser()
};