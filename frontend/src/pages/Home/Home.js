import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <p>Hvað viltu sjá?</p>
      <div>
        <Link to="/bestToday">Hvar er besta skíðaveðrið í dag?</Link>
      </div>
      <div>
        <Link to="/bestThisWeek">
          Hvenær næstu 7 daga er besta skíðaveðrið?
        </Link>
      </div>
    </>
  );
};

export default Home;
