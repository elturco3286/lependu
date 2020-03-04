import React from "react";

import "../assets/css/Square.css";

interface MyProps {
  onClick(i: string): void;
  value: string;
}

export class Square extends React.Component<MyProps, {}> {
  handlePlay = () => {
    this.props.onClick(this.props.value);
  };

  render() {
    return (
      <button className="square" onClick={this.handlePlay}>
        {this.props.value}
      </button>
    );
  }
}
export default Square;
