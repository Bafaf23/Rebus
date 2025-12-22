import { getData } from "../api/dolarApi.js";

const helloUser = document.getElementById("welcome");
const userDestok = document.getElementById("userDesktop");
const avatar = document.getElementById("avatar");
const dolar = document.getElementById("dolar");
const typeUser = document.getElementById("isAdmin");
const linkAdmin = document.getElementById("pnAdmi");
const btnPanel = document.getElementById("pcMovil");

//cerrar secion
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnDes = document.getElementById("logoutBtnDes");

/** funcion control de acceso
 *
 * @function
 */
(function checkAccess() {
  const session = JSON.parse(localStorage.getItem("userSession"));
  const pathname = window.location.pathname;

  const isPageLogin = pathname.includes(`login.html`) || pathname.endsWith("/");

  if (!session) {
    if (!isPageLogin) {
      // Si no hay sesión, volver al login
      window.location.href = "../../page/login.html";
    }
  } else {
    //si hay sesion, no ir al login
    if (isPageLogin) {
      window.location.href = "../dashboard.html";
    }
  }
})();

//cerrar seccion movil
if (logoutBtn) {
  logoutBtn.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "login/login.html";
  });
}

//cerrar seccion nav-destoktop
if (logoutBtnDes) {
  logoutBtnDes.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "login/login.html";
  });
}

let user = JSON.parse(localStorage.getItem("userSession"));
let nameUser = user.name;

//Saludar al usurio
if (helloUser) helloUser.textContent = `¡Hola!, ${user.name}`;
if (avatar) avatar.textContent = getAvatar(nameUser);
let isAdmin = user.admi;
if (typeUser) {
  if (isAdmin === false) {
    typeUser.style.color = `gray`;
    typeUser.style.fontStyle = `italic`;
    typeUser.innerHTML = `Cliente`;
  } else if (isAdmin === true) {
    typeUser.style.color = `gray`;
    typeUser.style.fontStyle = `italic`;
    typeUser.innerHTML = `Administrador`;
  }
}

if (userDestok) userDestok.textContent = ` ${user.name}`;

/**
 * funcion que crea el avatar con la inicial del nombre del usurio
 *
 * @function @param {*} nameUser
 * @returns inical en mayuscula
 */
export function getAvatar(nameUser) {
  const parts = nameUser.trim().split(``);
  let inicial = "";

  if (parts.length > 0) {
    inicial += parts[0];
  }

  return inicial.toUpperCase();
}

//llamndo a dolarApi para mostar precio del dolar BCV
getData("https://ve.dolarapi.com/v1/dolares/oficial").then((data) => {
  renderDolar(data);
});

/**
 * funcion para renderisar el precio del dolar
 * @param {*} data
 */
function renderDolar(data) {
  if (data && data.promedio !== undefined) {
    if (dolar) {
      dolar.textContent = data.promedio;
    }
  } else {
    console.error("Los datos recibidos de la API no son válidos:", data);
  }
}

//Mustra en el nav-desktop el link del panel de control para los Admin
if (linkAdmin) {
  if (!user.admi && linkAdmin) {
    linkAdmin.style.display = `none`;
  }
}
//mustra el btn del panel de control para los Admin en vista moviles
if (btnPanel) {
  if (!user.admi && btnPanel) {
    btnPanel.style.display = `none`;
  }
}
