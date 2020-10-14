import React from "react";

const DayWeather = (props) => {
  const best = props.best;
  const conditions = best.merki;
  const temp = best.t2 + "°C";
  const wind = best.f10 + " m/s";

  return (
    <>
      <p>{conditions}</p>
      <p>{temp}</p>
      <p>{wind}</p>
    </>
  );
};

export default DayWeather;
