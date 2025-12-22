import { mesassege } from "../register/register.js";
import { hashPassaword } from "../hash/hash.js";

let userData = JSON.parse(localStorage.getItem("dataUsers")) || [];
console.log(userData);

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
      return mesassege(`Los campos no pueden estar vacios`, `Campos vacios`);
    }
    //buscando al usurio por el emal
    const user = userData.find((u) => u.email === emial);

    //comoprovaciones
    if (!user) return mesassege(`El usuario no esta registrado`, `Registrate`);

    if (user && user.passwod === passawordSegura) {
      localStorage.setItem("userSession", JSON.stringify(user));
      setTimeout(() => {
        window.location.href = `../dashboard.html`;
      }, 2000);
    } else {
      mesassege(`Usuario o contrasena errada`, `Error de acceso`);
    }
  });
}
