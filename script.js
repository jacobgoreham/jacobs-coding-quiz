const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

// grab references to elements
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// define other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var timeScore = 0;
var questionIndex = 0;

/**
 * FUNCTIONS
 */

// WHEN I click the start button, timer starts
var totalTime = 151;
function newQuiz() {
  questionIndex = 0;
  totalTime = 150;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function () {
    totalTime--;
    timeLeft.textContent = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < questions.length - 1) {
        gameOver();
      }
    }
  }, 1000);

  showQuiz();
}

// console.log(questions[questionIndex].question);
// console.log(questions[questionIndex].choices);

// then presented with questions and choices
function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {
  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    // correct answer, add 1 score to final score
    correctAns++;
    // console.log(correctAns);
    answerCheck.textContent = "Correct!";
  } else {
    // wrong answer, deduct 10 second from timer
    totalTime -= 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent =
      "Wrong! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  // repeat with the rest of questions
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    // if no more question, run game over function
    gameOver();
  }
}

function chooseA() {
  checkAnswer(0);
}

function chooseB() {
  checkAnswer(1);
}

function chooseC() {
  checkAnswer(2);
}

function chooseD() {
  checkAnswer(3);
}

// when all questions are answered or timer reaches 0, game over
function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";
  timeScore = totalTime;
  console.log(totalTime);
  // show final score
  finalScore.textContent = timeScore;
}

// enter initial and store highscore in local storage
function storeHighScores(event) {
  event.preventDefault();

  // stop function is initial is blank
  if (initialInput.value === "") {
    alert("Please enter your initials!");
    return;
  }

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  // store scores into local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  console.log(savedHighScores);
  // savedHighScores.sort(function (a, b) {
  //   return b - a;
  // });
  // console.log(userScore.score);
  // savedHighScores.sort(function (a, b) {
  //   return a - b;
  // });

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = [savedHighScores];
  }

  // var userScore = {
  //   initials: initialInput.value,
  // score: timeScore,
  // };

  var userScore = timeScore + " " + initialInput.value;

  console.log(userScore);
  scoresArray.push(userScore);

  // stringify array in order to store in local
  var scoresArrayString = scoresArray;
  window.localStorage.setItem("high scores", scoresArrayString);

  console.log(scoresArrayString);
  // show current highscores
  showHighScores();
}

// function to show high scores
var i = 0;
function showHighScores() {
  startDiv.style.display = "none";
  timer.style.display = "none";
  questionDiv.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  var savedHighScores = localStorage.getItem("high scores");

  // check if there is any in local storage
  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = savedHighScores;

  // for (; i < storedHighScores.length; i++) {

  for (i = 0; i < 1; i++) {
    // var eachNewHighScore = document.createElement("p");
    // var eachNewHighScore = savedHighScores;
    // var scoresArrayString = storedHighScores;
    // eachNewHighScore.innerHTML =
    // storedHighScores[i].initials + ": " + storedHighScores[i].score;
    var newElement = document.createElement("span");
    newElement.innerHTML = savedHighScores;

    console.log(storedHighScores);
    console.log(savedHighScores);
    console.log(newElement);

    listOfHighScores.appendChild(newElement);

    // listOfHighScores.appendChild(savedHighScores);
  }
}

/**
 * ADD EVENT LISTENERS
 */

startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
  showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
  startDiv.style.display = "block";
  highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores Cleared!";
  listOfHighScores.setAttribute(
    "style",
    "font-family: 'Archivo', sans-serif; font-style: italic;"
  );
});
