import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DayWeather from "../../components/DayWeather/DayWeather";

const Home = () => {
  const forecast = "https://api.blika.is/GetBlikaForecast24klst/";
  const [loading, setLoading] = useState(true);
  const [hlidarfjall, setHlidarfjall] = useState([]);
  const [hlidarfjallId, setHlidarfjallId] = useState(988);
  const [hlidarfjallBest, setHlidarfjallBest] = useState({});
  // const [hlidarfjallLoaded, setHlidarfjallLoaded] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const hlidarfjallWeather = await axios.get(
          forecast + hlidarfjallId + "/"
        );
        setLoading(false);
        setHlidarfjall(hlidarfjallWeather.data.slice(0, 7));
        findBestDay(hlidarfjallWeather.data.slice(0, 7));
        // setHlidarfjallLoaded(true);
        // console.log(hlidarfjallLoaded);
      } catch {}
    }
    fetchWeather();
  }, []);

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
    // else = 0 points ?
    console.log("Weather array: ", weatherArray);

    var bestDay = [1000, 1000, 0]; // [conditions, wind, arrayPosition of day in weatherArray]

    weatherArray.forEach(function (arrayItem) {
      var temp = arrayItem.t2; // int
      var conditions = 0; // Is it sunny, rain etc? Then give it value
      var wind = arrayItem.f10;
      console.log("wind: ", wind);
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
      if (bestDay[0] > conditions && wind < 10) {
        bestDay = [conditions, wind, weatherArray.indexOf(arrayItem)];
      } else if (bestDay[0] === conditions && bestDay[1] > wind) {
        // if (bestDay[1] > wind) {
        console.log("Changing from ", bestDay[0], " to ", conditions);
        bestDay = [conditions, wind, weatherArray.indexOf(arrayItem)];
        // }
      }
      // Else do nothing and there is no good day so far this week
    });
    var bestDayDate = new Date(weatherArray[bestDay[2]].dags_spar);
    console.log("Best day: ", bestDayDate);
    setHlidarfjallBest(weatherArray[bestDay[2]]);
  };

  return (
    <>
      <p>Hvað viltu sjá?</p>
      <p>Hvar besta skíðaveðrið í dag er</p>
      <p>Hvenær næstu 7 daga besta skíðaveðrið er</p>{" "}
      {/* Birta 2 componenta sem linka á annars vegar besta í dag og hinsvegar besta næstu 7 þar sem er hægt að velja stað */}
      <DayWeather day={hlidarfjallBest} />
      {/* Sýnir fyrsta daginn ef það er jafntefli */}
      {console.log("Hlíðarfjall: ", hlidarfjall)}
      {/* <p>{hlidarfjallBest.toString()}</p> */}
    </>
  );
};

export default Home;
