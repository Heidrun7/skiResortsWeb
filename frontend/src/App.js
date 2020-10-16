import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import BestToday from "./pages/BestToday/BestToday";
import FullWeek from "./pages/FullWeek/FullWeek";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/dagur" render={() => <BestToday />} />
          <Route exact path="/vikuspa" render={() => <FullWeek />} />
          <Route exact path="/um" render={() => <About />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
