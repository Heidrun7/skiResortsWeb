import React, { useState } from "react";
import { Link } from "react-router-dom";
import BestToday from "../BestToday/BestToday";
import BestThisWeek from "../BestThisWeek/BestThisWeek";
import "./Home.css";

const Home = () => {
  const [id, setId] = useState(988);

  const handleResortChange = (e) => {
    setId(e.target.value);
  };

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
    <div className="homeContainer">
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
  );
};

export default Home;
