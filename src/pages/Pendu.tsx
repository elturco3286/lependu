import React from "react";
import "../assets/css/Pendu.css";
import UpdateWord from "../components/UpdateWord";
import UpdateLetter from "../components/UpdateLetter";
import DialogResult from "../components/DialogResult";
import words from "../assets/Words";

const WORD = words[Math.floor(Math.random() * words.length)];

interface MyState {
  word: string;
  letter: string;
  lettersPlay: string[];
  wordUpdate: string[];
  counter: number;
  replay: boolean;
  notReplay: boolean;
  win: boolean;
}

class Pendu extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      word: WORD,
      letter: "",
      lettersPlay: [],
      wordUpdate: this.generateWordUpdate(),
      counter: 1,
      replay: false,
      notReplay: false,
      win: false
    };
  }

  componentDidUpdate() {
    if (this.state.replay) {
      window.location.reload();
    }
  }

  generateWordUpdate() {
    const tab: string[] = [];
    const result = Array.from(WORD);
    for (let i = 0; i < result.length; i++) {
      tab[i] = "hidden";
    }
    return tab;
  }

  handleCheckWord() {
    const { word, wordUpdate, counter, letter, lettersPlay } = this.state;
    const wordTab: string[] = Array.from(word);
    const tab: string[] = wordUpdate;
    const letters: string[] = lettersPlay;
    let i = 0;

    wordTab.forEach(element => {
      if (element === letter) {
        tab[i] = element;
      }
      i = i + 1;
    });

    if (wordTab.includes(letter) === false) {
      this.setState({ counter: counter + 1 });
    }

    if (letters.includes(letter)) {
      this.setState({ counter: counter + 2 });
    }
    letters.push(letter);
    this.setState({ lettersPlay: letters });

    this.setState({ wordUpdate: tab });
    if (JSON.stringify(wordUpdate) === JSON.stringify(wordTab)) {
      this.setState({ win: true });
    }
  }

  handleCheckLetter = (letter: string) => {
    this.setState({ letter }, () => this.handleCheckWord());
  };

  openDialog = (replay: boolean, notReplay: boolean) => {
    this.setState({ replay, notReplay });
  };

  render() {
    const { word, wordUpdate, counter, win } = this.state;
    return (
      <div className="pendu">
        <h2>
          {counter === 7
            ? "Attention !!! Plus le droit à l'erreur !!!"
            : `Vous avez le droit de vous tromper ${7 - counter} fois`}{" "}
        </h2>

        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className="imagependu"
          src={require(`../assets/images/image${counter}.jpg`)}
        />

        <UpdateWord wordUpdate={wordUpdate} />
        <UpdateLetter onChoiceLetter={this.handleCheckLetter} />

        {(counter === 8 || win) && (
          <DialogResult onOpenDialog={this.openDialog} win={win} word={word} />
        )}
      </div>
    );
  }
}

export default Pendu;
