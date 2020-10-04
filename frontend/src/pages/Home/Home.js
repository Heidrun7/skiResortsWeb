import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

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
    // Windspeed = 1 point per m/s
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
    console.log("HEYY: ", weatherArray);

    var bestDay = [1000, 0]; // [Sum of dayValue, arrayPosition of day]

    weatherArray.forEach(function (arrayItem) {
      var temp = arrayItem.t2; // int
      var conditions = 0; // Is it sunny, rain etc? Then give it value
      var wind = 0;
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
      }
      console.log("ArrayItemIndex: ", weatherArray.indexOf(arrayItem));
      var dayValue = conditions; // Sum of factors to consider when deciding the best day
      if (bestDay[0] > dayValue) {
        console.log("Changing from ", bestDay[0], " to ", dayValue);
        bestDay = [dayValue, weatherArray.indexOf(arrayItem)];
      }

      // var date = new Date(arrayItem.dags_spar).getUTCDay(); // 0 = Monday, 6 = Sunday
    });
    var bestDayDate = new Date(weatherArray[bestDay[1]].dags_spar);
    console.log("Best dayy: ", bestDayDate, " ", bestDay[1]);
    setHlidarfjallBest(weatherArray[bestDay[1]].dags_spar);
  };

  return (
    <>
      <p>Hvar er besta skíðaveðrið í dag?</p>
      <p>Hvenær næstu 7 daga er besta skíðaveðrið?</p>{" "}
      {/* Sýnir fyrsta daginn ef það er jafntefli */}
      {console.log("Hlíðarfjall: ", hlidarfjall)}
      <p>{hlidarfjallBest.toString()}</p>
    </>
  );
};

export default Home;
