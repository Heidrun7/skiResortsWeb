import React from "react";
import "./DayWeather.css";

import sunny from "../../images/icons/sunny.png";
import clear from "../../images/icons/clear.png";
import mostlycloudy from "../../images/icons/mostlycloudy.png";
import partlycloudy from "../../images/icons/partlycloudy.png";
import cloudy from "../../images/icons/cloudy.png";
import chanceflurries from "../../images/icons/chanceflurries.png";
import chancesnow from "../../images/icons/chancesnow.png";
import snow from "../../images/icons/snow.png";
import rain from "../../images/icons/rain.png";
import fog from "../../images/icons/fog.png";
import unknown from "../../images/icons/unknown.png";

const DayWeather = (props) => {
  const day = props.day;
  const conditions = day.merki;
  const temp = Math.round(day.t2) + "°C";
  const wind = day.f10.toFixed(0) + " m/s";

  let icon = unknown;
  if (conditions === "sunny") {
    icon = sunny;
  } else if (conditions === "clear") {
    icon = clear;
  } else if (conditions === "mostlycloudy") {
    icon = mostlycloudy;
  } else if (conditions === "partlycloudy") {
    icon = partlycloudy;
  } else if (conditions === "cloudy") {
    icon = cloudy;
  } else if (conditions === "chanceflurries") {
    icon = chanceflurries;
  } else if (conditions === "chancesnow") {
    icon = chancesnow;
  } else if (conditions === "snow") {
    icon = snow;
  } else if (conditions === "rain") {
    icon = rain;
  } else if (conditions === "fog") {
    icon = fog;
  }

  return (
    <div className="day">
      <div className="iconContainer">
        <img src={icon} alt={conditions} width="70rem"></img>
      </div>
      <div className="temp">{temp}</div>
      <div className="wind">{wind}</div>
    </div>
  );
};

export default DayWeather;
