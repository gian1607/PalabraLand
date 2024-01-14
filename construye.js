const wordDisplay = document.getElementById('word-display');
const wordInput1 = document.getElementById('word-input-1');
const wordInput2 = document.getElementById('word-input-2');
const submitWordsBtn = document.getElementById('submit-words-btn');
const resultMessage = document.getElementById('result-message');
const lettersDisplay = document.getElementById('letters-display');

let letters = [];

function generateLetters() {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

    // Generar al menos 5 vocales
    for (let i = 0; i < 5; i++) {
        const randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
        letters.push(randomVowel);
    }

    // Generar al menos 10 consonantes
    for (let i = 0; i < 10; i++) {
        const randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
        letters.push(randomConsonant);
    }

    // Barajar las letras para que no estén en orden
    letters = shuffleArray(letters);
}

// Función para barajar un array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function updateLettersDisplay() {
    lettersDisplay.textContent = `Letras Disponibles: ${letters.join(', ')}`;
}

function submitWords() {
    const userWord1 = wordInput1.value.trim().toUpperCase();
    const userWord2 = wordInput2.value.trim().toUpperCase();

    // Verificar que ambas palabras tengan al menos una letra en las letras generadas
    const validWords = userWord1.split('').some(letter => letters.includes(letter)) &&
                       userWord2.split('').some(letter => letters.includes(letter));

    if (validWords) {
        resultMessage.textContent = `¡Palabras enviadas: ${userWord1} y ${userWord2}!`;
        // Limpiar las palabras y generar nuevas letras
        wordInput1.value = '';
        wordInput2.value = '';
        letters = [];
        generateLetters();
        updateLettersDisplay();
    } else {
        alert('Ambas palabras deben contener al menos una letra de las letras generadas.');
    }
}

// Inicializar el juego
generateLetters();
updateLettersDisplay();

submitWordsBtn.addEventListener('click', submitWords);

