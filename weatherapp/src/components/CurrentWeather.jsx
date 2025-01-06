import React from "react";

function CurrentWeather(props) {
  const { currentWeather } = props;

  if (!currentWeather) {
    return <div>Загрузка данных...</div>;
  }

  const stats = [
    { title: "Влажность", value: currentWeather.humidity },
    { title: "Давление", value: currentWeather.pressure },
    { title: "Облачность", value: currentWeather.cloudiness },
    { title: "Осадки", value: currentWeather.precipitation },
    { title: "Ветер", value: currentWeather.windSpeed },
  ];

  return (
    <div className="current">
      <div className="current__head">
        <h2 className="current__place">Москва</h2>
        <p className="current__date">{currentWeather.date.toLocaleString()}</p>
      </div>
      <div className="current__weather">
        <img src="" alt="Иконка погоды" className="current__img" />
        <div className="current__temp">
          <p className="current__temperature">{currentWeather.temp}</p>
          <p className="current__description"></p>
        </div>
      </div>
      <ul className="current__stats">
        {stats.map((stat, index) => {
          return (
            <li className="current__stat" key={index}>
              <div className="current__stat-left">
                <img src="" alt="" className="current__icon" />
                <p className="current__desc">{stat.title}</p>
              </div>
              <p className="current__value">{stat.value}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CurrentWeather;
