import React from "react";
import "../assets/css/LePendu.css";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../assets/css/LeMorpion.css";

interface MyState {
  playerOne: string;
  playerTwo: string;
}

export class LeMorpion extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      playerOne: "",
      playerTwo: ""
    };
  }

  handlePlayerOne = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ playerOne: event.target.value as string });
  };

  handlePlayerTwo = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ playerTwo: event.target.value as string });
  };

  render() {
    const { playerOne, playerTwo } = this.state;
    return (
      <div className="lemorpion">
        <div className="imagemorpion">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className="imagelemorpion"
            src={require(`../assets/images/morpion.png`)}
          />
        </div>
        <h1>Bienvenue chez Mr Le Morpion !</h1>
        <h2>Une seule règle : il faut gagner !</h2>
        <div className="players">
          <div className="player">
            <h3>Nom du joueur 1 : </h3>
            <TextField
              required
              value={playerOne}
              onChange={this.handlePlayerOne}
              label="Joueur 1"
            ></TextField>
          </div>
          {playerOne && playerTwo !== "" && (
            <Link
              to={{
                pathname: "/morpion/jeu",
                state: {
                  playerOne,
                  playerTwo
                }
              }}
            >
              <div className="player">
                <button className="buttonmorpionplay">Jouer !</button>
              </div>
            </Link>
          )}
          <div className="player">
            <h3>Nom du joueur 2 : </h3>
            <TextField
              required
              value={playerTwo}
              onChange={this.handlePlayerTwo}
              label="Joueur 2"
            ></TextField>
          </div>
        </div>
      </div>
    );
  }
}

export default LeMorpion;
