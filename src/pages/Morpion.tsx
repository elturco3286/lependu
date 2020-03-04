import React from "react";
import { Square } from "../components/Square";

import "../assets/css/Morpion.css";
import { Link } from "react-router-dom";

interface MyProps {
  location: any;
}

interface MyState {
  squares: string[];
  xIsNext: boolean;
  playerOne: string;
  playerTwo: string;
}

export class Morpion extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      xIsNext: true,
      playerOne: this.props.location.state.playerOne,
      playerTwo: this.props.location.state.playerTwo
    };
  }

  handleClick(i: number) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "🌛" : "🌍";
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
  }

  handleReplay = () => {
    const { playerOne, playerTwo } = this.state;
    const changePlayer = playerOne;
    this.setState({
      squares: Array(9).fill(""),
      xIsNext: true,
      playerOne: playerTwo,
      playerTwo: changePlayer
    });
  };

  calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  renderSquare(i: number) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const { playerOne, playerTwo } = this.state;
    const winner = this.calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = (!this.state.xIsNext ? playerOne : playerTwo) + " a gagné !";
    } else if (this.state.squares.includes("") === false) {
      status = "Match nul !";
    } else {
      status = this.state.xIsNext ? playerOne : playerTwo;
    }

    return (
      <div className="morpion">
        <div className="status">
          <h1>{status}</h1>
        </div>
        <div className="grid">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        {status.endsWith("!") && (
          <div>
            {" "}
            <h2>Voulez-vous rejouer ?</h2>
            <button className="buttonmorpion" onClick={this.handleReplay}>
              Oui
            </button>
            <Link to="/">
              <button className="buttonmorpion">Non</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default Morpion;
