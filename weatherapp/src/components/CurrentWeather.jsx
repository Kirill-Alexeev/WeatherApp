import React from "react";

function CurrentWeather(props) {
  const { currentWeather } = props;

  if (!currentWeather) {
    return <div>Загрузка данных...</div>;
  }

  const stats = [
    { title: "Влажность", value: currentWeather.humidity, icon: '', symbol: '%'},
    { title: "Давление", value: currentWeather.pressure, icon: '', symbol: 'мм рт. ст.' },
    { title: "Облачность", value: currentWeather.cloudiness, icon: '', symbol: '%' },
    { title: "Осадки", value: currentWeather.precipitation, icon: '', symbol: 'мм' },
    { title: "Ветер", value: currentWeather.windSpeed, icon: '', symbol: 'км/ч' },
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
          <p className="current__description">{currentWeather.weatherCode}</p>
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
              <p className="current__value">{stat.value}{stat.symbol}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CurrentWeather;
