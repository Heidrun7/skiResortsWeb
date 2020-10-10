import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Link
        to={{
          pathname: "/",
        }}
      >
        Heim
      </Link>
      {/* <Link
        to={{
          pathname: "/iceland",
        }}
      >
        Iceland
      </Link>
      <Link
        to={{
          pathname: "/worldwide",
        }}
      >
        Worldwide
      </Link> */}
      <Link
        to={{
          pathname: "/about",
        }}
      >
        Um síðuna
      </Link>
    </>
  );
};

export default Navbar;
