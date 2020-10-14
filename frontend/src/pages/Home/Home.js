import React from "react";
import { Link } from "react-router-dom";
import FindBestToday from "../FindBestToday/FindBestToday";
import FindBestThisWeek from "../FindBestThisWeek/FindBestThisWeek";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      <div className="today">
        <div className="center">
          <div className="content">
            <Link to="/bestToday">
              <>
                <FindBestToday />
              </>
            </Link>
          </div>
        </div>
      </div>
      <div className="thisWeek">
        <div className="center">
          <div className="content">
            <Link to="/bestThisWeek">
              <>
                <FindBestThisWeek />
              </>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
