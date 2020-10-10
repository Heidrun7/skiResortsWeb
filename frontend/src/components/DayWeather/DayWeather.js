import React from "react";

const DayWeather = (props) => {
  const day = props.day;
  const conditions = day.merki;
  const temp = day.t2 + "°C";
  const wind = day.f10 + " m/s";
  const weekdayInt = new Date(day.dags_spar).getUTCDay(); // 0 = Sunday, 6 = Saturday

  let weekday = "";
  if (weekdayInt === 0) {
    weekday = "sunnudagur";
  } else if (weekdayInt === 1) {
    weekday = "mánudagur";
  } else if (weekdayInt === 2) {
    weekday = "þriðjudagur";
  } else if (weekdayInt === 3) {
    weekday = "miðvikudagur";
  } else if (weekdayInt === 4) {
    weekday = "fimmtudagur";
  } else if (weekdayInt === 5) {
    weekday = "föstudagur";
  } else if (weekdayInt === 6) {
    weekday = "laugardagur";
  }
  console.log("WEEKDAY: ", weekdayInt, ": ", weekday);
  return (
    <>
      <p>{weekday}</p>
      <p>{conditions}</p>
      <p>{temp}</p>
      <p>{wind}</p>
    </>
  );
};

export default DayWeather;
