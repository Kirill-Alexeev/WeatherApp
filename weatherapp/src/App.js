import { useEffect, useState } from "react";
import WeatherApi from "./WeatherApi";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";

function App() {
  const weatherApi = new WeatherApi();
  let [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherData = await weatherApi.getCurrentWeather(55.7522, 37.6156);
        setCurrentWeather(weatherData);
      } catch (error) {
        console.error("Ошибка при загрузке данных о погоде:", error);
        throw error;
      }
    };

    fetchWeather();
  });

  return (
    <>
      <Header />
      <main className="main">
        <div className="main__wrap">
          <CurrentWeather currentWeather={currentWeather} />
        </div>
      </main>
    </>
  );
}

export default App;
