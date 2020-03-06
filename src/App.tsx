import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export class Apps extends React.Component {
  render() {
    return (
      <div className="nav">
        <h1>BIENVENUE au Pays des mini Jeux !!! </h1>
        <div className="jeuxnav">
          <Link to="/pendu">
            <button>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="imagenav"
                src={require(`./assets/images/image0.jpg`)}
              />
              <p>Pendu</p>
            </button>
          </Link>
          <Link to="/memory">
            <button>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="imagenav"
                src={require(`./assets/images/memory.png`)}
              />
              <p>Memory</p>
            </button>
          </Link>
          <Link to="/morpion">
            <button>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="imagenav"
                src={require(`./assets/images/morpion.png`)}
              />
              <p>Morpion</p>
            </button>
          </Link>
        </div>
        <h2>Sélectionnez le jeu</h2>
      </div>
    );
  }
}

export default Apps;
