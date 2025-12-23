import { mesassege } from "../register/register.js";
import { hashPassaword } from "../hash/hash.js";
import { validacionInput, emailPattern } from "../regex/regex.js";
import { alertaZen } from "../SweetAlert/alert.js";

let userData = JSON.parse(localStorage.getItem("dataUsers")) || [];

const loginbtn = document.getElementById("loginBtn");

if (loginbtn) {
  loginbtn.addEventListener(`click`, async (e) => {
    e.preventDefault();

    const emilInput = document.getElementById("UserEmail");
    const passInput = document.getElementById("pasUser");

    const emial = emilInput.value.trim();
    const pass = passInput.value;

    //comparando la calve del usurio con la encritada almacenada en la base de datos
    const passawordSegura = await hashPassaword(pass);

    //comporvando los campos vacios
    if (emial === `` || pass === ``) {
      return alertaZen(
        `Compla los campos para cuntinuar`,
        `Los campos no pueden estar vacios`,
        `warning`
      );
    }

    //buscando al usurio por el emal
    const user = userData.find((u) => u.email === emial);

    if (!validacionInput(emial, emailPattern)) {
      alertaZen(`Formato de correo invalido`, `Correo`, `warning`);
    }

    //comoprovaciones
    if (!user)
      return alertaZen(
        `El usuario no esta registrado`,
        `Registrate`,
        `warning`
      );

    if (user && user.passwod === passawordSegura) {
      localStorage.setItem("userSession", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = `../dashboard.html`;
      }, 2000);
    } else {
      alertaZen(`Usuario o contrasena errada`, `Inténtalo de nuevo.`, `error`);
    }
  });
}

//Mostar pass
const btnMostarPass = document.getElementById("mostarPass");
btnMostarPass.addEventListener(`click`, () => {
  const passInput = document.getElementById("pasUser");
  let typeInput = passInput.type;

  if (typeInput === `password`) {
    passInput.type = `text`;
  } else {
    passInput.type = `password`;
  }
});
