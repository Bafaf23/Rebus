/**
 *funcion que valida las entradas de informacion del usuario
 * @param {*} value
 * @param {*} regex
 * @returns
 */
export function validacionInput(value, regex) {
  return regex.test(value);
}

//Pattern
export const userPattern =
  /^[a-zA-ZáéíóúñÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑ0-9_]{5,29}$/;
export const userLastPattern =
  /^[a-zA-ZáéíóúñÁÉÍÓÚÑ][a-zA-ZáéíóúñÁÉÍÓÚÑ0-9_]{5,29}$/;
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
