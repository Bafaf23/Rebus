import { getAvatar } from "../dashboard/dashboard.js";

const avatar = document.getElementById("avatar-perfil");
const userName = document.getElementById("welcome-perfil");

let user = JSON.parse(localStorage.getItem("userSession"));

userName.textContent = `${user.name}`;
