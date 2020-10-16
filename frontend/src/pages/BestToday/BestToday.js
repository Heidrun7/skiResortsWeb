import React, { useState, useEffect } from "react";
import axios from "axios";
import DayWeather from "../../components/DayWeather/DayWeather";
import { getMonthString } from "../../helpers/helpers";

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
    var currBestResort = [1000, 1000, 0]; // [conditions, wind, arrayPosition of day in weatherArray]

    allResorts.forEach(function (arrayItem) {
      let currResort = arrayItem[0];
      var conditions = 0; // Is it sunny, rain etc? Then give it value
      var wind = currResort.f10;

      if (currResort.merki === "sunny" || currResort.merki === "clear") {
        conditions = 0;
      } else if (
        currResort.merki === "mostlycloudy" ||
        currResort.merki === "partlycloudy"
      ) {
        conditions = 1;
      } else if (currResort.merki === "cloudy") {
        conditions = 2;
      } else if (currResort.merki === "chanceflurries") {
        conditions = 4;
      } else if (currResort.merki === "chancesnow") {
        conditions = 5;
      } else if (currResort.merki === "snow") {
        conditions = 7;
      } else if (currResort.merki === "rain") {
        conditions = 9;
      } else if (currResort.merki === "fog") {
        conditions = 11;
      } else {
        conditions = 13; // If unknown/new conditions sign
      }

      // If the conditions are better
      // if (currBestResort[0] > conditions && wind < 10) { and the wind speed is below 10 m/s
      if (currBestResort[0] > conditions) {
        currBestResort = [conditions, wind, allResorts.indexOf(arrayItem)];
      } else if (currBestResort[0] === conditions && currBestResort[1] > wind) {
        currBestResort = [conditions, wind, allResorts.indexOf(arrayItem)];
      }
    });

    setBestResort(allResorts[currBestResort[2]]);
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
