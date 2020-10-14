import React, { useState, useEffect } from "react";
import axios from "axios";
import DayWeather from "../../components/DayWeather/DayWeather";
import { getWeekday } from "../../helpers/helpers";

const FindBestDay = () => {
  const forecast = "https://api.blika.is/GetBlikaForecast24klst/";
  const [loading, setLoading] = useState(true);
  const [resort, setResort] = useState([]);
  const [id, setId] = useState(988);
  const [bestDay, setBestDay] = useState({});
  const [weekday, setWeekday] = useState("");
  const [loaded, setLoaded] = useState(false); // Loading spinner

  useEffect(() => {
    async function fetchWeather() {
      try {
        const weather = await axios.get(forecast + id + "/");
        setLoading(false);
        setResort(weather.data.slice(0, 7));
        findBestDay(weather.data.slice(0, 7));
      } catch {}
    }
    fetchWeather();
  }, [id]);

  const findBestDay = (weatherArray) => {
    // sunny = 0 points
    // clear = 0 points
    // mostlycloudy = 1 points
    // partlycloudy = 1 points
    // cloudy = 2 point
    // chanceflurries = 4 points;
    // chancesnow = 5 points
    // snow = 7 points
    // rain = 9 points
    // fog = 11 points
    // else = 13 points

    var currBestDay = [1000, 1000, 0]; // [conditions, wind, arrayPosition of day in weatherArray]

    weatherArray.forEach(function (arrayItem) {
      //var temp = arrayItem.t2; // int
      var conditions = 0; // Is it sunny, rain etc? Then give it value
      var wind = arrayItem.f10;
      if (arrayItem.merki === "sunny" || arrayItem.merki === "clear") {
        conditions = 0;
      } else if (
        arrayItem.merki === "mostlycloudy" ||
        arrayItem.merki === "partlycloudy"
      ) {
        conditions = 1;
      } else if (arrayItem.merki === "cloudy") {
        conditions = 2;
      } else if (arrayItem.merki === "chanceflurries") {
        conditions = 4;
      } else if (arrayItem.merki === "chancesnow") {
        conditions = 5;
      } else if (arrayItem.merki === "snow") {
        conditions = 7;
      } else if (arrayItem.merki === "rain") {
        conditions = 9;
      } else if (arrayItem.merki === "fog") {
        conditions = 11;
      } else {
        conditions = 13; // If unknown/new conditions sign
      }

      // If the conditions are better and the wind speed is below 10 m/s
      if (currBestDay[0] > conditions && wind < 10) {
        currBestDay = [conditions, wind, weatherArray.indexOf(arrayItem)];
      } else if (currBestDay[0] === conditions && currBestDay[1] > wind) {
        currBestDay = [conditions, wind, weatherArray.indexOf(arrayItem)];
      }
      // Else do nothing and there is no good day so far this week
    });

    setBestDay(weatherArray[currBestDay[2]]);
    let weekdayInt = new Date(
      weatherArray[currBestDay[2]].dags_spar
    ).getUTCDay();
    setWeekday(getWeekday(weekdayInt));
    setLoaded(true);
  };

  const handleResortChange = (e) => {
    setId(e.target.value);
  };

  return (
    <>
      <div className="selectResort">
        <p>Besta veðrið í vikunni</p>
        <select onChange={(e) => handleResortChange(e)} defaultValue={"988"}>
          <option value="149">Bláfjöll</option>
          <option value="987">Böggvisstaðafjall</option>
          <option value="988">Hlíðarfjall</option>
          <option value="924">Oddsskarð</option>
          <option value="985">Skarðsdalur</option>
          <option value="989">Stafdalur</option>
          <option value="984">Tindastóll</option>
          <option value="986">Tindaöxl</option>
          <option value="983">Tungudalur</option>
        </select>
      </div>
      {loaded ? (
        <>
          <p>{weekday}</p>
          <DayWeather best={bestDay} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FindBestDay;
