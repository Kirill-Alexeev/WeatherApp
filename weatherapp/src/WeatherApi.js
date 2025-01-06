import { fetchWeatherApi } from "openmeteo";

class WeatherApi {
  async getCurrentWeather(latitude, longitude) {
    try {
      const params = {
        latitude,
        longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "is_day",
          "precipitation",
          "rain",
          "snowfall",
          "weather_code",
          "cloud_cover",
          "surface_pressure",
          "wind_speed_10m",
        ],
        timeformat: "unixtime",
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const current = response.current();

      return {
        date: new Date(current.time * 1000),
        temp: current.variables(0).value(),
        humidity: current.variables(1).value(),
        apparentTemp: current.variables(2).value(),
        isDay: current.variables(3).value(),
        precipitation: current.variables(4).value(),
        rain: current.variables(5).value(),
        snowfall: current.variables(6).value(),
        weatherCode: current.variables(7).value(),
        pressure: current.variables(8).value(),
        cloudiness: current.variables(9).value(),
        windSpeed: current.variables(10).value(),
      };
    } catch (error) {
      console.error("Ошибка при получении текущей погоды:", error);
      throw error;
    }
  }

  async getHourlyWeather(latitude, longitude) {
    try {
      const params = {
        latitude,
        longitude,
        hourly: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "precipitation_probability",
          "rain",
          "snowfall",
          "weather_code",
          "surface_pressure",
          "cloud_cover",
          "wind_speed_10m",
        ],
        timeformat: "unixtime",
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const hourly = response.hourly();

      return {
        time: hourly.time.map((timestamp) => new Date(timestamp * 1000)),
        temp: hourly.temperature_2m,
        humidity: hourly.relative_humidity_2m,
        apparentTemp: hourly.apparent_temperature,
        precipitation: hourly.precipitation_probability,
        rain: hourly.rain,
        snowfall: hourly.snowfall,
        weatherCode: hourly.weather_code.map(this.getWeatherDescription),
        pressure: hourly.surface_pressure,
        cloudiness: hourly.cloud_cover,
        windSpeed: hourly.wind_speed_10m,
      };
    } catch (error) {
      console.error("Ошибка при получении почасового прогноза:", error);
      throw error;
    }
  }
}

export default WeatherApi;
