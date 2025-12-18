export async function getData(url) {
  try {
    const response = await fetch(url);
    let data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(`Ops!, algo salio mal`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
