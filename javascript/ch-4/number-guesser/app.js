
let min = 1;
let max = 10;
let winningNumber;
let retryRemaining = 3;
let playAgain = false; 

const input = document.querySelector('#guess-input');
const submitBtn = document.querySelector('#submit');
const result = document.querySelector('.result');

// set range in UI
document.querySelector('.min-val').textContent = min;
document.querySelector('.max-val').textContent = max;
submitBtn.addEventListener('click', submit);

generateWinningNumber();
input.focus();

function submit() {
    const guessValue = parseInt(input.value);

    if (playAgain) {
        reset();
        playAgain = false;
        return;
    }

    if (isNaN(guessValue)
        || guessValue < min
        || guessValue > max) {
        showMessage(`Please enter number between ${min} and ${max}.`, 'red');
        return;
    }

    if (guessValue === winningNumber) {
        showMessage(`Congratulations! You guessed it right!`, 'green');
        input.disabled = true;
        submitBtn.value = 'Play Again';
        playAgain = true;
    } else {
        retryRemaining -= 1;
        if (retryRemaining <= 0) {
            input.disabled = true;
            submitBtn.value = 'Play Again';
            playAgain = true;
            showMessage(`Incorrect. The correct number is ${winningNumber}.`, 'red');
            return;
        }
        showMessage(`Incorrect. ${retryRemaining} retries remaining.`, 'red');
        input.focus();
        input.value = '';
    }
}

function reset() {
    result.textContent = '';
    retryRemaining = 3;
    input.value = '';
    input.disabled = false;
    input.focus();
    submitBtn.value = 'Submit';
    input.style.borderColor = 'black';
    generateWinningNumber();
}

function showMessage(message, color) {
    result.textContent = message;
    result.style.color = color;
    input.style.borderColor = color;
}

function generateWinningNumber() {
    winningNumber = Math.floor(Math.random() * max) + min;
    
}