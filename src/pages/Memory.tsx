import React from "react";
import shuffle from "lodash.shuffle";

import "../assets/css/Memory.css";

import Card from "../components/Card";
import DialogResult from "../components/DialogResult";
// import GuessCount from "../components/GuessCount";

const SYMBOLS = "😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿";
const VISUAL_PAUSE_MSECS = 1000;
const VISUAL_PAUSE_TWO_PAIRS_MSECS = 300;

interface MyProps {
  location: any;
}

interface MyState {
  pairsNumber: number;
  minutes: number;
  seconds: number;
  time: boolean;
  cards: (string | undefined)[];
  currentPair: number[];
  guesses: number;
  matchedCardIndices: number[];
  interval: NodeJS.Timeout;
  win: boolean;
}

class Memory extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      pairsNumber: this.props.location.state.pairsNumber,
      minutes: this.props.location.state.minutes,
      seconds: this.props.location.state.seconds,
      time: this.props.location.state.time,
      cards: this.generateCards(),
      currentPair: [],
      guesses: 0,
      matchedCardIndices: [],
      interval: setTimeout(() => {}, 0),
      win: false
    };
  }

  componentDidMount() {
    const { time } = this.state;
    if (time) {
      let myInterval = setInterval(() => {
        const { seconds, minutes, win } = this.state;
        this.getWin();
        if (!win) {
          if (seconds > 0) {
            this.setState(({ seconds }) => ({
              seconds: seconds - 1
            }));
          }
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(myInterval);
            } else {
              this.setState(({ minutes }) => ({
                minutes: minutes - 1,
                seconds: 59
              }));
            }
          }
        }
      }, 1000);
      this.setState({ interval: myInterval });
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  generateCards() {
    const pairsNumber = this.props.location.state.pairsNumber;
    const result = [];
    const size = pairsNumber * pairsNumber;
    const candidates = shuffle(SYMBOLS);
    while (result.length < size) {
      const card = candidates.pop();
      result.push(card, card);
    }
    return shuffle(result);
  }

  getFeedbackForCard(index: number) {
    const { currentPair, matchedCardIndices } = this.state;
    const indexMatched = matchedCardIndices.includes(index);

    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? "visible" : "hidden";
    }

    if (currentPair.includes(index)) {
      return indexMatched ? "justMatched" : "justMismatched";
    }
    return indexMatched ? "visible" : "hidden";
  }

  handleCardClick = (index: number) => {
    const { currentPair } = this.state;

    if (currentPair.length === 2) {
      return;
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] });
      return;
    }
    this.handleNewPairClosedBy(index);
  };

  handleNewPairClosedBy(index: number) {
    const {
      cards,
      currentPair,
      guesses,
      matchedCardIndices,
      pairsNumber
    } = this.state;

    const newPair = [currentPair[0], index];
    const newGuesses = guesses + 1;
    const matched = cards[newPair[0]] === cards[newPair[1]];
    this.setState({ currentPair: newPair, guesses: newGuesses });
    if (matched) {
      this.setState(
        {
          matchedCardIndices: [...matchedCardIndices, ...newPair]
        },
        () => this.getWin()
      );
    }
    setTimeout(
      () => this.setState({ currentPair: [] }),
      pairsNumber === 2 ? VISUAL_PAUSE_TWO_PAIRS_MSECS : VISUAL_PAUSE_MSECS
    );
  }

  getWin() {
    const { cards, matchedCardIndices } = this.state;
    if (matchedCardIndices.length === cards.length) {
      this.setState({ win: true });
    }
  }

  render() {
    const { cards, minutes, seconds, time, pairsNumber, win } = this.state;
    return (
      <div className="memory">
        {time ? (
          <div className="memorytime">
            {minutes === 0 && seconds === 0 ? (
              <h1>STOP !</h1>
            ) : (
              <h1>
                Compte à rebours : {minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            )}
          </div>
        ) : (
          <h2 className="memorytime">Vous avez tout votre temps... </h2>
        )}
        {/* <GuessCount guesses={guesses} /> */}
        <div className="memorycards">
          {cards.map((card, index) => (
            <Card
              card={card}
              feedback={this.getFeedbackForCard(index)}
              index={index}
              key={index}
              pairsNumber={pairsNumber}
              onClick={this.handleCardClick}
            />
          ))}
        </div>
        {((minutes === 0 && seconds === 0) || win) && (
          <DialogResult
            win={win}
            link="/memory"
            looseMessage="Surestimes-tu tes capacités..."
          />
        )}
      </div>
    );
  }
}

export default Memory;
