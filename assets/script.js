var startButton = document.getElementById("start-quiz");
var highScoreButton = document.getElementById("view-scores");
var questionWrapper = document.getElementById("question-wrapper");
var questionTitle = document.getElementById("q-title");
var options = document.querySelectorAll("input");
var labels = document.querySelectorAll("label");
const startingScore = 30;
var gameScore = startingScore;
var gameInterval;
var questionIndex = 0;
var buttonWrapper = document.getElementById("button-wrapper");
var timerDisplay = document.getElementById("timer");
var highScores = [];
var scoreListElement = document.getElementById("score-list");
var scoresWrapper = document.getElementById("scores-wrapper");
var gameOver = false;

var questions = [
  {question: "Which of the following isn't a cup in MarioKart Wii?",
  answerIndex: 2,
  answers: ["Shell Cup","Flower Cup","Egg Cup","Banana Cup"]
  },
  {question: "Which of these vehicles does not need to be unlocked?",
  answerIndex: 1,
  answers: ["Zip Zip","Flame Runner","Daytripper","Sneakster"]
  },
  {question: "Which cup doesn't include a 'Bowser's Castle' track?",
  answerIndex: 0,
  answers: ["Star Cup","Special Cup","Leaf Cup","Lightning Cup"]
  },
  {question: "Who is a small character?",
  answerIndex: 1,
  answers: ["Diddy Kong", "Toad","Peach","Bowser Jr"]
  },
  {question: "What color shell isn't availble in MarioKart Wii?",
  answerIndex: 0,
  answers: ["Gold","Red","Green","Blue"]
  },
  {question: "Which item doesn't give you a speed boost?",
  answerIndex: 3,
  answers: ["Thunder Cloud","Mushroom","Star","Thunderbolt"]
  }
];

function startGame() {
  gameScore = startingScore;
  timerDisplay.textContent = gameScore;
  questionIndex = 0;
  buttonWrapper.hidden = true;
  scoresWrapper.hidden = true;
  timerDisplay.hidden = false;
  scoreListElement.innerHTML = '';
  setUpQuestion();
  questionWrapper.hidden = false;
  questionWrapper.addEventListener("change", handleQuestionAnswered)

  //start timer loop
  gameInterval = setInterval(() => {
    gameScore--;
    timerDisplay.textContent = gameScore;
    if (gameScore <= 0) {
      endGame();
    }
  }, 1000);
}

function setUpQuestion() {
  //take the question at index i and apply it to the dom
  let q = questions[questionIndex];
  questionTitle.textContent = q.question;
  q.answers.forEach((answer, index) => {
    options[index].value = (index === q.answerIndex);
    labels[index].textContent = answer;
  })
}

function handleQuestionAnswered(e) {
  //if wrong, decerement time/score by 5
  if (e.target.value === 'false') {
    gameScore -= 5;
  }
  e.target.checked = false;
  if ((questionIndex + 1) === questions.length || gameScore <= 0) {
    endGame();
  } else {
    questionIndex++;
    setUpQuestion();
  }
  //if not gameover, setup nextQuestion
}

function endGame() {
  //record and store score
  clearInterval(gameInterval);
  let name = prompt("Enter your name to record your score!") || "AAA";
  highScores.push({name, gameScore});
  localStorage.setItem("highscores", JSON.stringify(highScores));
  questionWrapper.hidden = true;
  buttonWrapper.hidden = false;
  timerDisplay.hidden = true;
  highScoreButton.disabled = false;
}

function viewHighScores() {
  //iterate and display top N scores
  highScoreButton.disabled = true;
  for (let i = 0; i < highScores.length; i++) {
    let scoreItem = document.createElement('li');
    scoreItem.textContent = `${highScores[i].name}: ${highScores[i].gameScore}`;
    scoreListElement.append(scoreItem);
  };
  scoresWrapper.hidden = false;
}

function loadData() {
  scoresString = localStorage.getItem("highscores");
  if (!scoresString) {
    highScores = [];
  } else {
    highScores = JSON.parse(scoresString);
  }
}

loadData();
startButton.addEventListener("click", startGame);
highScoreButton.addEventListener("click", viewHighScores);
