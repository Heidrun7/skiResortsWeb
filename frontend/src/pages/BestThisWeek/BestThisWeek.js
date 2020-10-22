import React, { useState, useEffect } from "react";
import axios from "axios";
import DayWeather from "../../components/DayWeather/DayWeather";
import { getWeekday, findBest } from "../../helpers/helpers";

const FindBestDay = (props) => {
  const id = props.id;
  const select = props.select;
  const forecast = "https://api.blika.is/GetBlikaForecast24klst/";
  const [loading, setLoading] = useState(true);

  const [bestDay, setBestDay] = useState({});
  const [weekday, setWeekday] = useState("");
  const [loaded, setLoaded] = useState(false); // Loading spinner

  useEffect(() => {
    async function fetchWeather() {
      try {
        const weather = await axios.get(forecast + id + "/");
        setLoading(false);
        findBestDay(weather.data.slice(0, 7)); // Only use the first 7 days
      } catch {}
    }
    fetchWeather();
  }, [id]);

  const findBestDay = (weatherArray) => {
    let currBestDay = findBest(weatherArray, "week");

    setBestDay(weatherArray[currBestDay[3]]);
    let weekdayInt = new Date(
      weatherArray[currBestDay[3]].dags_spar
    ).getUTCDay();
    setWeekday(getWeekday(weekdayInt));
    setLoaded(true);
  };

  return (
    <>
      <div className="selectResort">
        <h3>Besta veðrið í vikunni</h3>
        {select}
      </div>
      {loaded ? (
        <>
          <h4>{weekday}</h4>
          <DayWeather day={bestDay} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FindBestDay;
