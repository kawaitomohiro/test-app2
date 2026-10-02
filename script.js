const questions = [
  {
    question: "地球のまわりを回っている天体はどれ？",
    choices: ["火星", "月", "太陽"],
    answer: 1,
    explanation: "月は地球のまわりを回っています。",
  },
  {
    question: "水がこおり始める温度は何度？",
    choices: ["0℃", "10℃", "100℃"],
    answer: 0,
    explanation: "水は通常、0℃でこおり始めます。",
  },
  {
    question: "日本で一番高い山はどれ？",
    choices: ["北岳", "槍ヶ岳", "富士山"],
    answer: 2,
    explanation: "富士山は標高3,776メートルです。",
  },
  {
    question: "植物が光を使って養分をつくるはたらきは？",
    choices: ["蒸発", "光合成", "発酵"],
    answer: 1,
    explanation: "植物は光合成で光から養分をつくります。",
  },
  {
    question: "1時間は何分？",
    choices: ["30分", "60分", "100分"],
    answer: 1,
    explanation: "1時間は60分です。",
  },
];

const progressElement = document.querySelector("#progress");
const scoreElement = document.querySelector("#score span");
const progressBar = document.querySelector("#progress-bar");
const questionElement = document.querySelector("#question");
const choicesElement = document.querySelector("#choices");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const resultElement = document.querySelector("#result");
const finalScoreElement = document.querySelector("#final-score");
const resultMessageElement = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");
let currentQuestion = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const item = questions[currentQuestion];
  answered = false;
  progressElement.textContent = `第${currentQuestion + 1}問 / ${questions.length}問`;
  scoreElement.textContent = score;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  questionElement.textContent = item.question;
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextButton.hidden = true;
  choicesElement.replaceChildren();

  item.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.setAttribute("aria-label", `${index + 1}番: ${choice}`);

    const letter = document.createElement("span");
    letter.className = "choice-letter";
    letter.setAttribute("aria-hidden", "true");
    letter.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = choice;
    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index, button));
    choicesElement.append(button);
  });
}

function selectAnswer(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;
  const item = questions[currentQuestion];
  const choiceButtons = choicesElement.querySelectorAll("button");
  choiceButtons.forEach((button) => {
    button.disabled = true;
  });

  if (selectedIndex === item.answer) {
    score += 1;
    selectedButton.classList.add("is-correct");
    feedbackElement.textContent = `正解！ ${item.explanation}`;
    feedbackElement.classList.add("correct");
  } else {
    selectedButton.classList.add("is-wrong");
    choiceButtons[item.answer].classList.add("is-correct");
    feedbackElement.textContent = `不正解。${item.explanation}`;
    feedbackElement.classList.add("incorrect");
  }

  scoreElement.textContent = score;
  nextButton.textContent = currentQuestion === questions.length - 1 ? "結果を見る" : "次の問題";
  nextButton.hidden = false;
  nextButton.focus();
}

function showResult() {
  questionElement.hidden = true;
  progressElement.hidden = true;
  scoreElement.parentElement.hidden = true;
  progressBar.parentElement.hidden = true;
  choicesElement.hidden = true;
  feedbackElement.hidden = true;
  nextButton.hidden = true;
  resultElement.hidden = false;
  finalScoreElement.textContent = `${score} / ${questions.length} 問正解`;
  resultMessageElement.textContent =
    score === questions.length ? "全問正解！すばらしい！" :
      score >= 3 ? "いい調子！よくできました。" : "よく挑戦しました。またチャレンジしてみよう！";
  restartButton.focus();
}

nextButton.addEventListener("click", () => {
  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    showResult();
    return;
  }
  renderQuestion();
  choicesElement.querySelector("button").focus();
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  questionElement.hidden = false;
  progressElement.hidden = false;
  scoreElement.parentElement.hidden = false;
  progressBar.parentElement.hidden = false;
  choicesElement.hidden = false;
  feedbackElement.hidden = false;
  resultElement.hidden = true;
  renderQuestion();
  choicesElement.querySelector("button").focus();
});

renderQuestion();
