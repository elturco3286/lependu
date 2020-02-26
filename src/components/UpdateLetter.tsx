import React from "react";
import "../assets/css/UpdateLetter.css";

interface MyProps {
  onChoiceLetter(letter: string): void;
}
interface MyState {
  letter: string;
}

class UpdateLetter extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);
    this.state = { letter: "" };
  }

  handleChange = (event: any) => {
    this.setState({ letter: event.target.value });
  };

  handleSubmit = () => {
    this.props.onChoiceLetter(this.state.letter.toUpperCase());
    this.setState({ letter: "" });
  };

  render() {
    const letter = this.state.letter;
    return (
      <div className="updateletter">
        <label>
          <h2>Lettre choisie :</h2>
          <input
            type="text"
            value={letter.toUpperCase()}
            maxLength={1}
            onChange={this.handleChange}
          />
        </label>

        <button onClick={this.handleSubmit}>Valider</button>
      </div>
    );
  }
}

export default UpdateLetter;
