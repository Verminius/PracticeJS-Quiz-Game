const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "¿El riesgo biológico es originado por?",
    choice1: "Microorganismos",
    choice2: "Radiaciones ionzantes",
    choice3: "Quimicos",
    choice4: "Electricidad",
    answer: 3,
  },
  {
    question: "Un ejemplo de objetos corto-punzantes pueden ser:",
    choice1: "Agujas, hojas  bisturi y papel",
    choice2: "Agujas, ampolletas, algodones",
    choice3: "Lancetas, agujas y ampolletas",
    choice4: "Lancetas, bajalenguas y ampolletas",
    answer: 1,
  },
  {
    question:
      "La disposición de guantes, gasas, ropa desechable contaminada se hace:",
    choice1: "En caneca roja por ser biosanitarios",
    choice2: "En caneca verde",
    choice3: "En caneca gris para ser reutilizado",
    choice4: "En contenedor rígido específico o guardián",
    answer: 1,
  },
  {
    question: "El lavado de manos previene",
    choice1: "Enfermedades infectocontagiosas",
    choice2: "Enfermedades psicologicas",
    choice3: "La migraña",
    choice4: "El embarazo",
    answer: 1,
  },

  {
    question:
      "En lo que respecta a los elementos de protección personal es cierto:",
    choice1:
      "Son responsabilidad compartida entre el empleador y el trabajador.",
    choice2: "Favorecen el contacto directo con sustancias.",
    choice3: "No son responsabilidad del empleador.",
    choice4: "No son responsabilidad del trabajador.",
    answer: 1,
  },

  {
    question: "La eficácia de la vacunación de Hepatitis B se valida con:",
    choice1: "Valoración médica",
    choice2: "Titulaciones",
    choice3: "Coprológico",
    choice4: "Gases Arteriales",
    answer: 1,
  },
  {
    question: "Doblar o partir agujas manualmente…",
    choice1: "Es una causal de accidentes",
    choice2: "Es una práctica de Trabajo seguro",
    choice3: "Es necesario para desecharlas",
    choice4: "Ninguna de las anteriores",
    answer: 1,
  },
  {
    question: "Para la prevención de salpicaduras en los ojos utilíce:",
    choice1: "Gafas de seguridad",
    choice2: "Gorro",
    choice3: "Uniforme antifluido",
    choice4: "Tapabocas",
    answer: 1,
  },
  {
    question: "Son causas de accidentes por objeto corto-punzante, excepto:",
    choice1: "Transportar objetos corto-punzantes protegidos",
    choice2:
      "El paciente se mueve de manera repentina durante el procedimiento",
    choice3: "No depositar de inmediato el corto-punzante en el guardián",
    choice4: "Doblar o partir agujas manualmente",
    answer: 1,
  },
  {
    question:
      "Son acciones preventivas para el manejo de objetos corto-punzantes, excepto:",
    choice1: "Descartar la aguja en el guardián con la mano que venopuncionó",
    choice2: "Usar los EPP de acuerdo al procedimiento",
    choice3: "Re-encapuchar las agujas",
    choice4: "Solicitar ayuda en casos especiales",
    answer: 1,
  },
  {
    question: "Son ejemplos de comportamientos seguros, excepto:",
    choice1: "Dejar las agujas abandonadas",
    choice2: "Depositar las agujas en el guardián",
    choice3: "Lavarse las manos después de un procedimiento",
    choice4: "Usar los EPP en forma correcta",
    answer: 1,
  },
  {
    question:
      "La técnica para descarte de agujas en área asistencial consiste en:",
    choice1: "Descartar la aguja en el guardián con la mano que venopuncionó",
    choice2: "Lo hago como puedo",
    choice3: "Re-encapuchar las agujas",
    choice4: "Solicitar ayuda en casos especiales",
    answer: 1,
  },
  {
    question:
      "Son acciones preventivas para el manejo de objetos corto-punzantes, excepto:",
    choice1: "Descartar la aguja en el guardián con la mano que venopuncionó",
    choice2: "Girar para buscar el guardián",
    choice3: "Lo hago como puedo",
    choice4: "Todas son correctas",
    answer: 1,
  },
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 13;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
};

getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    }, 900);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
