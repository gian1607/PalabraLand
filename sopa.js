let currentLevel = 1;
const totalLevels = 15;
const levelsData = {
    1: ['GATO', 'PERRO', 'RATON'],
    2: ['LEON', 'CEBRA', 'JIRAFA'],
    3: ['ELEFANTE', 'HIPOPOTAMO', 'COCODRILO'],
    4: ['PAJARO', 'MARIPOSA', 'PECES'],
    5: ['OSO', 'CONEJO', 'TIGRE'],
    6: ['ARBOL', 'FLOR', 'HOJA'],
    7: ['PIZZA', 'HAMBURGUESA', 'HELADO'],
    8: ['AVION', 'BARCO', 'AUTO'],
    9: ['NUMERO', 'LETRA', 'SIMBOLO'],
    10: ['CIRCULO', 'CUADRADO', 'TRIANGULO'],
    11: ['AZUL', 'ROJO', 'VERDE'],
    12: ['CIELO', 'SOL', 'LUNA'],
    13: ['MONTANA', 'RIO', 'PLAYA'],
    14: ['LIBRO', 'LAPIZ', 'CUADERNO'],
    15: ['FELIZ', 'TRISTE', 'ENOJADO']
};
let targetWords = levelsData[currentLevel];

const gameContainer = document.getElementById('game-container');
const wordListContainer = document.getElementById('word-list-container');
const wordList = document.createElement('div');
wordList.id = 'word-list';
wordListContainer.appendChild(wordList);

const puzzleContainer = document.getElementById('puzzle-container');
const wordCountDisplay = document.getElementById('word-count');
const nextLevelBtn = document.getElementById('next-level-btn');

const puzzleGrid = [];

for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = i;
        cell.dataset.col = j;
        row.push(cell);
        puzzleContainer.appendChild(cell);
    }
    puzzleGrid.push(row);
}

function getRandomDirection() {
    const directions = ['horizontal', 'vertical', 'diagonal'];
    return directions[Math.floor(Math.random() * directions.length)];
}

function fillGridWithLetters() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            puzzleGrid[i][j].innerText = randomLetter;
        }
    }
}

function placeWords(words) {
    words.forEach(word => {
        const direction = getRandomDirection();
        let row, col;

        if (direction === 'horizontal') {
            row = Math.floor(Math.random() * 8);
            col = Math.floor(Math.random() * (8 - word.length + 1));
        } else if (direction === 'vertical') {
            row = Math.floor(Math.random() * (8 - word.length + 1));
            col = Math.floor(Math.random() * 8);
        } else if (direction === 'diagonal') {
            row = Math.floor(Math.random() * (8 - word.length + 1));
            col = Math.floor(Math.random() * (8 - word.length + 1));
        }

        for (let i = 0; i < word.length; i++) {
            const cell = puzzleGrid[row][col];
            cell.innerText = word[i];
            cell.classList.add('hidden');
            row += (direction === 'vertical' || direction === 'diagonal') ? 1 : 0;
            col += (direction === 'horizontal' || direction === 'diagonal') ? 1 : 0;
        }
    });
}

function createWordList() {
    wordList.innerHTML = '';
    targetWords.forEach(word => {
        const listItem = document.createElement('div');
        listItem.classList.add('word-list-item');
        listItem.innerText = word;
        wordList.appendChild(listItem);
    });
}

function selectLetter(row, col) {
    const cell = puzzleGrid[row][col];
    cell.classList.toggle('selected');
}

function checkAnyWord() {
    let foundWord = false;

    targetWords.forEach(word => {
        const selectedCells = document.querySelectorAll('.selected');
        let selectedWord = '';

        selectedCells.forEach(cell => {
            selectedWord += cell.innerText;
        });

        if (selectedWord === word) {
            foundWord = true;
        }
    });

    return foundWord;
}

function goToNextLevel() {
    currentLevel++;

    if (currentLevel <= totalLevels) {
        targetWords = levelsData[currentLevel];
        createWordList();
        fillGridWithLetters();
        placeWords(targetWords);

        // Limpiar las letras seleccionadas
        document.querySelectorAll('.selected').forEach(cell => {
            cell.classList.remove('selected');
        });

        wordCountDisplay.textContent = 'Palabras encontradas: 0';
        nextLevelBtn.setAttribute('disabled', true);
    } else {
        alert('¡Has completado todos los niveles!');
        resetGame();
    }
}

function resetGame() {
    currentLevel = 1;
    targetWords = levelsData[currentLevel];
    createWordList();
    fillGridWithLetters();
    placeWords(targetWords);
    wordCountDisplay.textContent = 'Palabras encontradas: 0';
}

puzzleGrid.forEach(row => {
    row.forEach(cell => {
        cell.addEventListener('click', () => {
            const clickedRow = parseInt(cell.dataset.row);
            const clickedCol = parseInt(cell.dataset.col);

            selectLetter(clickedRow, clickedCol);

            if (checkAnyWord()) {
                wordCountDisplay.textContent = 'Palabra encontrada. ¡Siguiente nivel!';
                nextLevelBtn.removeAttribute('disabled');
            } else {
                wordCountDisplay.textContent = 'Palabras encontradas: 0';
                nextLevelBtn.setAttribute('disabled', true);
            }
        });
    });
});

nextLevelBtn.addEventListener('click', () => {
    goToNextLevel();
});

window.onload = function() {
    createWordList();
    fillGridWithLetters();
    placeWords(targetWords);
};








