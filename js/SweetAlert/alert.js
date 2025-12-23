export const alertaZen = (titulo, texto, icono = "success") => {
  Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    confirmButtonText: "Entendido",
    confirmButtonColor: "#2ecc71", // El verde de tu proyecto
    background: "#ffffff",
    color: "#2c3e50",
    borderRadius: "20px", // Coherente con tus formularios
    showClass: {
      popup: "animate__animated animate__fadeInDown", // Si usas Animate.css
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
};
