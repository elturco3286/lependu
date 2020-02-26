import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Pendu from "./pages/Pendu";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LePendu } from "./homePage/LePendu";

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/pendu" exact component={LePendu} />
        <Route path="/pendu/jeu" component={Pendu} />
      </Switch>
    </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
