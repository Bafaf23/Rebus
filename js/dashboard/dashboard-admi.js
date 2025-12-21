import { getData } from "../api/dolarApi.js";
import { mesassege } from "../register/register.js";

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

function preEditTabla(btn) {
  // Buscamos el contenedor '.row' más cercano al botón
  const fila = btn.closest("tr") || btn.closest(".row");

  // Seleccionamos todos los inputs solo dentro de esa fila
  const inputs = fila.querySelectorAll("input");
  let btnGuardar = fila.querySelector(".btn-guardar");

  inputs.forEach((input) => {
    input.readOnly = false;
    input.style.backgroundColor = "#fff"; // Opcional: cambio visual para indicar edición
    input.style.borderBottom = "1px solid rgb(9, 20, 177)";
    input.style.color = `black`;
  });

  btn.style.display = "none"; // Oculta botón editar
  btnGuardar.style.display = "inline-block"; // Muestra botón guardar

  // Opcional: enfocar el primer input automáticamente
  inputs[0].focus();
}
window.preEdit = preEditTabla;

function actualizar(id, fila) {
  // 1. Obtener los nuevos valores de los inputs de la fila
  const nuevoNombre = fila.querySelector(".input-name").value.trim();
  const nuevoApellido = fila.querySelector(".input-lastname").value.trim();
  const nuevoEmail = fila.querySelector(".input-email").value.trim();

  // 2. Buscar el usuario en el array global dataUsers
  const index = dataUsers.findIndex((u) => u.id === id);

  if (index !== -1) {
    dataUsers[index].name = nuevoNombre;
    dataUsers[index].lastName = nuevoApellido;
    dataUsers[index].email = nuevoEmail;

    // 3. Persistencia: Guardar en LocalStorage
    localStorage.setItem("dataUsers", JSON.stringify(dataUsers));

    // 4. Resetear la interfaz
    const inputs = fila.querySelectorAll("input");
    inputs.forEach((input) => {
      input.readOnly = true;
      input.style.color = `grey`;
      input.style.border = `none`;
    });
  }
}

function eliminarUsuario(id, fila) {
  // 1. Confirmación de seguridad
  if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

  // 2. Filtrar el array global para quitar al usuario
  // (Usamos String por seguridad de tipos en 2025)
  dataUsers = dataUsers.filter((user) => String(user.id) !== String(id));

  // 3. Guardar el nuevo array en LocalStorage
  localStorage.setItem("dataUsers", JSON.stringify(dataUsers));

  // 4. Animación y borrado visual de la fila
  fila.style.opacity = "0";
  fila.style.transition = "0.3s";

  setTimeout(() => {
    fila.remove();
    alert("Usuario eliminado correctamente.");
  }, 300);
}

//Insertar datos en la tabla desktop
dataUsers.forEach((dataUser) => {
  const tablaUser = document.getElementById("users-table-body");
  const trTabla = document.createElement("tr");

  function isAdmin() {
    let user = dataUser.admi;

    if (user === false) return `Cliente`;
    if (user === true) return `Administrador`;
  }

  function ultimosSeisId() {
    let id = String(dataUser.id);
    return id.slice(-6);
  }

  trTabla.innerHTML = `<td class="id">${ultimosSeisId()}</td><td><input class="input-name" value="${
    dataUser.name
  }"/ readonly></td><td><input class="input-lastname" value="${
    dataUser.lastName
  }" readonly/></td><td><input class="input-email" value="${
    dataUser.email
  } "readonly/></td><td>${isAdmin()}</td>
  <td class="content-btn">
  <span class="btn-elimina"><i class="fa-regular fa-trash-can "></i></span>
  <span class="btn-actualizar" onclick="preEdit(this)"><i class="fa-regular fa-pen-to-square"></i></span>
   <span class="btn-guardar" style="display:none;"><i class="fa-solid fa-check"></i></span>
  </td>`;
  tablaUser.appendChild(trTabla);

  const btnGuardar = trTabla.querySelector(".btn-guardar");
  btnGuardar.addEventListener(`click`, () => {
    actualizar(dataUser.id, trTabla);
  });
});

//Insertar datos en la tabla movil
dataUsers.forEach((dataUser) => {
  const tablaUserMovil = document.getElementById("tablaMovil");
  const row = document.createElement("div");
  row.classList.add("row");

  function isAdmin() {
    let user = dataUser.admi;

    if (user === false) return `Cliente`;
    if (user === true) return `Administrador`;
  }

  function ultimosSeisId() {
    let id = String(dataUser.id);
    return id.slice(-6);
  }

  row.innerHTML = `
              <div class="colum">
                <div class="header" id="id">ID:</div>
                <div class="contenido id">${ultimosSeisId()}</div>
              </div>
              <div class="colum">
                <div class="header" id="nameMovil">Nombre:</div>
               <input class="input-name" value="${dataUser.name}" readonly/>
              </div>
              <div class="colum">
                <div class="header" >Apellido:</div>
                <input class="input-lastname" value="${
                  dataUser.lastName
                }" readonly />
              </div>
              <div class="colum">
                <div class="header" id="emailMovil">Email:</div>
                <input class="input-email" value="${dataUser.email}" readonly/>
              </div>
              <div class="colum">
                <div class="header" id="rangoMovil">Rango:</div>
                <div class="contenido">${isAdmin()}</div>
              </div>
              <div class="colum">
                <div class="header">Accion:</div>
                <div class="contenido content-btn">
                  <span class="btn-elimina"><i class="fa-regular fa-trash-can "></i></span>
                  <span class="btn-actualizar" onclick="preEdit(this)"><i class="fa-regular fa-pen-to-square"></i></span>
                  <!-- Botón de guardar -->
                  <span class="btn-guardar" style="display: none"><i class="fa-solid fa-check"></i> </span>
                </div>
              </div>
            `;
  tablaUserMovil.appendChild(row);

  const btnGuardar = row.querySelector(".btn-guardar");
  btnGuardar.addEventListener(`click`, () => {
    actualizar(dataUser.id, row);
  });
});

// Para la tabla de Escritorio
const tablaDesktop = document.getElementById("users-table-body");
if (tablaDesktop) {
  tablaDesktop.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-elimina");
    if (btn) {
      const id = btn.dataset.id;
      const fila = btn.closest("tr");
      eliminarUsuario(id, fila);
    }
  });
}

// Para la tabla Móvil
const tablaMovil = document.getElementById("tablaMovil");
if (tablaMovil) {
  tablaMovil.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-elimina");
    if (btn) {
      const id = btn.dataset.id;
      const fila = btn.closest(".row");
      eliminarUsuario(id, fila);
    }
  });
}
