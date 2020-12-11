import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Home from "./Home";
import Tracks from "./Tracks";
import Artists from "./Artists";

function Profile() {
  return (
    <Router>
      <div>
        <Navbar/>

        <Switch>
          <Route exact path="/tracks">
            <Tracks />
          </Route>
          <Route exact path="/artists">
            <Artists />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Profile;
