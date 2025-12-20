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

(function checkAccess() {
  const session = JSON.parse(localStorage.getItem("userSession"));

  if (!session) {
    // Si no hay sesión, volver al login
    window.location.href = "../../index.html";
  }
})();

if (logoutBtn) {
  logoutBtn.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "../index.html";
  });
}

if (logoutBtnDes) {
  logoutBtnDes.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "../../index.html";
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

export function getAvatar(nameUser) {
  const parts = nameUser.trim().split(``);
  let inicial = "";

  if (parts.length > 0) {
    inicial += parts[0];
  }

  return inicial.toUpperCase();
}

getData("https://ve.dolarapi.com/v1/dolares/oficial").then((data) => {
  renderDolar(data);
});

function renderDolar(data) {
  if (data && data.promedio !== undefined) {
    if (dolar) {
      dolar.textContent = data.promedio;
    }
  } else {
    console.error("Los datos recibidos de la API no son válidos:", data);
  }
}

if (linkAdmin) {
  if (!user.admi && linkAdmin) {
    linkAdmin.style.display = `none`;
  }
}

if (btnPanel) {
  if (!user.admi && btnPanel) {
    btnPanel.style.display = `none`;
  }
}
