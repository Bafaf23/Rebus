import { getData } from "../api/dolarApi.js";

let dataUsers = JSON.parse(localStorage.getItem("dataUsers"));
let user = JSON.parse(localStorage.getItem("userSession"));

const nameAdmin = document.getElementById("admin-name");
const precioDolar = document.getElementById("precio-dolar");
const totalUser = document.getElementById("total-users");
const totaAdmin = document.getElementById("total-admins");

function exit() {
  if (user.admi === false) {
    window.location.href = `../../page/accsesodenegado/denegado.html`;
  }
}
exit();

nameAdmin.textContent = `Hola, ${user.name}`;

//llamando al precio del dolar
getData(`https://ve.dolarapi.com/v1/dolares/oficial`).then((data) => {
  renderDolar(data);
});
function renderDolar(data) {
  let dataDolar = data;
  if (precioDolar) {
    // Usamos el elemento real del DOM
    precioDolar.textContent = `${dataDolar.promedio}Bs`;
  } else {
    console.warn("No se encontró el elemento 'precio-dolar' en el DOM.");
  }
}

function renderUser() {
  let userTotal = dataUsers.length;
  totalUser.textContent = userTotal;
}
renderUser();

function renderAdmin() {
  const cantidadAdmins = dataUsers.filter((user) => user.admi === true).length;
  totaAdmin.textContent = cantidadAdmins;
}
renderAdmin();

console.log(dataUsers);
