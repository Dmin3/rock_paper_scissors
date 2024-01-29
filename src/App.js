import { useState } from "react";
import ImgButton from "./ImgButton";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";
import { compareHand, generateRandomHand } from "./utils";
import "./App.css";
import "./Box.css";
import "./HandIcon.css";
import Score from "./Score";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    // 상대방 무작위 가위바위보
    const nextOtherHand = generateRandomHand();
    setOtherHand(nextOtherHand);
    // 내가 선택한 가위바위보
    setHand(nextHand);

    // 승부 결과 리턴
    const historyItem = getResult(nextHand, nextOtherHand);
    setGameHistory([...gameHistory, historyItem]);

    // 점수 반영
    const comparison = compareHand(nextHand, nextOtherHand);
    if (comparison > 0) {
      setScore(score + bet);
    }
    if (comparison < 0) {
      setOtherScore(otherScore + bet);
    }
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value);

    if (num > 9) {
      num = num %= 10;
    }
    if (num < 1) {
      num = 1;
    }
    num = Math.floor(num);
    setBet(num);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
  };

  function winnerCheck(hand, otherHand) {
    if (compareHand(hand, otherHand) > 0) {
      return "Hand winner";
    } else {
      return "Hand";
    }
  }

  return (
    <div className="App">
      <h1 className="App-heading">가위바위보</h1>
      <ImgButton className="App-reset" onClick={handleClearClick} />
      <div className="App-scores">
        <Score name="나" score={score}></Score>
        <div className="App-versus">:</div>
        <Score name="상대" score={otherScore}></Score>
      </div>
      <div className="Box App-box">
        <div className="Box-inner">
          <div className="App-hands">
            <div className={winnerCheck(hand, otherHand)}>
              <HandIcon className="Hand-icon" value={hand}></HandIcon>
            </div>

            <div className="App-versus">VS</div>
            <div className={winnerCheck(otherHand, hand)}>
              <HandIcon className="Hand-icon" value={otherHand}></HandIcon>
            </div>
          </div>
          <div className="App-bet">
            <span>배점</span>
            <input
              type="number"
              min={1}
              max={9}
              step={1}
              value={1}
              onChange={handleBetChange}
            ></input>
          </div>
          <div className="App-history">
            <h2>승부기록</h2>
            <p>{gameHistory.join(", ")}</p>
          </div>
        </div>
      </div>

      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
