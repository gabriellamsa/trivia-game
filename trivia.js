// variáveis globais para acessar elementos DOM
const questionDiv = document.getElementById('question');
const answerDiv = document.getElementById('answer');
const feedbackDiv = document.getElementById('feedback');

// variáveis para armazenar a pergunta atual e as pontuações
let currentQuestion = null;
let playerScores = [0, 0];
let totalQuestions = 0;
let currentPlayer = 0; // 0 para Player 1, 1 para Player 2

// função para simular a procura de pergunta aleatória 
function getTriviaQuestion() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const index = Math.floor(Math.random() * questions.length);
                if (index >= questions.length) {
                    throw new Error('Index out of bounds');
                }
                const question = questions[index];
                resolve(question);
            } catch (error) {
                reject('An error occurred while fetching the trivia question.');
            }
        }, 1000); // delay de 1 seg
    });
}

// função para apresentar a pergunta na UI
function displayQuestion(triviaQuestion) {
    questionDiv.textContent = triviaQuestion.question;
    answerDiv.value = ''; // limpa o input
    feedbackDiv.textContent = ''; // limpa feedback
    document.getElementById('player').textContent = `Player ${currentPlayer + 1}'s turn`;
}

// função para atualizar a pontuação
function updateScore(isCorrect) {
    totalQuestions++;
    if (isCorrect) {
        playerScores[currentPlayer]++;
    }
    document.getElementById('score').textContent = `Player 1: ${playerScores[0]} | Player 2: ${playerScores[1]} | Total Questions: ${totalQuestions}`;
}

// Event listener para o botão "New Question" 
document.getElementById('questionBtn').addEventListener('click', () => {
    getTriviaQuestion().then(question => {
        currentQuestion = question;
        displayQuestion(question);
    }).catch(error => {
        feedbackDiv.textContent = error;
    });
});

// Event listener para o botão "Submit Answer" 
document.getElementById('answerBtn').addEventListener('click', () => {
    const userAnswer = answerDiv.value.trim().toLowerCase();
    if (currentQuestion) {
        const correctAnswer = currentQuestion.answer.trim().toLowerCase();
        if (userAnswer === correctAnswer) {
            feedbackDiv.textContent = 'Correct!';
            feedbackDiv.classList.add('correct');
            feedbackDiv.classList.remove('incorrect');
            updateScore(true);
        } else {
            feedbackDiv.textContent = `Incorrect! The correct answer is: ${currentQuestion.answer}`;
            feedbackDiv.classList.add('incorrect');
            feedbackDiv.classList.remove('correct');
            updateScore(false);
        }
        // mudar para o próximo jogador
        currentPlayer = 1 - currentPlayer;
        document.getElementById('player').textContent = `Player ${currentPlayer + 1}'s turn`;
    }
});
