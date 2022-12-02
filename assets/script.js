var startButton = document.getElementById("start-quiz");
var highScoreButton = document.getElementById("view-scores");
var questionWrapper = document.getElementById("question-wrapper");
var questionTitle = document.getElementById("question-wrapper");
var options = document.querySelectorAll("input");
var labels = document.querySelectorAll("label");
const startingScore = 30;
var gameScore = startingScore;
var gameInterval;
var questionIndex = 0;

var questions = [
  {question: "Which of the following isn't a cup in MarioKart Wii?",
  answerIndex: 3,
  answers: ["Shell Cup","Flower Cup","Egg Cup","Banana Cup"]
  },
  {question: "Which of these vehicles does not need to be unlocked?",
  answerIndex: 2,
  answers: ["Zip Zip","Flame Runner","Daytripper","Sneakster"]
  },
  {question: "Which cup doesn't include a 'Bowser's Castle' track?",
  answerIndex: 1,
  answers: ["Star Cup","Special Cup","Leaf Cup","Lightning Cup"]
  },
  {question: "Who is a small character?",
  answerIndex: 2,
  answers: ["Diddy Kong", "Toad","Peach","Bowser Jr"]
  },
  {question: "What color shell isn't availble in MarioKart Wii?",
  answerIndex: 1,
  answers: ["Gold","Red","Green","Blue"]
  },
  {question: "Which item doesn't give you a speed boost?",
  answerIndex: 4,
  answers: ["Thunder Cloud","Mushroom","Star","Thunderbolt"]
  }
];

function startGame() {
  highScoreButton.hidden = true;
  startButton.hidden = true;
  setUpQuestion();
  questionWrapper.hidden = false;
  questionWrapper.addEventListener("change", handleQuestionAnswered)

  //start timer loop
  gameInterval = setInterval(() => {
    gameScore--; 
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
  if (e.target.value === false) {
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
  //reset gamescore to starting value
  //reset questionindex to 0
  //clear interval
  //hide question wrapper
  //show button wrapper

}

function viewHighScores() {
  //load highscores from memory
  //parse to usable format
  //iterate and display top N scores
}

startButton.addEventListener("click", startGame);
highScoreButton.addEventListener("click", viewHighScores);
