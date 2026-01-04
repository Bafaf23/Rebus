const btn = document.querySelector(".btn-toggle");
const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
const htmlElement = document.documentElement;

// 1. Función para actualizar los iconos visualmente
function updateIcons(isDark) {
  if (isDark) {
    themeToggleLightIcon.style.display = "block"; // Muestra sol
    themeToggleDarkIcon.style.display = "none"; // Oculta luna
  } else {
    themeToggleLightIcon.style.display = "none"; // Oculta sol
    themeToggleDarkIcon.style.display = "block"; // Muestra luna
  }
}

// 2. Lógica inicial (al cargar la página)
const savedTheme =
  localStorage.getItem("color-theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");

htmlElement.setAttribute("data-theme", savedTheme);
updateIcons(savedTheme === "dark");

// 3. Evento de clic (Cambio dinámico)
btn.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const targetTheme = currentTheme === "dark" ? "light" : "dark";

  // Aplicar cambios
  htmlElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("color-theme", targetTheme);

  // ¡IMPORTANTE! Actualizar los iconos aquí también
  updateIcons(targetTheme === "dark");
});
