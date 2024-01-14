// Variable para llevar el control del nivel actual
let currentLevel = 1;

// Palabras a encontrar en cada nivel
const levelsData = {
    1: ['MANZANA', 'COCO', 'UVA'],
    2: ['FLOR', 'SOL', 'LUNA'],
    3: ['ARBOL', 'RIO', 'MONTANA'],
    4: ['CASA', 'CARRO', 'AVION'],
    5: ['LAPIZ', 'LIBRO', 'CUADERNO']
};

let targetWords = levelsData[currentLevel]; // Palabras iniciales

// Contador de palabras encontradas
let foundWords = 0;

// Función para generar la fila de letras y palabras del nivel
function generateLetterRow(level) {
    const letterRowElement = document.getElementById('letter-row');
    const targetWordsList = document.getElementById('target-words-list');

    // Obtener palabras y letras del nivel actual
    const words = levelsData[level];
    const letters = getLettersForWords(words);

    // Limpiar la fila de letras y la lista de palabras
    letterRowElement.innerHTML = '';
    targetWordsList.innerHTML = '';

    letters.forEach(letter => {
        const letterTile = document.createElement('div');
        letterTile.classList.add('letter-tile');
        letterTile.innerText = letter;
        letterTile.onclick = function() {
            selectLetter(letter);
        };
        letterRowElement.appendChild(letterTile);
    });

    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.innerText = word;
        targetWordsList.appendChild(listItem);
    });
}

// Función para obtener letras relacionadas con las palabras y respetar repeticiones
function getLettersForWords(words) {
    const allLetters = words.join('').toUpperCase();
    const letters = allLetters.split('');

    // Barajar las letras aleatoriamente
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    return letters;
}

// Función para seleccionar una letra
function selectLetter(letter) {
    console.log("Letra seleccionada: ", letter);
}

// Función para comprobar la palabra ingresada por el usuario
function checkWord() {
    const userWordInput = document.getElementById('user-word');
    const userWord = userWordInput.value.toUpperCase();

    if (targetWords.includes(userWord)) {
        foundWords++;
        updateProgress();
        userWordInput.value = '';

        if (foundWords === targetWords.length) {
            document.getElementById('next-level-button').removeAttribute('disabled');
        }
    } else {
        alert('¡Inténtalo de nuevo! La palabra no es correcta.');
    }
}

// Función para actualizar el progreso del jugador
function updateProgress() {
    document.getElementById('found-words').innerText = foundWords;
}

// Función para pasar al siguiente nivel
function goToNextLevel() {
    alert('¡Felicidades! Has desbloqueado el siguiente nivel.');

    // Incrementar el nivel actual
    currentLevel++;

    // Verificar si hay más niveles disponibles
    if (levelsData[currentLevel]) {
        // Obtener palabras del próximo nivel
        targetWords = levelsData[currentLevel];

        // Generar la fila de letras y palabras para el próximo nivel
        generateLetterRow(currentLevel);

        // Restablecer el contador de palabras encontradas
        foundWords = 0;
        updateProgress();

        // Deshabilitar el botón hasta que se encuentren todas las palabras del nuevo nivel
        document.getElementById('next-level-button').setAttribute('disabled', 'true');
    } else {
        // Si no hay más niveles, mostrar un mensaje de finalización o redirigir a otra página
        alert('¡Has completado todos los niveles!');
    }
}

// Generar la fila de letras y palabras del nivel al cargar la página
window.onload = function() {
    generateLetterRow(currentLevel);
};
