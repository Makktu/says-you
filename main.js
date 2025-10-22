'use strict';

const playerDisplay = document.getElementById('player-display');
const computerDisplay = document.getElementById('computer-display');

let gameStarted = false;
let amountOfNumbers = 5;

function playerTurn() {
  window.addEventListener('keydown', keyDownHandler);
}

function keyDownHandler(e) {
  let keyPressed = e.key;
  console.log(keyPressed);
  if (!gameStarted && keyPressed === ' ') {
    showMessage('game on!');
    gameStarted = true;
    let numbers = [];
    for (let i = 0; i < amountOfNumbers; i++) {
      numbers.push(getRandomInt(1, 10));
    }
    console.log(numbers);

    displayNumbers(numbers, 400);
  }
  if (keyPressed === 'q') {
    window.removeEventListener('keydown', keyDownHandler);
  }
  if (keyPressed === 'a') {
    console.log(getRandomInt(1, 10));
  }
  // switch (keyPressed) {
  //   case 'q':
  //     window.removeEventListener('keydown', keyDownHandler);
  //     break;
  //   case 'a':
  //     console.log(getRandomInt(1, 10));
  //     break;
  //   default:
  //     break;
  // }
}

function showMessage(message = 'nothing') {
  computerDisplay.innerHTML = `<p>${message}</p>`;
}

function getRandomInt(min = 1, max = 100) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function displayNumbers(numbers = [], delayMs = 1000) {
  for (let i = 0; i < numbers.length + 1; i++) {
    // need to resolve what happens when same numbers succeed one another
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    if (numbers[i]) {
      showMessage(numbers[i]);
    } else {
      showMessage(' ');
    }
  }
}

playerTurn();
