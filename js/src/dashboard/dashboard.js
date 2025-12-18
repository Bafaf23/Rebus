import { getData } from "../api/dolarApi.js";

const helloUser = document.getElementById("welcome");
const userDestok = document.getElementById("userDesktop");
const avatar = document.getElementById("avatar");
const dolar = document.getElementById("dolar");

//cerrar secion
const logoutBtn = document.getElementById("logoutBtn");
const logoutBtnDes = document.getElementById("logoutBtnDes");

if (logoutBtn) {
  logoutBtn.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "../index.html";
  });
}

if (logoutBtnDes) {
  logoutBtnDes.addEventListener(`click`, () => {
    localStorage.removeItem("userSession");
    window.location.href = "../index.html";
  });
}

let user = JSON.parse(localStorage.getItem("userSession"));
let nameUser = user.name;

//Saludar al usurio
helloUser.textContent = `¡Hola!, ${user.name}`;
avatar.textContent = getAvatar(nameUser);

userDestok.textContent = ` ${user.name}`;

export function getAvatar(nameUser) {
  const parts = nameUser.trim().split(``);
  let inicial = "";

  if (parts.length > 0) {
    inicial += parts[0];
  }

  return inicial.toUpperCase();
}

let dataDolar = getData("https://ve.dolarapi.com/v1/dolares/oficial").then(
  renderDolar
);

function renderDolar(dataDolar) {
  dolar.textContent = dataDolar.promedio;
}
renderDolar(dataDolar);
