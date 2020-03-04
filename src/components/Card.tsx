import React from "react";
import "../assets/css/Card.css";

const HIDDEN_SYMBOL = "❓";

interface MyProps {
  onClick(index: number): void;
  card: string | undefined;
  feedback: string;
  index: number;
  pairsNumber: number;
}

class Card extends React.Component<MyProps, {}> {
  render() {
    const { card, feedback, onClick, index, pairsNumber } = this.props;
    return (
      <div
        className={`card ${feedback}`}
        style={{ flex: `1 1 calc(100% / ${pairsNumber} - 0.4em)` }}
        onClick={() => onClick(index)}
      >
        <span className="symbol">
          {feedback === "hidden" ? HIDDEN_SYMBOL : card}
        </span>
      </div>
    );
  }
}

export default Card;
