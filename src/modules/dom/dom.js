import player from '../game-objects/player';
import Gameboard from '../game-objects/gameboard';
import shipListener from './ship-listener';
import createRandomField from '../game-loop/randomField';
import gameLoop from '../game-loop/game-loop';

// MAIN VARIABLES

const middleHeading = document.querySelector('.middle-heading');
const inputElement = document.querySelector('.name-input');
const mainArea = document.querySelector('main');
const logoImage = document.querySelector('header img');
const xyButton = document.createElement('button');
const wrapper = document.querySelector('.wrapper');
const startButton = document.querySelector('.start-button');
const rulesButton = document.querySelector('.rules-link');
const gridContainer = document.createElement('div');
const leftSide = document.createElement('div');
const rightSide = document.createElement('div');
const playerHeading = document.createElement('h2');
const botHeading = document.createElement('h2');
const playerField = document.createElement('div');
const botField = document.createElement('div');
const header = document.querySelector('header');
const pickerImage = document.createElement('img');
pickerImage.src = 'images/battleship-logo.png';
pickerImage.classList.add('picker-image');
let playerGameBoard;

function checkButton() {
  const axis = document.querySelector('.axis-button');
  axis.addEventListener('click', () => {
    if (axis.textContent === 'AXIS: X') {
      axis.textContent = 'AXIS: Y';
    } else {
      axis.textContent = 'AXIS: X';
    }
  });
}

// FUNCTION WHICH CREATES THE BOARD WHERE THE PLAYER PLACES HIS SHIPS

function boardPicker() {
  gridContainer.classList.add('grid-container-picker');

  logoImage.remove();
  mainArea.style.gap = '20px';
  rulesButton.remove();
  header.appendChild(pickerImage);
  middleHeading.textContent = `${player.name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '10px';
  xyButton.textContent = 'AXIS: X';
  inputElement.parentNode.replaceChild(xyButton, inputElement);
  xyButton.classList.add('axis-button');
  wrapper.style.gap = '10px';
  mainArea.removeChild(startButton);
  mainArea.appendChild(gridContainer);

  checkButton();

  playerGameBoard = new Gameboard();
  playerGameBoard.showBoard('grid-container-picker');
  shipListener('grid-container-picker', playerGameBoard);
}

// FUNCTION WHICH CREATES THE MAIN GAME FIELD (PLAYER AND COMPUTER)

export function createMainGameField(playerBoard) {
  middleHeading.remove();
  xyButton.remove();
  gridContainer.remove();
  mainArea.style.gap = '40px';
  header.style.marginBottom = '40px';
  document.querySelector('.alert-text').remove();
  mainArea.style.display = 'flex';
  mainArea.style.justifyContent = 'space-around';
  mainArea.style.alignItems = 'center';
  playerField.classList.add('player-field');
  botField.classList.add('bot-field');
  leftSide.classList.add('player-half');
  rightSide.classList.add('bot-half');
  playerHeading.classList.add('player-heading');
  botHeading.classList.add('bot-heading');
  playerHeading.textContent = 'FRIEDNLY WATERS';
  botHeading.textContent = 'ENEMY WATERS';
  leftSide.appendChild(playerHeading);
  rightSide.appendChild(botHeading);
  leftSide.appendChild(playerField);
  rightSide.appendChild(botField);
  mainArea.appendChild(leftSide);
  mainArea.appendChild(rightSide);
  playerBoard.showBoard('player-field');
  const botGameBoard = createRandomField();
  botGameBoard.showBoard('bot-field');
  playerBoard.ships.forEach((ship) => {
    playerBoard.placeImage(ship, 'player-field');
  });
  gameLoop(playerBoard, botGameBoard);
}

// FUNCTION WHICH CREATES THE WELCOME SCREEN

export function createWelcomeScreen() {
  const nameInput = document.querySelector('.name-input');
  nameInput.style.backgroundColor = 'rgb(204, 208, 206)';
  const alertText = document.querySelector('.alert-text');

  startButton.addEventListener('click', () => {
    if (nameInput.value === '') {
      alertText.style.color = 'red';
    } else {
      const inputValue = nameInput.value;
      const correctForm = inputValue.replace(/\s/g, '');
      player.name = `${correctForm}`;
      alertText.style.display = 'none';
      boardPicker();
    }
  });
}

export function callWinner(winner) {
  const winningScreen = document.querySelector('.winning-screen');
  const winningText = document.querySelector('.winner-question');
  const winningImage = document.querySelector('.winner-image');

  winningScreen.style.top = '0';
  winningScreen.style.visibility = 'visible';
  winningScreen.style.pointerEvents = 'all';

  if (winner === 'player') {
    winningText.textContent = 'You won!';
    winningImage.src = 'images/person-winner.png';
  } else {
    winningText.textContent = 'Computer won!';
    winningImage.src = 'images/computer-winner.png';
    winningImage.style.transform = 'translate(-50px, 0)';
  }
}

// FUNCTION FOR CREATING PROPER HOVER EFFECTS

export function hoverColors(orientation, length) {
  let shipOrientation = orientation;
  let activeNumber = length;
  const gridCells = document.querySelectorAll('.grid-cell');
  const orientationButton = document.querySelector('.axis-button');

  gridCells.forEach((cell, index) => {
    cell.addEventListener('mouseenter', () => {
      if (orientationButton.textContent === 'AXIS: X') {
        shipOrientation = 'AXIS: X';
      } else {
        shipOrientation = 'AXIS: Y';
      }

      if (playerGameBoard.showCurrentSize()[0]) {
        let currentLength = playerGameBoard.showCurrentSize()[0].length;
        let previousLength;

        if (playerGameBoard.showCurrentSize()[1]) {
          previousLength = playerGameBoard.showCurrentSize()[1].length;
        }

        if (currentLength === 3 && previousLength !== 3) {
          activeNumber = 3;
          currentLength -= 1;
        } else if (currentLength === 4) {
          activeNumber = 3;
        } else {
          activeNumber = currentLength - 1;
        }
      }

      const cellClassList = cell.classList;
      const [, row, col] = cellClassList[1].split('-').map(Number);

      const maxCellsInRow = 10 - row + 1;
      const maxCellsInCol = 10 - col + 1;

      if (activeNumber > maxCellsInRow && shipOrientation === 'AXIS: Y') {
        cell.classList.add('hovered-red');
      } else if (activeNumber > maxCellsInCol && shipOrientation === 'AXIS: X') {
        cell.classList.add('hovered-red');
      } else if (playerGameBoard.checkOccupied(row, col, shipOrientation, activeNumber)) {
        cell.classList.add('hovered-red');
      } else {
        cell.classList.add('hovered');

        for (let i = 1; i < activeNumber; i++) {
          const nextRowCell = gridCells[index + i];
          const nextColCell = gridCells[index + i * 10];
          if (nextRowCell && shipOrientation === 'AXIS: X') {
            nextRowCell.classList.add('hovered');
          }
          if (nextColCell && shipOrientation === 'AXIS: Y') {
            nextColCell.classList.add('hovered');
          }
        }
      }
    });

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    function removeHover() {
      gridCells.forEach((pole) => {
        pole.classList.remove('hovered', 'hovered-red');
      });
    }

    if (isTouchDevice) {
      setTimeout(removeHover, 500);
    }

    cell.addEventListener('mouseleave', () => {
      removeHover();
    });
  });
}

const resetButton = document.querySelector('.new-game');
resetButton.addEventListener('click', () => {
  location.reload();
});
