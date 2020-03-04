import React from "react";
import "../assets/css/GuessCount.css";

interface MyProps {
  guesses: number;
}

class GuessCount extends React.Component<MyProps, {}> {
  render() {
    return <div className="guesses">{this.props.guesses}</div>;
  }
}

export default GuessCount;
