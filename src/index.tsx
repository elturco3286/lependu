import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Pendu from "./pages/Pendu";
import Memory from "./pages/Memory";
import Morpion from "./pages/Morpion";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LePendu } from "./homePage/LePendu";
import { LeMemory } from "./homePage/LeMemory";
import { LeMorpion } from "./homePage/LeMorpion";

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/pendu" exact component={LePendu} />
        <Route path="/pendu/jeu" component={Pendu} />
        <Route path="/memory" exact component={LeMemory} />
        <Route path="/memory/jeu" component={Memory} />
        <Route path="/morpion" exact component={LeMorpion} />
        <Route path="/morpion/jeu" component={Morpion} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
