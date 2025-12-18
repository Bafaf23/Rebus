import { hashPassaword } from "../hash/hash.js";

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

    let passawordSegura = await hashPassaword(rawPassword);

    const newUser = {
      id: Date.now(),
      name: nameInput.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      passwod: passawordSegura,
      admi: false,
    };

    if (
      newUser.name === "" ||
      newUser.lastName === "" ||
      newUser.email === "" ||
      newUser.passwod === ""
    ) {
      return mesassege(`los campos no pueden estar vacios`, `Campos vacios`);
    }

    const exiteEmial = registerData.some(
      (usuario) => usuario.email === newUser.email
    );

    if (exiteEmial)
      return mesassege(
        `El correo electronico ya esta registrado`,
        `Campos duplicados`
      );

    registerData.push(newUser);

    console.log(`Registro exitiso`, registerData);
    localStorage.setItem("dataUsers", JSON.stringify(registerData));

    nameInput.value = "";
    lastName.value = "";
    email.value = "";
    passwod.value = "";

    mesassege(`Ya puedes usar el servicio`, `Registro Exitoso`);
  });
}

window.addEventListener(`load`, () => {
  const fondos = [
    `https://cdn.sanity.io/images/atvntylo/production/f65e9c974698d16f2b7195a079d99fd4721a5f8c-1080x720.webp?w=3840&q=65&fit=clip&auto=format`,
    `https://lagranaldea.com/wp-content/uploads/2021/04/21-04-2021-CCS.jpg`,
    `https://images.unsplash.com/photo-1714594923299-e915b7d71701?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FyYWNhc3xlbnwwfHwwfHx8MA%3D%3D`,
    `https://images.pexels.com/photos/4148187/pexels-photo-4148187.jpeg?cs=srgb&dl=pexels-walcouyi-4148187.jpg&fm=jpg`,
  ];

  let fondoRando = Math.floor(Math.random() * fondos.length);
  const fondoSelct = fondos[fondoRando];

  let pantalla = document.querySelector(".content-form ");
  pantalla.style.backgroundImage = `url(${fondoSelct})`;
  pantalla.style.backgroundSize = "cover";
  pantalla.style.backgroundAttachment = "fixed";
});
