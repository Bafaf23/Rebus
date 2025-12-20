import { mesassege } from "../register/register.js";
import { validacionInput, emailPattern } from "../regex/regex.js";

let user = JSON.parse(localStorage.getItem("userSession"));

const nameUser = document.getElementById("name");
const idAcount = document.getElementById("acount");
const typeUser = document.getElementById("typeUser");
const converAdmin = document.getElementById("converAdmin");
const btnEdit = document.getElementById("edit");
const btnGuardar = document.getElementById("guardar");

if (nameUser) nameUser.innerHTML = `${user.name} ${user.lastName}`;
if (idAcount) idAcount.innerHTML = user.id;

converAdmin.addEventListener(`click`, () => {
  let dataUsers = JSON.parse(localStorage.getItem("dataUsers")) || [];

  if (!user) return mesassege(`No hay seccion Activa`, `Error`);

  user.admi = !user.admi;

  let userIndex = dataUsers.findIndex((u) => u.email === user.email);
  if (userIndex !== -1) {
    dataUsers[userIndex].admi = user.admi;
  }

  localStorage.setItem("userSession", JSON.stringify(user));
  localStorage.setItem("dataUsers", JSON.stringify(dataUsers));

  window.location.reload();
});

let isAmin = user.admi;
if (typeUser) {
  if (isAmin === false) {
    typeUser.innerHTML = `Cliente`;
  } else if (isAmin === true) {
    typeUser.innerHTML = `Administrador`;
  }
}

function cargarDatosPerfil() {
  const inputName = document.getElementById("input-name");
  const inputLasName = document.getElementById("input-lastname");
  const inputEmail = document.getElementById("input-emial");

  if (inputName && inputLasName && inputEmail) {
    inputName.value = user.name;
    inputLasName.value = user.lastName;
    inputEmail.value = user.email;
  } else {
    mesassege(`Ocurrio un error al cargar los datos`, `Error`);
  }
}
document.addEventListener(`DOMContentLoaded`, cargarDatosPerfil());

window.addEventListener("load", () => {
  const session = JSON.parse(localStorage.getItem("userSession"));
  const btnAdmin = document.getElementById("converAdmin");

  if (session && btnAdmin) {
    // Si ya es admin, el botón ofrece quitar el rango
    btnAdmin.textContent = session.admi
      ? "Quitar rango Administrador"
      : "Convertir en Administrador";

    // Cambiar color según el estado
    btnAdmin.style.backgroundColor = session.admi ? "#dc3545" : "#28a745";
  }
});

btnEdit.addEventListener(`click`, () => {
  const inputName = document.getElementById("input-name");
  const inputLasName = document.getElementById("input-lastname");
  const inputEmail = document.getElementById("input-emial");

  inputName.readOnly = false;
  inputLasName.readOnly = false;
  inputEmail.readOnly = false;

  inputName.style.color = `black`;
  inputLasName.style.color = `black`;
  inputEmail.style.color = `black`;
});

btnGuardar.addEventListener(`click`, () => {
  const inputName = document.getElementById("input-name");
  const inputLasName = document.getElementById("input-lastname");
  const inputEmail = document.getElementById("input-emial");

  let dataUsers = JSON.parse(localStorage.getItem("dataUsers"));

  user.name = inputName.value.trim();
  user.lastName = inputLasName.value.trim();
  user.email = inputEmail.value.trim();

  let userIndex = dataUsers.findIndex((u) => u.id === user.id);
  if (userIndex !== -1) {
    dataUsers[userIndex].name = user.name;
    dataUsers[userIndex].lastName = user.lastName;
    if (!validacionInput(inputEmail.value.trim(), emailPattern)) {
      return mesassege(
        `El correo no cumple con el formato`,
        `Formato invalido`
      );
    }
    dataUsers[userIndex].email = user.email;
  }

  localStorage.setItem("userSession", JSON.stringify(user));
  localStorage.setItem("dataUsers", JSON.stringify(dataUsers));

  window.location.reload();
});
