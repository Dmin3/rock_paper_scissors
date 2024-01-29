const HANDS = ["rock", "scissor", "paper"];

const WINS = {
  rock: "scissor",
  scissor: "paper",
  paper: "rock",
};

export function compareHand(myHand, otherHand) {
  if (WINS[myHand] === otherHand) {
    return 1;
  }
  if (WINS[otherHand] === myHand) {
    return -1;
  }
  return 0;
}

function ramdom(n) {
  return Math.floor(Math.random() * n);
}

export function generateRandomHand() {
  const idx = ramdom(HANDS.length);
  return HANDS[idx];
}
