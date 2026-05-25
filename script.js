const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start-btn");
const quizScreen = document.querySelector("#quiz-screen");
const questionText = document.querySelector("#question-text");
const currentQuestionNum = document.querySelector("#current-question");
const TotalQuestionNum = document.querySelector("#total-questions");
const score = document.querySelector("#score");
const answersContainer = document.querySelector("#answers-container");
const progressBar = document.querySelector("#progress");
const resultScreen = document.querySelector("#result-screen");

const finalScore = document.querySelector("#final-score");

const maxScore = document.querySelector("#max-score");

const resultMessage = document.querySelector("#result-message");

const restartBtn = document.querySelector("#restart-btn");
const quizQuestions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Transfer Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    correct: 0,
  },

  {
    question: "Which language is used for styling web pages?",
    answers: ["Python", "CSS", "Java", "C++"],
    correct: 1,
  },

  {
    question: "Which company developed JavaScript?",
    answers: ["Microsoft", "Google", "Netscape", "Apple"],
    correct: 2,
  },

  {
    question: "Which method adds an element to the end of an array?",
    answers: ["push()", "pop()", "shift()", "map()"],
    correct: 0,
  },

  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["<!-- -->", "#", "//", "**"],
    correct: 2,
  },

  {
    question: "Which of these is NOT a JavaScript data type?",
    answers: ["String", "Boolean", "Float", "Object"],
    correct: 2,
  },

  {
    question: "What is the output of typeof null?",
    answers: ["null", "object", "undefined", "boolean"],
    correct: 1,
  },

  {
    question: "Which keyword creates a constant in JavaScript?",
    answers: ["let", "var", "const", "fixed"],
    correct: 2,
  },

  {
    question: "Which React hook manages state?",
    answers: ["useEffect", "useState", "useFetch", "useData"],
    correct: 1,
  },

  {
    question: "Which method converts JSON string into JavaScript object?",
    answers: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.object()",
      "JSON.convert()",
    ],
    correct: 0,
  },
];

let totalScore = 0;
let currentQuestionIndex = 0;

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  resultScreen.style.display = "none";

  totalScore = 0;
  currentQuestionIndex = 0;
  score.textContent = 0;

  showQuestions();
});

function showQuestions() {
  if (currentQuestionIndex >= quizQuestions.length) {
    showResult();
    return;
  }

  const choice = quizQuestions[currentQuestionIndex];

  questionText.textContent = choice.question;
  currentQuestionNum.textContent = currentQuestionIndex + 1;
  TotalQuestionNum.textContent = quizQuestions.length;

  answersContainer.innerHTML = "";

  const progressPercentage =
    ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  progressBar.style.width = `${progressPercentage}%`;

  choice.answers.forEach((answer, answerIndex) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("answer-btn");

    button.addEventListener("click", () => {
      document.querySelectorAll(".answer-btn").forEach((btn) => {
        btn.disabled = true;
      });

      if (answerIndex === choice.correct) {
        button.classList.add("correct");
        totalScore++;
        score.textContent = totalScore;
      } else {
        button.classList.add("incorrect");
      }

      setTimeout(() => {
        currentQuestionIndex++;
        showQuestions();
      }, 500);
    });

    answersContainer.appendChild(button);
  });
}

function showResult() {
  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  finalScore.textContent = totalScore;
  maxScore.textContent = quizQuestions.length;

  const percentage = (totalScore / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "🏆 Perfect Score!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "🔥 Excellent Work!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "👍 Good Job!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "🙂 Keep Practicing!";
  } else {
    resultMessage.textContent = "💪 Try Again!";
  }
}

restartBtn.addEventListener("click", () => {
  totalScore = 0;
  currentQuestionIndex = 0;

  score.textContent = 0;
  progressBar.style.width = "0%";

  resultScreen.style.display = "none";
  quizScreen.style.display = "block";

  showQuestions();
});