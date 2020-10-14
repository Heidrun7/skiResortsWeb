import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../images/fullLogoWhite.png";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="home">
        <Link
          to={{
            pathname: "/",
          }}
        >
          <img src={logo} alt="Besta veðrið" />
        </Link>
      </div>
      <div className="about">
        <Link
          to={{
            pathname: "/about",
          }}
        >
          Um síðuna
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
