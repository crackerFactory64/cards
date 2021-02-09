const ranks = ["Ace", "King", "Queen", "Jack", 10, 9, 8, 7, 6, 5, 4, 3, 2];
const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

let card = "";
let value1 = 0;
let value2 = 0;
let score = 0;
let hiScore = 0;

const cheer = new Audio("media\\sounds\\applause(edited).mp3");
const aww = new Audio("media\\sounds\\aww(edited).mp3");
const theme = new Audio("media\\sounds\\theme(edited).mp3");

theme.loop = true;

const deal = () => {
  card = {
    rank: ranks[Math.floor(Math.random() * 13)],
    suit: suits[Math.floor(Math.random() * 4)],
  };
};

const valueFinder = (rank) => {
  if (Number.isInteger(rank)) {
    value = card.rank;
  } else if (rank == "Jack") {
    value = 11;
  } else if (rank == "Queen") {
    value = 12;
  } else if (rank == "King") {
    value = 13;
  } else if (rank == "Ace") {
    value = 14;
  }
  return value;
};

const showScore = () => {
  if (score > hiScore) {
    hiScore = score;
  }
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("hiScore").innerHTML = "Hi Score: " + hiScore;
};

const crowd = (file) => {
  if (file.paused) {
    file.play();
  } else {
    file.currentTime = 0;
  }
};

document.getElementById("startButton").onclick = (event) => {
  event.preventDefault();
  document.getElementById("intro").style.display = "none";
  document.getElementById("brucie").innerHTML = "First card...";
  theme.currentTime = 0;
  theme.play();
  document.getElementById("higherButton").style.display = "inline-block";
  document.getElementById("lowerButton").style.display = "inline-block";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("playArea").style.display = "block";
  deal();
  document.getElementById(
    "cardImage"
  ).src = `media\\images\\${card.rank} of ${card.suit}.png`;
  document.getElementById("currentCard").innerHTML =
    card.rank + " of " + card.suit;
  value1 = valueFinder(card.rank);
};

document.getElementById("higherButton").onclick = (event) => {
  event.preventDefault();
  deal();
  document.getElementById("currentCard").innerHTML =
    card.rank + " of " + card.suit;
  document.getElementById(
    "cardImage"
  ).src = `media\\images\\${card.rank} of ${card.suit}.png`;
  value2 = valueFinder(card.rank);
  if (value2 > value1) {
    crowd(cheer);
    document.getElementById("brucie").innerHTML = "Correct!";
    score++;
  } else if (value1 > value2) {
    crowd(aww);
    document.getElementById("brucie").innerHTML = "Unlucky!";
    theme.pause();
    if (score == 8 || score == 11 || score == 18) {
      document.getElementById("brucie").innerHTML =
        "Game over! You managed an " + score + " card streak.";
    } else {
      document.getElementById("brucie").innerHTML =
        "Game over! You managed a " + score + " card streak.";
    }
    document.getElementById("higherButton").style.display = "none";
    document.getElementById("lowerButton").style.display = "none";
    document.getElementById("startButton").style.display = "block";
    score = 0;
    document.getElementById("startButton").innerHTML = "Restart";
  } else {
    document.getElementById("brucie").innerHTML = "Nothing for a pair!";
  }
  showScore();
  value1 = value2;
};

document.getElementById("lowerButton").onclick = (event) => {
  event.preventDefault();
  deal();
  document.getElementById("currentCard").innerHTML =
    card.rank + " of " + card.suit;
  document.getElementById(
    "cardImage"
  ).src = `media\\images\\${card.rank} of ${card.suit}.png`;
  value2 = valueFinder(card.rank);
  if (value2 < value1) {
    crowd(cheer);
    document.getElementById("brucie").innerHTML = "Correct!";
    score++;
  } else if (value1 < value2) {
    crowd(aww);
    document.getElementById("brucie").innerHTML = "Unlucky!";
    theme.pause();
    if (score == 8 || score == 11 || score == 18) {
      document.getElementById("brucie").innerHTML =
        "Game over! You managed an " + score + " card streak.";
    } else {
      document.getElementById("brucie").innerHTML =
        "Game over! You managed a " + score + " card streak.";
    }
    document.getElementById("higherButton").style.display = "none";
    document.getElementById("lowerButton").style.display = "none";
    document.getElementById("startButton").style.display = "block";
    score = 0;
    document.getElementById("startButton").innerHTML = "Restart";
  } else {
    document.getElementById("brucie").innerHTML = "Nothing for a pair!";
  }
  showScore();
  value1 = value2;
};

document.getElementById("retryButton").onclick = (event) => {
  event.preventDefault();
  document.getElementById("gameOver").style.display = "none";
  aww.pause();
  theme.currentTime = 0;
  theme.play();
  document.getElementById("startButton").style.display = "none";
  document.getElementById("playArea").style.display = "block";
  deal();
  document.getElementById(
    "cardImage"
  ).src = `media\\images\\${card.rank} of ${card.suit}.png`;
  document.getElementById("currentCard").innerHTML =
    card.rank + " of " + card.suit;
  value1 = valueFinder(card.rank);
};
