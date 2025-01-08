import { fetchWeatherApi } from "openmeteo";

class WeatherApi {
  roundToOneDecimal(value) {
    return Math.round(value * 10) / 10;
  }

  convertPressure(pressure) {
    return Math.round(pressure * 0.75006375541921);
  }

  async getCurrentWeather(latitude, longitude) {
    try {
      const params = {
        latitude,
        longitude,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "is_day",
          "precipitation",
          "weather_code",
          "cloud_cover",
          "pressure_msl",
          "wind_speed_10m",
        ],
        timeformat: "unixtime",
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];
      const current = response.current();

      const utcOffsetSeconds = response.utcOffsetSeconds();

      return {
        date: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temp: this.roundToOneDecimal(current.variables(0).value()),
        humidity: current.variables(1).value(),
        isDay: current.variables(2).value(),
        precipitation: this.roundToOneDecimal(current.variables(3).value()),
        weatherCode: current.variables(4).value(),
        cloudiness: current.variables(5).value(),
        pressure: this.convertPressure(current.variables(6).value()),
        windSpeed: this.roundToOneDecimal(current.variables(7).value()),
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
          "precipitation_probability",
          "weather_code",
          "pressure_msl",
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
        temp: this.roundToOneDecimal(hourly.variables(0).valuesArray()),
        humidity: hourly.variables(1).valuesArray(),
        precipitation: this.roundToOneDecimal(hourly.variables(2).valuesArray()),
        weatherCode: hourly.variables(3).valuesArray(),
        pressure: this.convertPressure(hourly.variables(4).valuesArray()),
        cloudiness: hourly.variables(5).valuesArray(),
        windSpeed: this.roundToOneDecimal(hourly.variables(6).valuesArray()),
      };
    } catch (error) {
      console.error("Ошибка при получении почасового прогноза:", error);
      throw error;
    }
  }
}

export default WeatherApi;
