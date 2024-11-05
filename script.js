"use strict";

// Selectors
const gameContainer = document.querySelector(".game-container");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart");
const gameStatus = document.querySelector(".game-status");

let currentPlayer = "X"; // This should change to O when X finishes.
let gameRunning = true;

// Gameboard
const board = new Array(9).fill("");

// Set win conditions.
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  // If indexes of cells are filled with the same letter and it matches the win condition, then the player with the letter wins.
  winCondition.forEach(([a, b, c]) => {
    if (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    ) {
      // announce win
      gameStatus.textContent = `${currentPlayer} wins!`;
      gameRunning = false;
    }
  });
}

// Event handlers
gameContainer.addEventListener("click", function (e) {
  // If event.target is equal to one of those cells.
  if (e.target.classList.contains("cell")) {
    const cellIndex = e.target.getAttribute("cellIndex");
    // Change the textcontent of that certain cell.
    if (gameRunning && e.target.textContent === "") {
      e.target.textContent = currentPlayer;
      board[cellIndex] = currentPlayer;
      checkWin();
      togglePlayer();
    }
  }
});

restartBtn.addEventListener("click", function () {
  // reset board
  board.fill("");
  cells.forEach((cell) => (cell.textContent = ""));
  gameStatus.textContent = "Game Status";
  // set current player to x
  currentPlayer = "X";

  gameRunning = true;
});
