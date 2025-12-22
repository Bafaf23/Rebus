/**
 * funcion que encrita la clave del usuario
 *
 * @param {*} passwod
 * @returns clave encritapda
 */

export async function hashPassaword(passwod) {
  const encoder = new TextEncoder();
  const data = encoder.encode(passwod);
  // Genera el hash usando el algoritmo SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  // Convierte el resultado a un string hexadecimal para guardarlo
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
