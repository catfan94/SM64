const quizData = [
    {
        question: 'In what year was SM64 released?',
        options: ['1996', '2000', '1998', '1990'],
        answer: '1996',
    },
    {
        question: 'Who is the Super Mario creator?',
        options: ['Yoshiaki Koizumi', 'Shigeru Miyamoto', 'Koiji Kondo', 'Charles Martinet'],
        answer: 'Shigeru Miyamoto',
    },
    {
        question: 'What is the name of the swimming beast in Hazy Maze Cave?',
        options: ['Mips', 'Bowser', 'Luigi', 'Dorrie'],
        answer: 'Dorrie',
    },
    {
        question: 'How many total courses are there in the game (not including secrete stages)?',
        options: ['3', '11', '20', '15'],
        answer: '15',
    },
    {
        question: 'How many power caps are in the game?',
        options: ['2', '9', '0', '3' ],
        answer: '3',
    },
]

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');

    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        }
        else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswers: answer,
                correctAnswer: quizData[currentQuestion].answer,
            })
        }
        currentQuestion++;

        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        }
        else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Your score: ${score} out of ${quizData.length}`;
}

function retryQuiz() {
    currentQuestion = 0;
     score = 0;
     incorrectAnswers = [];
     quizContainer.style.display = 'block';
     submitButton.style.display = 'inline-block';
     retryButton.style.display = 'none';
     showAnswerButton.style.display = 'none';
     resultContainer.innerHTML = '';
     displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
        <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer: </strong> ${incorrectAnswers[i].incorrectAnswers}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
        `;
    }

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();