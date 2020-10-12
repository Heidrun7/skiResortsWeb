import React, { useState, useEffect } from "react";
import axios from "axios";
//import DayWeather from "../../components/DayWeather/DayWeather";

const FindBestToday = () => {
  const forecast = "https://api.blika.is/GetBlikaForecast24klst/";
  const [loading, setLoading] = useState(true);
  const [allResorts, setAllResorts] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const skiResorts = [149, 704, 983, 984, 985, 986, 987, 988, 989, 924];

  useEffect(() => {
    // Fetch weather data for one resort, then slice only data for the selected day
    async function fetchWeather(id) {
      try {
        const weather = await axios.get(forecast + id + "/");
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
    console.log("findBestResort");
    console.log("First resort in list: ", allResorts[0]);
    console.log("Last resort in list: ", allResorts[allResorts.length - 1]);
  };

  return (
    <>
      <p>Hvar er besta veðrið í dag?</p>
    </>
  );
};

export default FindBestToday;
