import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About/About";
import FindBestThisWeek from "./pages/FindBestThisWeek/FindBestThisWeek";
import FindBestToday from "./pages/FindBestToday/FindBestToday";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/bestToday" render={() => <FindBestToday />} />
          <Route
            exact
            path="/bestThisWeek"
            render={() => <FindBestThisWeek />}
          />
          <Route exact path="/about" render={() => <About />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
