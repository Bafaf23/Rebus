import { hashPassaword } from "../hash/hash.js";
import { validacionInput, emailPattern, passPattern } from "../regex/regex.js";
import { alertaZen } from "../SweetAlert/alert.js";

/* accediendo a los elementos el DOM */
const contentAlert = document.getElementById("alert");
const register = document.getElementById("register");

export function mesassege(mensaje, titel) {
  let alert = document.createElement("div");
  alert.innerHTML = `<div class="alert animate__animated animate__fadeInLeft">
        <div class="ico">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="info-alert">
          <div>${titel}</div>
          <div>
            ${mensaje}
          </div>
        </div>
      </div>`;

  contentAlert.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 4000);
}

/* aray donde amacenaremos a los usuarios */
let registerData = JSON.parse(localStorage.getItem("dataUsers")) || [];

if (register) {
  register.addEventListener(`click`, async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("nameRegister");
    const lastName = document.getElementById("lastNameRegister");
    const email = document.getElementById("emailRegister");
    const passwod = document.getElementById("passwordRegister");

    let rawPassword = passwod.value.trim();
    let rawLastName = lastName.value.trim();
    let rawEmail = email.value.trim();
    let rawName = nameInput.value.trim();

    if (
      rawPassword === "" ||
      rawLastName === "" ||
      rawEmail === "" ||
      rawName === ""
    ) {
      return alertaZen(`Opss!`, `Los campos no pueden estar vacios`, `error`);
    }

    if (!validacionInput(rawEmail, emailPattern)) {
      return alertaZen(
        `Opss!`,
        `El formato de la emial no es valido`,
        `warning`
      );
    }
    if (!validacionInput(rawPassword, passPattern)) {
      return alertaZen(
        `Opsss!`,
        `La comtraseña no comple con los requisitos`,
        "warning"
      );
    }

    const exiteEmial = registerData.some(
      (usuario) => usuario.email === rawEmail
    );
    if (exiteEmial)
      return alertaZen(
        "Este correo ya está registrado.",
        "¿Tal vez querías iniciar sesión?",
        "warning"
      );

    let passawordSegura = await hashPassaword(rawPassword);

    const newUser = {
      id: Date.now(),
      name: rawName,
      lastName: rawLastName,
      email: rawEmail,
      passwod: passawordSegura,
      admi: false,
    };

    registerData.push(newUser);

    console.log(`Registro exitiso`, registerData);
    localStorage.setItem("dataUsers", JSON.stringify(registerData));

    nameInput.value = "";
    lastName.value = "";
    email.value = "";
    passwod.value = "";

    alertaZen(
      "¡Bienvenido!",
      "Tu cuenta en REBO ha sido creada con éxito.",
      "success"
    );
  });
}

window.addEventListener(`load`, () => {
  const fondos = [
    `https://lagranaldea.com/wp-content/uploads/2021/04/21-04-2021-CCS.jpg`,
    `https://images.unsplash.com/photo-1714594923299-e915b7d71701?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyYWNhc3xlbnwwfHwwfHx8MA%3D%3D`,
    `https://images.pexels.com/photos/4148187/pexels-photo-4148187.jpeg?cs=srgb&dl=pexels-walcouyi-4148187.jpg&fm=jpg`,
    `https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1nfGVufDB8fDB8fHww`,
    `https://walpaper.es/wallpaper/2017/04/imagenes-de-paisajes-relajantes.jpg`,
  ];

  let fondoRando = Math.floor(Math.random() * fondos.length);
  const fondoSelct = fondos[fondoRando];

  let pantalla = document.querySelector(".content-form ");
  pantalla.style.backgroundImage = `url(${fondoSelct})`;
  pantalla.style.backgroundSize = "cover";
  pantalla.style.backgroundAttachment = "fixed";
});

const btnMostarPass = document.getElementById("mostarPass");
if (btnMostarPass) {
  btnMostarPass.addEventListener(`click`, () => {
    const passInput = document.getElementById("passwordRegister");
    let typeInput = passInput.type;

    if (typeInput === `password`) {
      passInput.type = `text`;
    } else {
      passInput.type = `password`;
    }
  });
}
