import player from './player';
import Gameboard from './gameboard';
import shipListener from './ship-listener';
import createRandomField from './randomField';

const contentField = document.querySelector('.content');
const middleHeading = document.querySelector('.middle-heading');
const inputElement = document.querySelector('.name-input');
const mainArea = document.querySelector('main');
const logoImage = document.querySelector('header img');
const xyButton = document.createElement('button');
const wrapper = document.querySelector('.wrapper');
const startButton = document.querySelector('.start-button');
const gridContainer = document.createElement('div');
const leftSide = document.createElement('div');
const rightSide = document.createElement('div');
const playerHeading = document.createElement('h2');
const botHeading = document.createElement('h2');
const playerField = document.createElement('div');
const botField = document.createElement('div');
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

function boardPicker() {
  gridContainer.classList.add('grid-container-picker');

  logoImage.style.width = '300px';
  middleHeading.textContent = `${player.name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '40px';
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

export function createMainGameField(playerGameBoard) {
  middleHeading.remove();
  xyButton.remove();
  gridContainer.remove();
  document.querySelector('.alert-text').remove();
  mainArea.style.display = 'flex';
  mainArea.style.justifyContent = 'spaceAround';
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
  playerGameBoard.showBoard('player-field');
  playerGameBoard.showShips();
  const botGameBoard = createRandomField();
  botGameBoard.showBoard('bot-field');
  botGameBoard.showShips();
}

export function createWelcomeScreen() {
  const startButton = document.querySelector('.start-button');
  const nameInput = document.querySelector('.name-input');
  const alertText = document.querySelector('.alert-text');

  startButton.addEventListener('click', () => {
    if (nameInput.value === '') {
      alertText.style.color = 'red';
    } else {
      player.name = `${nameInput.value}`;
      alertText.style.display = 'none';
      boardPicker();
    }
  });
}

export function hoverColors(orientation, length) {
  let activeNumber = length;
  const gridCells = document.querySelectorAll('.grid-cell');
  const orientationButton = document.querySelector('.axis-button');

  gridCells.forEach((cell, index) => {
    cell.addEventListener('mouseenter', () => {
      if (orientationButton.textContent === 'AXIS: X') {
        orientation = 'AXIS: X';
      } else {
        orientation = 'AXIS: Y';
      }

      const neededCoordinates = [];

      if (playerGameBoard.showCurrentSize()[0]) {
        let currentLength = playerGameBoard.showCurrentSize()[0].length;
        let previousLength;

        if (playerGameBoard.showCurrentSize()[1]) {
          previousLength = playerGameBoard.showCurrentSize()[1].length;
        }

        if (currentLength === 3 && previousLength !== 3) {
          console.log('option1');
          activeNumber = 3;
          currentLength -= 1;
        } else if (currentLength === 4) {
          console.log('option2');
          activeNumber = 3;
        } else {
          console.log(currentLength);
          console.log('option3');
          activeNumber = currentLength - 1;
          console.log(activeNumber);
        }
      }

      const cellClassList = cell.classList;
      const [, row, col] = cellClassList[1].split('-').map(Number);

      const maxCellsInRow = 10 - row + 1;
      const maxCellsInCol = 10 - col + 1;

      if (activeNumber > maxCellsInRow && orientation === 'AXIS: Y') {
        cell.classList.add('hovered-red');
      } else if (activeNumber > maxCellsInCol && orientation === 'AXIS: X') {
        cell.classList.add('hovered-red');
      } else if (playerGameBoard.checkOccupied(row, col, orientation, activeNumber)) {
        cell.classList.add('hovered-red');
      } else {
        cell.classList.add('hovered');

        for (let i = 1; i < activeNumber; i++) {
          const nextRowCell = gridCells[index + i];
          const nextColCell = gridCells[index + i * 10];
          if (nextRowCell && orientation === 'AXIS: X') {
            nextRowCell.classList.add('hovered');
          }
          if (nextColCell && orientation === 'AXIS: Y') {
            nextColCell.classList.add('hovered');
          }
        }
      }
    });

    cell.addEventListener('mouseleave', () => {
      gridCells.forEach((cell) => {
        cell.classList.remove('hovered', 'hovered-red');
      });
    });
  });
}
