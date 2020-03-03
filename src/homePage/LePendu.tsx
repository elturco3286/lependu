import React from "react";
import "../assets/css/LePendu.css";

export class LePendu extends React.Component {
  render() {
    return (
      <div className="lependu">
        <div className="container">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className="imagelependu"
            src={require(`../assets/images/image0.jpg`)}
          />
          <div className="overlay"></div>
          <div className="buttonplay">
            <a href="/pendu/jeu"> Jouer ? </a>
          </div>
        </div>

        <h1>Bienvenue chez Mr Le Pendu !</h1>
        <h2>
          <span>Seulement 2 règles :</span>
          <ul>
            <li>Vous pouvez faire 7 erreurs</li>
            <li>
              Si vous saisissez une lettre déjà choisie, ce sera considéré comme
              2 erreurs !
            </li>
          </ul>
        </h2>
      </div>
    );
  }
}

export default LePendu;
