import { getData } from "../api/dolarApi.js";
import { mesassege } from "../register/register.js";
import { validacionInput, passPattern, emailPattern } from "../regex/regex.js";
import { hashPassaword } from "../hash/hash.js";
import { alertaZen } from "../SweetAlert/alert.js";

window.dataUsers = JSON.parse(localStorage.getItem("dataUsers")) || [];
let user = JSON.parse(localStorage.getItem("userSession"));

const nameAdmin = document.getElementById("admin-name");
const precioDolar = document.getElementById("precio-dolar");
const totalUser = document.getElementById("total-users");
const totaAdmin = document.getElementById("total-admins");

(function exit() {
  let seccion = JSON.parse(localStorage.getItem("userSession"));
  const pathname = window.location.pathname;
  const isPageLogin = pathname.includes("login.html") || pathname.endsWith("/");

  if (!seccion) {
    // Si no hay sesión y no estoy en el login, redirigir al inicio
    if (!isPageLogin) {
      window.location.href = "../../index.html";
    }
  } else {
    // Si HAY sesión pero el usuario NO es admin
    if (seccion.admi === false) {
      window.location.href = "../../page/accsesodenegado/denegado.html";
    }
    // Si ya está logueado e intenta ir al login
    if (isPageLogin) {
      window.location.href = "../dasboard.html"; // O al dashboard
    }
  }
})();

nameAdmin.textContent = `Hola, ${user.name}`;

//llamando al precio del dolar
getData(`https://ve.dolarapi.com/v1/dolares/oficial`).then((data) => {
  renderDolar(data);
});

/**
 * funcion para renderisar el precio del dolar
 * @param {*} data
 */
function renderDolar(data) {
  let dataDolar = data;
  if (precioDolar) {
    // Usamos el elemento real del DOM
    precioDolar.textContent = `${dataDolar.promedio}Bs`;
  } else {
    console.warn("No se encontró el elemento 'precio-dolar' en el DOM.");
  }
}

/**
 * funcion que renderisa la cantida de usurios registrados en la app
 * @function
 */

function renderUser() {
  let userTotal = dataUsers.length;
  totalUser.textContent = userTotal;
}
renderUser();
/**
 * funcion que renderisa cantida de admin
 * @function
 */
function renderAdmin() {
  const cantidadAdmins = dataUsers.filter((user) => user.admi === true).length;
  totaAdmin.textContent = cantidadAdmins;
}
renderAdmin();

/**
 * funcinon que desactiva el bloque de los inputs para modificar los datos de los usuarios
 * @param {*} btn actualizar
 */
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

/**
 * funcion que actualiza los datos del usuario, name, lastname, emal
 * @param {*} fila
 * @param {*} id
 */
function actualizar(id, fila) {
  // 1. Obtener los nuevos valores de los inputs de la fila
  const nuevoNombre = fila.querySelector(".input-name").value.trim();
  const nuevoApellido = fila.querySelector(".input-lastname").value.trim();
  const nuevoEmail = fila.querySelector(".input-email").value.trim();

  // 2. Buscar el usuario en el array global dataUsers
  const index = dataUsers.findIndex((u) => u.id === id);

  if (!validacionInput(nuevoEmail, emailPattern))
    return mesassege(
      `El correo ingresado no cumple con las caracteristicas`,
      `Error`
    );
  if (index !== -1) {
    dataUsers[index].name = nuevoNombre;
    dataUsers[index].lastName = nuevoApellido;
    dataUsers[index].email = nuevoEmail;

    // 3. Persistencia: Guardar en LocalStorage
    localStorage.setItem("dataUsers", JSON.stringify(dataUsers));
    alertaZen(
      `Los datos del usuario han sido actualizados`,
      `y guardados en el sistema.`
    );

    // 4. Resetear la interfaz
    const inputs = fila.querySelectorAll("input");
    inputs.forEach((input) => {
      input.readOnly = true;
      input.style.color = `grey`;
      input.style.border = `none`;
    });
  }
}

/**
 *funcion que elimina al usuario de la tabala y de la data
 * @param {*} id
 * @param {*} fila
 */
function eliminarUsuario(id, fila) {
  if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

  const idABuscar = String(id).trim();

  // 1. Filtrar la variable global
  window.dataUsers = window.dataUsers.filter(
    (user) => String(user.id).trim() !== idABuscar
  );

  // 2. Guardar en LocalStorage
  localStorage.setItem("dataUsers", JSON.stringify(window.dataUsers));
  alertaZen(`El usuario ha sido removido de la base de datos correctamente.`);

  // 3. ANIMACIÓN Y BORRADO VISUAL
  fila.style.opacity = "0";
  fila.style.transition = "0.3s";

  setTimeout(() => {
    fila.remove();
    // 4. ¡IMPORTANTE! Actualizar los contadores de la interfaz
    renderUser();
    renderAdmin();
    console.log("Eliminado. Quedan:", window.dataUsers.length);
  }, 300);
}

function actualizarAdmin(id, fila) {
  const index = dataUsers.findIndex((u) => String(u.id) === String(id));

  if (index !== -1) {
    dataUsers[index].admi = !dataUsers[index].admi;

    // 3. PERSISTENCIA: Guardamos el cambio en LocalStorage inmediatamente
    localStorage.setItem("dataUsers", JSON.stringify(dataUsers));
  }

  const labelRango = fila.querySelector(".rango"); // Asegúrate de tener esta clase en tu HTML
  if (labelRango) {
    labelRango.textContent = dataUsers[index].admi
      ? "Administrador"
      : "Cliente";
  }

  let rangoTxt = dataUsers[index].admi ? `Administrador` : `Cliente`;

  alertaZen(
    `El rango del usuario ha sido actualizado.`,
    `Ahora es ${rangoTxt}`
  );
}
//Insertar datos en la tabla desktop
dataUsers.forEach((dataUser) => {
  const tablaUser = document.getElementById("users-table-body");
  const trTabla = document.createElement("tr");

  /* function isAdmin() {
    let user = dataUser.admi;

    if (user === false) return `Cliente`;
    if (user === true) return `Administrador`;
  } */

  const textoRangoInicial = dataUser.admi ? "Administrador" : "Cliente";

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
  } "readonly/></td><td class="rango">${textoRangoInicial}</td>
  <td class="content-btn">
  <span class="btn-isAdmin"><i class="fa-solid fa-key"></i></span>
  <span class="btn-elimina"><i class="fa-regular fa-trash-can "></i></span>
  <span class="btn-actualizar" onclick="preEdit(this)"><i class="fa-regular fa-pen-to-square"></i></span>
   <span class="btn-guardar" style="display:none;"><i class="fa-solid fa-check"></i></span>
  </td>`;
  tablaUser.appendChild(trTabla);

  const btnGuardar = trTabla.querySelector(".btn-guardar");
  btnGuardar.addEventListener(`click`, () => {
    actualizar(dataUser.id, trTabla);
  });

  const btnEliminar = trTabla.querySelector(".btn-elimina");
  btnEliminar.addEventListener("click", () => {
    // Pasamos el ID real y la fila completa (trTabla)
    eliminarUsuario(dataUser.id, trTabla);
  });

  const btnIsAdmin = trTabla.querySelector(".btn-isAdmin");
  btnIsAdmin.addEventListener(`click`, () => {
    actualizarAdmin(dataUser.id, trTabla);
  });
});

//Insertar datos en la tabla movil
dataUsers.forEach((dataUser) => {
  const tablaUserMovil = document.getElementById("tablaMovil");
  const row = document.createElement("div");
  row.classList.add("row");

  const textAdmin = dataUser.admi ? `Administrador` : "Cliente";
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
                <div class="contenido">${textAdmin}</div>
              </div>
              <div class="colum">
                <div class="header">Accion:</div>
                <div class="contenido content-btn">
                 <span class="btn-isAdmin"><i class="fa-solid fa-key"></i></span>
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

  const btnEliminar = row.querySelector(".btn-elimina");
  btnEliminar.addEventListener("click", () => {
    // Pasamos el ID real y la fila completa (trTabla)
    eliminarUsuario(dataUser.id, row);
  });

  const btnIsAdmin = row.querySelector(".btn-isAdmin");
  btnIsAdmin.addEventListener(`click`, () => {
    actualizarAdmin(dataUser.id, row);
  });
});

/* modal */
const modal = document.getElementById("miModal");
const btnOpenModal = document.getElementById("openModal");
const btnCloseModal = document.querySelector(".close-btn");

//btn abrial modal
btnOpenModal.addEventListener(`click`, () => {
  modal.style.display = `flex`;
});

//btn Cerrar modal
btnCloseModal.addEventListener(`click`, () => {
  modal.style.display = `none`;
});

//cierra la modal a escuchar un click fuera de la caja
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = `none`;
  }
};

/* reguistro de usuario creado por el Admi */
document
  .getElementById("registroForm")
  .addEventListener(`submit`, async (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("dataUsers")) || [];

    const name = document.getElementById("nombre").value.trim();
    const lastName = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const confirmPass = document.getElementById("confirmPass").value.trim();

    if (pass !== confirmPass) {
      alertaZen("Las contraseñas no coinciden.", ``, `warning`);
      return;
    }

    const exiteEmial = dataUsers.some((usuario) => usuario.email === email);

    if (exiteEmial)
      return alertaZen(
        `El correo ingresado ya excite en la base de datos`,
        ``,
        `warning`
      );

    let passSegura = await hashPassaword(pass);

    if (!validacionInput(pass, passPattern))
      return alertaZen(`las clave no cumple con los requisitos`, ``, `warning`);

    let newUser = {
      id: Date.now(),
      admi: false,
      name: name,
      lastName: lastName,
      email: email,
      passwod: passSegura,
    };

    data.push(newUser);
    localStorage.setItem("dataUsers", JSON.stringify(data));
    alertaZen(`El usuario creado con exsito`);

    document.getElementById("registroForm").reset();
  });
