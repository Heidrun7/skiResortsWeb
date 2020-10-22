import React, { useState, useEffect } from "react";
import axios from "axios";
import DayWeather from "../../components/DayWeather/DayWeather";
import { findBest, getWeekday } from "../../helpers/helpers";
import "./FullWeek.css";

const FullWeek = () => {
  const forecast = "https://api.blika.is/GetBlikaForecast24klst/";
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState([]);
  const [id, setId] = useState(988);
  const [loaded, setLoaded] = useState(false); // Loading spinner

  useEffect(() => {
    async function fetchWeather() {
      try {
        const weather = await axios.get(forecast + id + "/");
        setLoading(false);
        setWeek(weather.data.slice(0, 7)); // Only use the first 7 days
      } catch {}
    }
    fetchWeather();
  }, [id]);

  const handleResortChange = (e) => {
    setId(e.target.value);
  };

  let bestDayIndex = findBest(week, "week")[3]; // Get the day index of the best day this week

  // Maps over the whole week and displays each day's forecast
  let weekData = <></>;
  if (week.length) {
    weekData = week.map((data, index) => {
      let weekdayInt = new Date(data.dags_spar).getUTCDay();
      let weekday = getWeekday(weekdayInt);
      let color = "";
      if (bestDayIndex === index) {
        // Set a color for the best day only
        color = "powderblue";
      }
      return (
        <div className="singleDay" style={{ backgroundColor: color }}>
          {weekday}
          <DayWeather day={data} />
        </div>
      );
    });
  }

  return (
    <div className="weekContainer">
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
      <div className="week">{weekData}</div>
    </div>
  );
};

export default FullWeek;
