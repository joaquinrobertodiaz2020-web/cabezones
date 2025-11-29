// /src/logic/weather.js
export async function getWeather() {
  const API_KEY = "fa0a414f61904466368bede3d19ec1b9"; // Tu API key
  const CITY = "Buenos Aires"; // Cambiá la ciudad si querés
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(URL);
    const data = await res.json();
    return data.weather[0].main; // Ejemplo: Clear, Clouds, Rain, Thunderstorm
  } catch (e) {
    console.error("Error obteniendo clima:", e);
    return "Clear"; // fallback por si falla la API
  }
}
