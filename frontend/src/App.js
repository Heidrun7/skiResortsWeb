import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Navbar from "./components/Navbar/Navbar";
import Iceland from "./pages/Iceland/Iceland";
import Worldwide from "./pages/Worldwide/Worldwide";
import About from "./pages/About/About";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/iceland" render={() => <Iceland />} />
          <Route exact path="/worldwide" render={() => <Worldwide />} />
          <Route exact path="/about" render={() => <About />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
