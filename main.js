'use strict';

const playerDisplay = document.getElementById('player-display');

function playerTurn() {
  window.addEventListener('keydown', keyDownHandler);
}

function keyDownHandler(e) {
  console.log(e.key);
  if (e.key === 'q') {
    window.removeEventListener('keydown', keyDownHandler);
  }
}

playerTurn();
