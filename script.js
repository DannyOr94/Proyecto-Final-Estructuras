document.addEventListener('DOMContentLoaded', () => {
    const cards = [];
    let chosenCard = null;
    let attempts = 0;

    const welcomeSection = document.getElementById('welcomeSection');
    const addCardsSection = document.getElementById('addCardsSection');
    const removeCardsSection = document.getElementById('removeCardsSection');
    const guessSection = document.getElementById('guessSection');
    const cardElement = document.getElementById('card'); // Cambio realizado aquí
    const cardRemoveElement = document.getElementById('cardRemove'); // Cambio realizado aquí
    const cardGuessElement = document.getElementById('cardGuess'); // Cambio realizado aquí
    const messageElement = document.getElementById('message');
    
    document.getElementById('startButton').addEventListener('click', () => {
        welcomeSection.classList.remove('active');
        addCardsSection.classList.add('active');
    });

    document.getElementById('addCardButton').addEventListener('click', addCard);
    document.getElementById('removeCardButton').addEventListener('click', removeCardByIndex);
    document.getElementById('removeCardByValueButton').addEventListener('click', removeCardByValue);
    document.getElementById('reAddCardButton').addEventListener('click', reAddCard);
    document.getElementById('toRemoveSectionButton').addEventListener('click', () => {
        addCardsSection.classList.remove('active');
        removeCardsSection.classList.add('active');
        renderCards(cardRemoveElement);
    });
    document.getElementById('toGuessSectionButton').addEventListener('click', () => {
        if (cards.length === 5) {
            removeCardsSection.classList.remove('active');
            guessSection.classList.add('active');
            chosenCard = cards[Math.floor(Math.random() * cards.length)];
            setMessage('He escogido una carta. Es tu turno de adivinarla. Puedes eliminar hasta 3 cartas.');
            renderCards(cardGuessElement);
        } else {
            setMessage(`Te faltan ${5 - cards.length} cartas para continuar.`);
        }
    });
    document.getElementById('removeCardButtonGuess').addEventListener('click', removeCardByIndexGuess);
    document.getElementById('removeCardByValueButtonGuess').addEventListener('click', removeCardByValueGuess);
    document.getElementById('guessCardButton').addEventListener('click', guessCard);
    document.getElementById('resetButton').addEventListener('click', resetGame);

    function addCard() {
        const cardValueInput = document.getElementById('cardValue');
        const cardValue = parseInt(cardValueInput.value);

        if (isNaN(cardValue) || cardValue < 1 || cardValue > 13) {
            setMessage('Por favor ingresa un valor válido entre 1 y 13.');
            return;
        }

        if (cards.includes(cardValue)) {
            setMessage('No puedes agregar cartas duplicadas.');
            return;
        }

        if (cards.length >= 5) {
            setMessage('No puedes agregar más de 5 cartas.');
            return;
        }

        cards.push(cardValue); // Inserción en el array
        cardValueInput.value = '';
        renderCards(cardElement);

        if (cards.length === 5) {
            document.getElementById('toRemoveSectionButton').classList.remove('hidden');
        }
    }

    function removeCardByIndex() {
        const removeCardIndexInput = document.getElementById('removeCardIndex');
        const index = parseInt(removeCardIndexInput.value);

        if (isNaN(index) || index < 0 || index >= cards.length) {
            setMessage('Por favor ingresa un índice válido.');
            return;
        }

        cards.splice(index, 1); // Eliminación en el array
        removeCardIndexInput.value = '';
        renderCards(cardRemoveElement);

        if (cards.length < 5) {
            document.getElementById('toRemoveSectionButton').classList.add('hidden');
            setMessage(`Te faltan ${5 - cards.length} cartas para continuar.`);
        }
    }

    function removeCardByValue() {
        const removeCardValueInput = document.getElementById('removeCardValue');
        const value = parseInt(removeCardValueInput.value);
        const index = cards.indexOf(value);

        if (index === -1) {
            setMessage('Valor no encontrado en el array.');
            return;
        }

        cards.splice(index, 1); // Eliminación en el array
        removeCardValueInput.value = '';
        renderCards(cardRemoveElement);

        if (cards.length < 5) {
            document.getElementById('toRemoveSectionButton').classList.add('hidden');
            setMessage(`Te faltan ${5 - cards.length} cartas para continuar.`);
        }
    }

    function reAddCard() {
        const reAddCardValueInput = document.getElementById('reAddCardValue');
        const cardValue = parseInt(reAddCardValueInput.value);

        if (isNaN(cardValue) || cardValue < 1 || cardValue > 13) {
            setMessage('Por favor ingresa un valor válido entre 1 y 13.');
            return;
        }

        if (cards.includes(cardValue)) {
            setMessage('No puedes agregar cartas duplicadas.');
            return;
        }

        if (cards.length >= 5) {
            setMessage('No puedes agregar más de 5 cartas.');
            return;
        }

        cards.push(cardValue); // Inserción en el array
        reAddCardValueInput.value = '';
        renderCards(cardRemoveElement);

        if (cards.length === 5) {
            document.getElementById('toRemoveSectionButton').classList.remove('hidden');
        }
    }

    function removeCardByIndexGuess() {
        const removeCardIndexGuessInput = document.getElementById('removeCardIndexGuess');
        const index = parseInt(removeCardIndexGuessInput.value);

        if (isNaN(index) || index < 0 || index >= cards.length) {
            setMessage('Por favor ingresa un índice válido.');
            return;
        }

        if (attempts >= 3) {
            setMessage('Has alcanzado el límite de 3 intentos para eliminar cartas.');
            return;
        }

        cards.splice(index, 1); // Eliminación en el array
        attempts++;
        removeCardIndexGuessInput.value = '';
        renderCards(cardGuessElement);
    }

    function removeCardByValueGuess() {
        const removeCardValueGuessInput = document.getElementById('removeCardValueGuess');
        const value = parseInt(removeCardValueGuessInput.value);
        const index = cards.indexOf(value);

        if (index === -1) {
            setMessage('Valor no encontrado en el array.');
            return;
        }

        if (attempts >= 3) {
            setMessage('Has alcanzado el límite de 3 intentos para eliminar cartas.');
            return;
        }

        cards.splice(index, 1); // Eliminación en el array
        attempts++;
        removeCardValueGuessInput.value = '';
        renderCards(cardGuessElement);
    }

    function guessCard() {
        const guessCardValueInput = document.getElementById('guessCardValue');
        const guessValue = parseInt(guessCardValueInput.value);

        if (isNaN(guessValue) || guessValue < 1 || guessValue > 13) {
            setMessage('Por favor ingresa un valor válido entre 1 y 13.');
            return;
        }

        if (guessValue === chosenCard) {
            setMessage(`¡Felicidades! Adivinaste la carta correcta: ${chosenCard}`);
        } else {
            setMessage(`Perdiste. La carta correcta era: ${chosenCard}`);
        }
    }

    function renderCards(element) {
        element.innerHTML = '';
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.textContent = `Índice: ${index}, Valor: ${card}`;
            element.appendChild(cardElement);
        });
    }

    function setMessage(message) {
        messageElement.textContent = message;
    }

    function resetGame() {
        cards.length = 0;
        chosenCard = null;
        attempts = 0;
        renderCards(cardElement);
        renderCards(cardRemoveElement);
        renderCards(cardGuessElement);
        setMessage('El juego ha sido reiniciado.');
        document.getElementById('cardValue').value = '';
        document.getElementById('removeCardIndex').value = '';
        document.getElementById('removeCardValue').value = '';
        document.getElementById('reAddCardValue').value = '';
        document.getElementById('guessCardValue').value = '';
        document.getElementById('toRemoveSectionButton').classList.add('hidden');
        addCardsSection.classList.remove('active');
        removeCardsSection.classList.remove('active');
        guessSection.classList.remove('active');
        welcomeSection.classList.add('active');
    }
});
