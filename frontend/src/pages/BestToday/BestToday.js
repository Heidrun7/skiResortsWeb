import React, { useState, useEffect } from "react";
import axios from "axios";
import DayWeather from "../../components/DayWeather/DayWeather";
import { getMonthString, findBest } from "../../helpers/helpers";

const FindBestToday = () => {
  const forecast = "https://api.blika.is/GetBlikaForecast24klst/";
  const [loaded, setLoaded] = useState(true);
  const [allResorts, setAllResorts] = useState([]);
  const [bestResort, setBestResort] = useState({});
  const [selectedDay, setSelectedDay] = useState(0);
  const skiResorts = [149, 704, 983, 984, 985, 986, 987, 988, 989, 924];

  let today = new Date();
  let month = getMonthString(today.getMonth());
  let dayString = today.getDate() + ". " + month + " " + today.getFullYear();

  useEffect(() => {
    // Fetch weather data for one resort, then slice only data for the selected day
    async function fetchWeather(resortId) {
      try {
        const weather = await axios.get(forecast + resortId + "/");
        return weather.data.slice(selectedDay, selectedDay + 1);
      } catch {}
    }

    // Get weather data for all the resorts
    async function getAllResorts() {
      let tmpResorts = [];
      for (var i = 0; i < skiResorts.length; i++) {
        await fetchWeather(skiResorts[i]).then(
          (result) => (tmpResorts = [...tmpResorts, result]) // Add to the list of resorts
        );
      }
      setAllResorts(tmpResorts);
    }

    getAllResorts();
  }, [selectedDay]); // Update when the selected day is changed

  useEffect(() => {
    findBestResort();
  }, [allResorts]); // Update when the list of all resorts updates

  const findBestResort = () => {
    let currBestResort = findBest(allResorts, "resort");

    setBestResort(allResorts[currBestResort[3]]);
    setLoaded(true);
  };

  return (
    <>
      <h3>Besta veðrið í dag</h3>
      {dayString}
      {loaded ? (
        <>
          {bestResort && bestResort[0] ? (
            <>
              <h4 className="resort">{bestResort[0].nafn}</h4>
              <DayWeather day={bestResort[0]} />
            </>
          ) : (
            <></>
          )}{" "}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default FindBestToday;
