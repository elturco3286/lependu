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
  win: boolean;
  pendu: boolean;
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
      win: false,
      pendu: true
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

  replay = (replay: boolean) => {
    this.setState({ replay });
  };

  render() {
    const { word, wordUpdate, counter, win, pendu } = this.state;
    return (
      <div className="pendu">
        {counter < 8 ? (
          <h2>
            {counter === 7
              ? "Attention !!! Plus le droit à l'erreur !!!"
              : `Vous avez le droit de vous tromper ${7 - counter} fois`}
          </h2>
        ) : (
          <h2>PENDU !</h2>
        )}

        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img
          className="imagependu"
          src={
            counter === 9
              ? require("../assets/images/image8.jpg")
              : require(`../assets/images/image${counter}.jpg`)
          }
        />

        <UpdateWord wordUpdate={wordUpdate} />
        <UpdateLetter onChoiceLetter={this.handleCheckLetter} />

        {(counter === 8 || counter === 9 || win) && (
          <DialogResult
            win={win}
            looseMessage={`You loose !!! Le mot était : ${word}`}
            onDialogReplay={this.replay}
            pendu={pendu}
          />
        )}
      </div>
    );
  }
}

export default Pendu;
