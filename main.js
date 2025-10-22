'use strict';

const playerDisplay = document.getElementById('player-display');
const computerDisplay = document.getElementById('computer-display');
const scoreDisplay = document.getElementById('score');

let gameStarted = false;
let gameInProgress = false;
let checkingInput = false;
let showingNumbers = false;
let amountOfNumbers = 5;
let startingTime = 1200;
let numberChecked = 0;
let currentLowNumber = 0;
let currentHighNumber = 9;
let numbers = [];
let round = 1;
let currentScore = 0;

function playerTurn() {
  window.addEventListener('keydown', keyDownHandler);
}

function keyDownHandler(e) {
  // player cannot input anything until number showing sequence complete
  if (showingNumbers || e.repeat) {
    return;
  }
  let keyPressed = e.key;
  console.log(keyPressed);

  if (!gameStarted && keyPressed === ' ' && !gameInProgress) {
    gameStarted = true;
    gameInProgress = true;
    numbers = [];
    for (let i = 0; i < amountOfNumbers; i++) {
      numbers.push(getRandomInt(currentLowNumber, currentHighNumber));
    }
    console.log(numbers);

    displayNumbers(numbers, startingTime);
  } else {
    let keyPressedNumber = parseInt(keyPressed);
    if (keyPressedNumber >= 0 && keyPressedNumber <= 9) {
      handlePlayerInput(keyPressed, numbers);
    } else {
      console.log('non-number pressed');
    }
  }
  if (keyPressed === 'q') {
    window.removeEventListener('keydown', keyDownHandler);
  }
  if (keyPressed === 'a') {
    console.log(getRandomInt(1, 10));
  }
}

function showMessage(message = 'nothing') {
  computerDisplay.innerHTML = `<p>${message}</p>`;
}

function getRandomInt(min = 0, max = 9) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function displayNumbers(numbers = [], delayMs = 1000) {
  showingNumbers = true; // disable player input for this
  for (let a = 3; a > 0; a--) {
    showMessage(`GET READY! Round ${round} starts in... ${a}`);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  for (let i = 0; i < numbers.length + 1; i++) {
    // TODO need to resolve what happens when same numbers succeed one another
    // await new Promise((resolve) => setTimeout(resolve, delayMs));
    if (numbers[i] || numbers[i] === 0) {
      showMessage(`<p id="the-numbers">${numbers[i]}</p>`);
      // Add a brief pause with empty screen
      await new Promise((resolve) => setTimeout(resolve, delayMs)); // blank time
      showMessage(' ');
      await new Promise((resolve) => setTimeout(resolve, 150)); // short gap
    } else {
      showMessage(' ');
    }
  }
  gameStarted = false;
  showingNumbers = false; // restore player input
}

function handlePlayerInput(keyPressed, numbers) {
  if (checkingInput) {
    return;
  }
  checkingInput = true;
  console.log(keyPressed);
  if (keyPressed == numbers[numberChecked]) {
    console.log('🟢 CORRECT!');
    numberChecked += 1;
    if (numberChecked === numbers.length) {
      showMessage('CORRECT! Press SPACE to start the next round...');
      round += 1;
      currentScore += 1;
      scoreDisplay.innerHTML = `<p>Score Now: ${currentScore}</p>`;

      if (round % 3 === 0) {
        amountOfNumbers += 1;
        if (startingTime > 399) {
          startingTime -= 200;
        }
      }
      gameStarted = false;
      gameInProgress = false;
      numbers = [];
      numberChecked = 0;
    }
    checkingInput = false;
    return;
  } else {
    console.log('🔴 WRONG!');
    console.log(
      'keyPressed',
      keyPressed,
      'numberChecked',
      numberChecked,
      'numbers[numberChecked',
      numbers[numberChecked]
    );
    gameOver();
  }
}

function gameOver() {
  console.log('Game Over');
  gameInProgress = false;
  numbers = [];
  numberChecked = 0;
  checkingInput = false;
  gameStarted = false;
  showMessage('Press SPACE to try again');
}

playerTurn();
