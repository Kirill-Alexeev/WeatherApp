import axios from "axios";

class WeatherApi {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "https://api.gismeteo.net/v2/weather/current",
      headers: {
        "X-Gismeteo-Token": "56b30cb255.3443075",
      },
    });
  }

  async getCurrentWeather(placeId) {
    try {
      const response = await this.apiClient.get(`${placeId}`);

      const data = response.data;
      // const current = data.current;

      return {
        date: data.date.local,
        tempAir: data.temperature.air,
        tempComfort: data.temperature.comfort,
        desc: data.description.full,
        humidity: data.humidity.percent,
        pressure: data.pressure.mm_hg_atm,
        cloudiness: data.cloudiness.type,
        precipitation: data.precipitation,
        wind: {
          speed: data.wind.speed.m_s,
          direction: data.wind.direction.scale_8,
        },
        icon: data.icon,
      };
    } catch (error) {
      console.error("Ошибка при получении текущей погоды:", error);
      throw error;
    }
  }
}

export default WeatherApi;
