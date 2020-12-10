import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BestToday from "../BestToday/BestToday";
import BestThisWeek from "../BestThisWeek/BestThisWeek";
import skier from "../../images/skier/skier_white_right.png";
import "./Home.css";

const Home = () => {
  const [id, setId] = useState(988);
  const [displayOverlay, setDisplayOverlay] = useState("block");
  const [displayHome, setDisplayHome] = useState("none");

  const handleResortChange = (e) => {
    setId(e.target.value);
  };

  useEffect(() => {
    setTimeout(function () {
      setDisplayOverlay("none");
      setDisplayHome("grid");
    }, 3000);
  }, []);

  let select = (
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
  );

  return (
    <div className="wrapper">
      <div className="overlay" style={{ display: displayOverlay }}>
        <img src={skier} alt="Skier" className="skier"></img>
      </div>
      <div className="homeContainer" style={{ display: displayHome }}>
        <div className="today">
          <div className="center">
            <div className="content">
              <BestToday />
              {/* <Link to="/dagur">
              <>Sjá annan dag</>
            </Link> */}
            </div>
          </div>
        </div>
        <div className="thisWeek">
          <div className="center">
            <div className="content">
              <BestThisWeek id={id} select={select} />
              <div className="seeWeek">
                <Link to="/vikuspa">Sjá vikuspá</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
