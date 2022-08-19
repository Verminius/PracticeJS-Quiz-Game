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
    choice1: "En caneca verde",
    choice2: "En caneca gris para ser reutilizado",
    choice3: "En contenedor rígido específico o guardián",
    choice4: "En caneca roja por ser biosanitarios",
    answer: 4,
  },
  {
    question: "El lavado de manos previene",
    choice1: "Enfermedades psicologicas",
    choice2: "Enfermedades infectocontagiosas",
    choice3: "La migraña",
    choice4: "El embarazo",
    answer: 2,
  },

  {
    question:
      "En lo que respecta a los elementos de protección personal es cierto:",
    choice1: "Favorecen el contacto directo con sustancias.",
    choice2: "No son responsabilidad del empleador.",
    choice3:
      "Son responsabilidad compartida entre el empleador y el trabajador.",
    choice4: "No son responsabilidad del trabajador.",
    answer: 3,
  },

  {
    question: "La eficácia de la vacunación de Hepatitis B se valida con:",
    choice1: "Titulaciones",
    choice2: "Coprológico",
    choice3: "Gases Arteriales",
    choice4: "Valoración médica",
    answer: 4,
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
    choice1: "Gorro",
    choice2: "Gafas de seguridad",
    choice3: "Uniforme antifluido",
    choice4: "Tapabocas",
    answer: 2,
  },
  {
    question: "Son causas de accidentes por objeto corto-punzante, excepto:",
    choice1:
      "El paciente se mueve de manera repentina durante el procedimiento",
    choice2: "No depositar de inmediato el corto-punzante en el guardián",
    choice3: "Doblar o partir agujas manualmente",
    choice4: "Transportar objetos corto-punzantes protegidos",
    answer: 4,
  },
  {
    question:
      "Son acciones preventivas para el manejo de objetos corto-punzantes, excepto:",
    choice1: "Usar los EPP de acuerdo al procedimiento",
    choice2: "Re-encapuchar las agujas",
    choice3: "Descartar la aguja en el guardián con la mano que venopuncionó",
    choice4: "Solicitar ayuda en casos especiales",
    answer: 3,
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
    choice1: "Girar para buscar el guardián",
    choice2: "Lo hago como puedo",
    choice3: "Todas son correctas",
    choice4: "Descartar la aguja en el guardián con la mano que venopuncionó",
    answer: 4,
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
  progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`;
  progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

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

//modales

// llamada
const llamada = document.querySelector("#llamada");
const llamadaBtn = document.querySelector("#llamada-btn");
const llamadaText = document.querySelector("#respuesta-llamada");

var respuestas = [
  "Es la Opción A",
  "Creo que es B",
  "Debe ser C",
  "Seguro es la D",
];

console.log(respuestas);

const callAnswers = {
  "Es la Opción A": 0,
  "Creo que es B": 1,
  "Debe ser C": 2,
  "Seguro es la D": 3,
};

//tanto para esto nada mas?

function getRandomProperty(callAnswers) {
  const keys = Object.keys(callAnswers);

  return keys[Math.floor(Math.random() * keys.length)];
}

let finalAnswer = getRandomProperty(callAnswers);

function respuestaAleatoria() {
  let contenedorRespuesta = document.querySelector("#textoLlamada");

  var textoRespuesta = document.createElement("p");

  textoRespuesta.innerHTML =
    '<p class="respuesta-llamada">' + finalAnswer + "</p>";

  contenedorRespuesta.appendChild(textoRespuesta);
}

// function respuestaAleatoria() {
//     var contenedorRespuesta = document.querySelector("#textoLlamada");

//     contenedorRespuesta.innerHTML = "";

//     respuestas.forEach(function(e) {
//         var textoRespuesta = document.createElement("p");

//         textoRespuesta.innerHTML = '<p class="respuesta-llamada">' + e + "</p>";

//         contenedorRespuesta.appendChild(textoRespuesta);
//     });
// }

respuestaAleatoria();

function activarLlamada() {
  llamadaBtn.addEventListener("click", function () {
    llamada.classList.toggle("visible");
  });
}

activarLlamada();

// publico

const publico = document.querySelector("#publico");
const publicoBtn = document.querySelector("#publico-btn");

function activarPublico() {
  publicoBtn.addEventListener("click", function () {
    publico.classList.toggle("visible");
  });
}

activarPublico();

startGame();
