import React from "react";
import { Select, FormControl, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../assets/css/LeMemory.css";

interface MyState {
  pairsNumber: number;
  level: number;
  minutes: number;
  seconds: number;
  time: boolean;
  mediumLevel: [number, number];
  highLevel: [number, number];
}

export class LeMemory extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pairsNumber: 6,
      level: 1,
      minutes: 0,
      seconds: 1,
      time: false,
      mediumLevel: [4, 0],
      highLevel: [2, 30]
    };
  }

  handleChangePair = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ pairsNumber: event.target.value as number }, () =>
      this.levelDifficulty(this.state.pairsNumber)
    );
  };

  handleChangeLevel = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ level: event.target.value as number }, () =>
      this.sendTime(this.state.level)
    );
  };

  sendTime(level: number) {
    switch (level) {
      case 1:
        this.setState({ time: false });
        break;
      case 2:
        this.setState({
          time: true,
          minutes: this.state.mediumLevel[0],
          seconds: this.state.mediumLevel[1]
        });
        break;
      case 3:
        this.setState({
          time: true,
          minutes: this.state.highLevel[0],
          seconds: this.state.highLevel[1]
        });
        break;
      default:
        break;
    }
  }

  levelDifficulty(pairsNumber: number) {
    switch (pairsNumber) {
      case 2:
        this.setState({
          mediumLevel: [0, 7],
          highLevel: [0, 5]
        });
        break;
      case 4:
        this.setState({
          mediumLevel: [1, 0],
          highLevel: [0, 40]
        });
        break;
      case 6:
        this.setState({
          mediumLevel: [3, 0],
          highLevel: [2, 30]
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { pairsNumber, minutes, seconds, level, time } = this.state;
    return (
      <div className="lemorpion">
        <div className="imagememory">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className="imagelememory"
            src={require(`../assets/images/memory.png`)}
          />
        </div>
        <h1>Bienvenue chez Mr Le Memory !</h1>
        <h2>Une seule règle : il faut trouver toutes les paires !</h2>
        <div className="selectoption">
          <div className="option">
            <h3>Nombre de paires à trouver : </h3>
            <FormControl className="select">
              <Select value={pairsNumber} onChange={this.handleChangePair}>
                <MenuItem value={2}>Deux</MenuItem>
                <MenuItem value={4}>Huit</MenuItem>
                <MenuItem value={6}>Dix-huit</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="option">
            <Link
              to={{
                pathname: "/memory/jeu",
                state: {
                  pairsNumber,
                  minutes,
                  seconds,
                  time
                }
              }}
            >
              <button className="buttonmemory">Jouer !</button>
            </Link>
          </div>
          <div className="option">
            <h3>Niveau de difficulté : </h3>
            <FormControl className="select">
              <Select value={level} onChange={this.handleChangeLevel}>
                <MenuItem value={1}>Facile</MenuItem>
                <MenuItem value={2}>Moyen</MenuItem>
                <MenuItem value={3}>Difficile</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default LeMemory;
