import React from "react";

function CurrentWeather(props) {
  const { currentWeather } = props;

  if (!currentWeather) {
    return <div>Загрузка данных...</div>;
  }

  function getCloudinessDescription(cloudiness) {
    if (cloudiness === 0) {
      return "Ясно";
    } else if (cloudiness >= 1 && cloudiness <= 30) {
      return "Незначительная";
    } else if (cloudiness >= 31 && cloudiness <= 60) {
      return "Средняя";
    } else if (cloudiness >= 61 && cloudiness <= 95) {
      return "Сильная";
    } else if (cloudiness >= 96 && cloudiness <= 100) {
      return "Сплошная";
    }
  }

  function getDescriptionOfWeather(weatherCode) {
    const descriptions = {
      0: "Без осадков",
      1: "Преимущественно ясно",
      2: "Переменная облачность",
      3: "Пасмурно",
      45: "Туман",
      48: "Осаждающийся инейный туман",
      51: "Легкая морось",
      53: "Умеренная морось",
      55: "Плотная морось",
      56: "Легкая морозная морось",
      57: "Плотная морозная морось",
      61: "Небольшой дождь",
      63: "Умеренный дождь",
      65: "Сильный дождь",
      66: "Небольшой ледяной дождь",
      67: "Сильный ледяной дождь",
      71: "Небольшой снегопад",
      73: "Умеренный снегопад",
      75: "Сильный снегопад",
      77: "Град",
      80: "Слабый дождевой ливень",
      81: "Умеренный дождевой ливень",
      82: "Сильный дождевой ливень",
      85: "Небольшой снегопад",
      86: "Сильный снегопад",
      95: "Гроза",
      96: "Гроза с дождём",
      97: "Гроза с сильным дождём",
    };

    return descriptions[weatherCode];
  }

  const stats = [
    {
      title: "Влажность",
      value: currentWeather.humidity,
      icon: "",
      symbol: "%",
    },
    {
      title: "Давление",
      value: currentWeather.pressure,
      icon: "",
      symbol: "мм рт. ст.",
    },
    {
      title: "Облачность",
      value: getCloudinessDescription(currentWeather.cloudiness),
      icon: "",
      symbol: "",
    },
    {
      title: "Осадки",
      value: currentWeather.precipitation,
      icon: "",
      symbol: "мм",
    },
    {
      title: "Ветер",
      value: currentWeather.windSpeed,
      icon: "",
      symbol: "км/ч",
    },
  ];

  const formattedDate = currentWeather.date.toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <div className="current">
      <div className="current__head">
        <h2 className="current__place">Москва</h2>
        <p className="current__date">{capitalizeFirstLetter(formattedDate)}</p>
      </div>
      <div className="current__weather">
        <img src="" alt="Иконка погоды" className="current__img" />
        <div className="current__temp">
          <p className="current__temperature">
            {currentWeather.temp}
            <span className="celcius">°C</span>
          </p>
          <p className="current__description">
            {getDescriptionOfWeather(currentWeather.weatherCode)}
          </p>
        </div>
      </div>
      <ul className="current__stats">
        {stats.map((stat, index) => {
          return (
            <li className="current__stat" key={index}>
              <div className="current__stat-left">
                <img src={stat.icon} alt="" className="current__icon" />
                <p className="current__desc">{stat.title}</p>
              </div>
              <p className="current__value">
                {stat.value}
                {stat.symbol}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CurrentWeather;
