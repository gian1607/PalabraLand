const levelsData = [
    { description: 'Un animal doméstico que maulla.' },
    { description: 'Un vehículo con alas que vuela en el cielo.' },
    { description: 'Un instrumento musical de cuerdas.' },
    { description: 'Un animal salvaje con rayas negras y naranjas.' },
    { description: 'Una bebida caliente que la gente suele tomar por la mañana.' },
    { description: 'Una fruta amarilla que los monos adoran.' },
    { description: 'Un insecto que produce miel.' },
    { description: 'Un deporte jugado con una pelota y una red.' },
    { description: 'Un planeta que es el tercero desde el sol.' },
    { description: 'Un objeto que usamos para escribir en papel.' },
];

let currentLevel = 0;
const totalLevels = levelsData.length;

const descriptionText = document.getElementById('description-text');
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const resultMessage = document.getElementById('result-message');
const nextLevelBtn = document.getElementById('next-level-btn');

function loadLevel() {
    descriptionText.textContent = levelsData[currentLevel].description;
    userInput.value = '';
    resultMessage.textContent = '';
    nextLevelBtn.setAttribute('disabled', true);
}

function checkAnswer() {
    const userAnswer = userInput.value.toLowerCase();
    const correctAnswer = getCorrectAnswer();

    if (userAnswer === correctAnswer) {
        resultMessage.textContent = '¡Correcto! ¡Bien hecho!';
        nextLevelBtn.removeAttribute('disabled');
    } else {
        resultMessage.textContent = 'Respuesta incorrecta. ¡Intenta de nuevo!';
    }
}

function getCorrectAnswer() {
    switch (currentLevel) {
        case 0:
            return 'gato';
        case 1:
            return 'avion';
        case 2:
            return 'guitarra';
        case 3:
            return 'tigre';
        case 4:
            return 'cafe';
        case 5:
            return 'platano';
        case 6:
            return 'abeja';
        case 7:
            return 'tenis';
        case 8:
            return 'tierra';
        case 9:
            return 'lapiz';
        default:
            return 'respuesta';
    }
}

function goToNextLevel() {
    currentLevel++;

    if (currentLevel < totalLevels) {
        loadLevel();
    } else {
        alert('¡Has completado todos los niveles!');
        resetGame();
    }
}

function resetGame() {
    currentLevel = 0;
    loadLevel();
}

checkBtn.addEventListener('click', checkAnswer);
nextLevelBtn.addEventListener('click', goToNextLevel);

// Inicia el juego cargando el primer nivel
loadLevel();
