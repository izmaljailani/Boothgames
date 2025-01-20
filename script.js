const colors = {
  orange: [
    { question: "Who does the Chief Integrity Officer report to functionally?", answers: [{ text: "PETRONAS Board Risk Committee", correct: true }, { text: "PETRONAS President & Group CEO", correct: false }] },
    { question: "What does IFP stand for?", answers: [{ text: "Integrity Focal Person", correct: true }, { text: "Internal Focal Point", correct: false }] },
    { question: "How many whistleblowing channels are there in PETRONAS?", answers: [{ text: "3", correct: true }, { text: "2", correct: false }] }
  ],
  blue: [
    { question: "What are the five key principles of Adequate Procedures?", answers: [{ text: "T.R.U.S.T", correct: true }, { text: "I.D.E.A.S", correct: false }] },
    { question: "When did Section 17A of the Malaysian Anti-Corruption Commission (MACC) Act 2009 come into force?", answers: [{ text: "1 June 2020", correct: true }, { text: "1 January 2018", correct: false }] },
    { question: "Who is the Chairman of Whistleblowing Committee?", answers: [{ text: "Chief Integrity Officer", correct: true }, { text: "Chairman of Board Risk Committee", correct: false }] }
  ]
};

const startButton = document.getElementById("startButton");
const spinButton = document.getElementById("spinButton");
const wheel = document.getElementById("wheel");
const introSection = document.getElementById("intro-section");
const wheelSection = document.getElementById("wheel-section");
const questionSection = document.getElementById("question-section");
const finalSection = document.getElementById("final-section");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const leaderboard = document.getElementById("leaderboard");
const finalMessage = document.getElementById("finalMessage");
const finalText = document.getElementById("finalText");
const leaderboardForm = document.getElementById("leaderboardForm");
const leaderboardTable = document.getElementById("leaderboardTable");

let usedQuestions = [];
let correctAnswers = 0;

startButton.addEventListener("click", () => {
  introSection.classList.add("hidden");
  wheelSection.classList.remove("hidden");
});

spinButton.addEventListener("click", () => {
  spinButton.disabled = true;

  const randomAngle = Math.floor(Math.random() * 360) + 1080;
  wheel.style.transform = `rotate(${randomAngle}deg)`;

  setTimeout(() => {
    spinButton.disabled = false;
    wheelSection.classList.add("hidden");
    questionSection.classList.remove("hidden");
    showQuestion();
  }, 3000);
});

function getUniqueQuestion() {
  const availableQuestions = Object.keys(colors)
    .flatMap(color => colors[color])
    .filter(q => !usedQuestions.includes(q));
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const question = availableQuestions[randomIndex];
  usedQuestions.push(question);
  return question;
}

function showQuestion() {
  resetState();
  const currentQuestion = getUniqueQuestion();
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("answer-option");
    button.onclick = () => {
      if (answer.correct) correctAnswers++;
      if (usedQuestions.length < 3) {
        showQuestion();
      } else {
        showFinalSection();
      }
    };
    answerButtons.appendChild(button);
  });
}

function resetState() {
  answerButtons.innerHTML = "";
}

function showFinalSection() {
  questionSection.classList.add("hidden");
  finalSection.classList.remove("hidden");

  if (correctAnswers === 3) {
    finalMessage.innerText = "🎉 Congratulations! 🎉";
    finalText.innerText = "You answered all 3 questions correctly! Enter your name for the leaderboard.";
    leaderboardForm.classList.remove("hidden");
    leaderboardTable.classList.remove("hidden");
  } else {
    finalMessage.innerText = "😢 Try Again! 😢";
    finalText.innerText = "You didn't answer all 3 questions correctly. Better luck next time!";
  }
}

function addHighScore() {
  const playerName = document.getElementById("playerName").value;
  const row = document.createElement("tr");
  row.innerHTML = `<td>${leaderboard.rows.length + 1}</td><td>${playerName}</td><td>3</td>`;
  leaderboard.appendChild(row);
}
