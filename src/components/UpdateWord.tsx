import React from "react";
import "../assets/css/UpdateWord.css";

const HIDDEN_SYMBOL = "❓";
interface MyProps {
  wordUpdate: string[];
}

class UpdateWord extends React.Component<MyProps> {
  createWord = () => {
    let word = [];

    for (let i = 0; i < this.props.wordUpdate.length; i++) {
      word.push(
        <span key={i}>
          {this.props.wordUpdate[i] === "hidden"
            ? HIDDEN_SYMBOL
            : this.props.wordUpdate[i]}
        </span>
      );
    }
    return word;
  };

  render() {
    return (
      <div className="updateword">
        <h1>{this.createWord()}</h1>
      </div>
    );
  }
}

export default UpdateWord;
