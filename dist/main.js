/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/availabilityValidator.js":
/*!**********************************************!*\
  !*** ./src/modules/availabilityValidator.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkStatus)
/* harmony export */ });
// CHECKS IF THE COORDINATE CAN BE CHOSEN

function checkStatus(newPosition, length, orientation, playBoard) {
  const axisParts = newPosition.split('-');
  const row = Number(axisParts[1]);
  const col = Number(axisParts[2]);
  if (!playBoard.checkOccupied(row, col, orientation, length)) {
    if (orientation === 'AXIS: X') {
      for (let i = 0; i < length; i++) {
        playBoard.updateCoordinates(`cell-${row}-${col + i}`);
      }
    } else if (orientation === 'AXIS: Y') {
      for (let i = 0; i < length; i++) {
        playBoard.updateCoordinates(`cell-${row + i}-${col}`);
      }
    }
    playBoard.checkOccupied();
    return true;
  }
  return false;
}

/***/ }),

/***/ "./src/modules/computer.js":
/*!*********************************!*\
  !*** ./src/modules/computer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   generateRandomMove: () => (/* binding */ generateRandomMove)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _determineWinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./determineWinner */ "./src/modules/determineWinner.js");
/* eslint-disable no-continue */


const computer = {
  generateRandomMove(bombedArr) {
    let num1;
    let num2;
    let coordinate;
    do {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      coordinate = `cell-${num1}-${num2}`;
    } while (bombedArr.includes(coordinate));
    return coordinate;
  },
  findAdjacentHitCells(row, col, direction) {
    const domPlayerBoard = document.querySelector('.player-field');
    const grid = Array.from(domPlayerBoard.querySelectorAll('.grid-cell'));
    const adjacentCells = [];
    const directions = {
      left: {
        row: 0,
        col: -1
      },
      right: {
        row: 0,
        col: 1
      },
      up: {
        row: -1,
        col: 0
      },
      down: {
        row: 1,
        col: 0
      }
    };
    let currentRow = row;
    let currentCol = col;
    while (true) {
      const newRow = currentRow + directions[direction].row;
      const newCol = currentCol + directions[direction].col;
      const cellClassName = `cell-${newRow}-${newCol}`;
      const cell = grid.find(cell => cell.classList.contains(cellClassName));
      if (!cell) break;
      const innerDiv = cell.querySelector('.hit');
      if (innerDiv) {
        adjacentCells.push(cell);
      } else {
        break;
      }
      currentRow = newRow;
      currentCol = newCol;
    }
    return adjacentCells;
  },
  playComputer(occupiedArr, bombedArr, playerBoard, botBoard) {
    const domPlayerBoard = document.querySelector('.player-field');
    const grid = Array.from(domPlayerBoard.querySelectorAll('.grid-cell'));
    const randomCoordinate = this.generateRandomMove(bombedArr);
    let domChosenSpot = domPlayerBoard.querySelector(`.${randomCoordinate}`);
    outerLoop: for (let row = 1; row <= 10; row++) {
      for (let col = 1; col <= 10; col++) {
        const cellClassName = `cell-${row}-${col}`;
        const cell = grid.find(cell => cell.classList.contains(cellClassName));
        const innerDiv = cell.querySelector('.hit');
        if (innerDiv && !cell.classList.contains('sank')) {
          const leftCells = this.findAdjacentHitCells(row, col, 'left');
          const rightCells = this.findAdjacentHitCells(row, col, 'right');
          const upCells = this.findAdjacentHitCells(row, col, 'up');
          const downCells = this.findAdjacentHitCells(row, col, 'down');
          if (leftCells.length >= 1 || rightCells.length >= 1) {
            const newRow = row;
            const newColVerOne = col + 1;
            const newColVerTwo = col - 1;
            let newCol = newColVerOne;
            if (bombedArr.includes(`cell-${newRow}-${newColVerOne}`) && bombedArr.includes(`cell-${newRow}-${newColVerTwo}`)) {
              continue;
            } else if (bombedArr.includes(`cell-${newRow}-${newColVerOne}`) && domPlayerBoard.querySelector(`.cell-${newRow}-${newColVerTwo}`)) {
              newCol = newColVerTwo;
            } else if (bombedArr.includes(`cell-${newRow}-${newColVerTwo}`) && domPlayerBoard.querySelector(`.cell-${newRow}-${newColVerOne}`)) {
              newCol = newColVerOne;
            } else {
              continue;
            }
            const finalClass = `cell-${newRow}-${newCol}`;
            domChosenSpot = domPlayerBoard.querySelector(`.${finalClass}`);
            checkHit(finalClass);
            break outerLoop;
          } else if (upCells.length >= 1 || downCells.length >= 1) {
            const newRowVerOne = row + 1;
            const newRowVerTwo = row - 1;
            const newCol = col;
            let newRow = newRowVerOne;
            if (bombedArr.includes(`cell-${newRowVerOne}-${newCol}`) && bombedArr.includes(`cell-${newRowVerTwo}-${newCol}`)) {
              continue;
            } else if (bombedArr.includes(`cell-${newRowVerOne}-${newCol}`) && domPlayerBoard.querySelector(`.cell-${newRowVerTwo}-${newCol}`)) {
              newRow = newRowVerTwo;
            } else if (bombedArr.includes(`cell-${newRowVerTwo}-${newCol}`) && domPlayerBoard.querySelector(`.cell-${newRowVerOne}-${newCol}`)) {
              newRow = newRowVerOne;
            } else {
              // eslint-disable-next-line no-continue
              continue;
            }
            const finalClass = `cell-${newRow}-${newCol}`;
            domChosenSpot = domPlayerBoard.querySelector(`.${finalClass}`);
            checkHit(finalClass);
            break outerLoop;
          } else {
            const oneRight = `cell-${row}-${col + 1}`;
            const oneLeft = `cell-${row}-${col - 1}`;
            const oneTop = `cell-${row - 1}-${col}`;
            const oneBottom = `cell-${row + 1}-${col}`;
            let finalClass;
            const directions = [oneBottom, oneLeft, oneRight, oneTop];
            const maxAttempts = 4;
            let selectedDirection = null;
            let attempts = 0;
            while (attempts <= maxAttempts) {
              selectedDirection = directions[Math.floor(Math.random() * directions.length)];
              if (domPlayerBoard.querySelector(`.${selectedDirection}`) && !bombedArr.includes(selectedDirection)) {
                break;
              }
              attempts++;
            }
            if (attempts <= maxAttempts) {
              checkHit(selectedDirection);
              break outerLoop;
            } else {
              checkHit(randomCoordinate);
              break outerLoop;
            }
          }
        } else if (row === 10 && col === 10) {
          checkHit(randomCoordinate);
          break outerLoop;
        }
      }
    }
    function checkHit(spot) {
      const finalSpot = domPlayerBoard.querySelector(`.${spot}`);
      if (occupiedArr.includes(spot)) {
        const spotIndex = occupiedArr.indexOf(spot);
        let shipHit;
        if (spotIndex >= 0 && spotIndex < 5) {
          shipHit = playerBoard.ships[0];
        } else if (spotIndex < 9) {
          shipHit = playerBoard.ships[1];
        } else if (spotIndex < 12) {
          shipHit = playerBoard.ships[2];
        } else if (spotIndex < 15) {
          shipHit = playerBoard.ships[3];
        } else {
          shipHit = playerBoard.ships[4];
        }
        shipHit.hit();
        if (shipHit.isSunk()) {
          playerBoard.placeImage(shipHit, 'player-field', true, true);
          playerBoard.markSunkShips(shipHit, 'player-field');
        }
        const hit = document.createElement('div');
        hit.classList.add('hit');
        finalSpot.appendChild(hit);
      } else {
        const noHit = document.createElement('div');
        noHit.classList.add('no-hit');
        finalSpot.appendChild(noHit);
      }
      setTimeout(_determineWinner__WEBPACK_IMPORTED_MODULE_1__["default"], 1000, botBoard, playerBoard);
      bombedArr.push(spot);
      _player__WEBPACK_IMPORTED_MODULE_0__["default"].playStatus = true;
    }
  }
};
const generateRandomMove = computer.generateRandomMove;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computer);

/***/ }),

/***/ "./src/modules/determineWinner.js":
/*!****************************************!*\
  !*** ./src/modules/determineWinner.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showWinner)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");

function updateDom(winner) {
  const wrapper = document.querySelector('.wrapper');
  if (winner === 'player') {
    window.scrollTo(0, 0);
    wrapper.innerHTML = '';
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.callWinner)('player');
  } else if (winner === 'computer') {
    window.scrollTo(0, 0);
    wrapper.innerHTML = '';
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.callWinner)('computer');
  }
}
function showWinner(botBoard, playerBoard) {
  const playerWin = botBoard.occupiedCoordinates.every(item => botBoard.bombedCoordinates.includes(item));
  const botWin = playerBoard.occupiedCoordinates.every(item => playerBoard.bombedCoordinates.includes(item));
  if (playerWin) {
    updateDom('player');
    return 'player won';
  }
  if (botWin) {
    updateDom('computer');
    return 'computer won';
  }
  return 'No winner yet';
}

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callWinner: () => (/* binding */ callWinner),
/* harmony export */   createMainGameField: () => (/* binding */ createMainGameField),
/* harmony export */   createWelcomeScreen: () => (/* binding */ createWelcomeScreen),
/* harmony export */   hoverColors: () => (/* binding */ hoverColors)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-listener */ "./src/modules/ship-listener.js");
/* harmony import */ var _randomField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./randomField */ "./src/modules/randomField.js");
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-loop */ "./src/modules/game-loop.js");






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
  middleHeading.textContent = `${_player__WEBPACK_IMPORTED_MODULE_0__["default"].name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '10px';
  xyButton.textContent = 'AXIS: X';
  inputElement.parentNode.replaceChild(xyButton, inputElement);
  xyButton.classList.add('axis-button');
  wrapper.style.gap = '10px';
  mainArea.removeChild(startButton);
  mainArea.appendChild(gridContainer);
  checkButton();
  playerGameBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
  playerGameBoard.showBoard('grid-container-picker');
  (0,_ship_listener__WEBPACK_IMPORTED_MODULE_2__["default"])('grid-container-picker', playerGameBoard);
}

// FUNCTION WHICH CREATES THE MAIN GAME FIELD (PLAYER AND COMPUTER)

function createMainGameField(playerBoard) {
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
  const botGameBoard = (0,_randomField__WEBPACK_IMPORTED_MODULE_3__["default"])();
  botGameBoard.showBoard('bot-field');
  playerBoard.ships.forEach(ship => {
    playerBoard.placeImage(ship, 'player-field');
  });
  (0,_game_loop__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, botGameBoard);
}

// FUNCTION WHICH CREATES THE WELCOME SCREEN

function createWelcomeScreen() {
  const nameInput = document.querySelector('.name-input');
  nameInput.style.backgroundColor = 'rgb(204, 208, 206)';
  const alertText = document.querySelector('.alert-text');
  startButton.addEventListener('click', () => {
    if (nameInput.value === '') {
      alertText.style.color = 'red';
    } else {
      const inputValue = nameInput.value;
      const correctForm = inputValue.replace(/\s/g, '');
      _player__WEBPACK_IMPORTED_MODULE_0__["default"].name = `${correctForm}`;
      alertText.style.display = 'none';
      boardPicker();
    }
  });
}
function callWinner(winner) {
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

function hoverColors(orientation, length) {
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
      gridCells.forEach(pole => {
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

/***/ }),

/***/ "./src/modules/game-loop.js":
/*!**********************************!*\
  !*** ./src/modules/game-loop.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./computer */ "./src/modules/computer.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");




// MANAGES THE FLOW OF THE GAME

function gameLoop(playerBoard, botBoard) {
  const domBotBoard = document.querySelector('.bot-field');
  domBotBoard.addEventListener('click', e => {
    if (_player__WEBPACK_IMPORTED_MODULE_1__["default"].playStatus) {
      const round = _player__WEBPACK_IMPORTED_MODULE_1__["default"].playerAttack(e, playerBoard, botBoard);
      if (round) {
        setTimeout(() => {
          _computer__WEBPACK_IMPORTED_MODULE_0__["default"].playComputer(playerBoard.occupiedCoordinates, playerBoard.bombedCoordinates, playerBoard, botBoard);
        }, 1000);
      }
    }
  });
}

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* eslint-disable class-methods-use-this */
class Gameboard {
  constructor() {
    this.occupiedCoordinates = [];
    this.bombedCoordinates = [];
    this.ships = [];
  }
  updateBombed(bombedItem) {
    this.bombedCoordinates.push(bombedItem);
  }
  updateCoordinates(occupiedItem) {
    this.occupiedCoordinates.push(occupiedItem);
  }
  markSunkShips(ship, field) {
    const classes = [];
    const playField = document.querySelector(`.${field}`);
    const startPosition = ship.position;
    const givenLength = ship.length;
    const [prefix, row, col] = startPosition.split('-');
    if (ship.orientation === 'AXIS: X') {
      for (let i = 0; i < givenLength; i++) {
        classes.push(`${prefix}-${row}-${Number(col) + i}`);
      }
    } else {
      for (let i = 0; i < givenLength; i++) {
        classes.push(`${prefix}-${Number(row) + i}-${col}`);
      }
    }
    classes.forEach(cellString => {
      const element = playField.querySelector(`.${cellString}`);
      element.classList.add('sank');
    });
  }
  checkOccupied(row, col, orientation, length) {
    if (orientation === 'AXIS: X') {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row}-${col + i}`;
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row + i}-${col}`;
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
    }
    return false;
  }

  // CREATES THE GAME GRID IN DOM

  showBoard(className) {
    const gridContainer = document.querySelector(`.${className}`);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridContainer.appendChild(gridCell);
        const uniqueClassName = `cell-${i + 1}-${j + 1}`;
        gridCell.classList.add(uniqueClassName);
      }
    }
  }
  showCurrentSize() {
    const infoArr = [this.ships[this.ships.length - 1], this.ships[this.ships.length - 2]];
    return infoArr;
  }
  placeImage(ship, gameField, status, oldImage) {
    let gap = 4;
    if (window.innerWidth < 1070) gap = 2;
    const gridCell = document.querySelector('.grid-cell');
    const cellSize = gridCell.offsetWidth;
    const positionParts = ship.position.split('-');
    const row = Number(positionParts[1]);
    const col = Number(positionParts[2]);
    let leftMargin;
    let topMargin;
    const finalSize = (cellSize + gap) * ship.length;
    const field = document.querySelector(`.${gameField}`);
    const startingPoint = field.querySelector(`.${ship.position}`);
    const imageToRemove = startingPoint.querySelector('img');
    const shipImage = document.createElement('img');
    if (ship.orientation === 'AXIS: X') {
      shipImage.classList.add('ship-image-x');
      topMargin = (gridCell.offsetWidth + gap) * (row - 1);
      leftMargin = (gridCell.offsetWidth + gap) * (col - 1);
    } else {
      shipImage.classList.add('ship-image-y');
      topMargin = (gridCell.offsetWidth + gap) * (row - 1);
      leftMargin = (gridCell.offsetWidth + gap) * (col - 1);
    }
    shipImage.style.width = `${finalSize}px`;
    shipImage.style.top = `${topMargin}px`;
    shipImage.style.left = `${leftMargin}px`;
    if (oldImage) {
      imageToRemove.remove();
    }
    if (status) {
      if (ship.length === 2) shipImage.classList.add(`length-${2}`);
      shipImage.src = `images/${ship.length}-ship-dead.png`;
    } else {
      if (ship.length === 2) shipImage.classList.add(`length-${2}`);
      shipImage.src = `images/${ship.length}-ship.png`;
    }
    startingPoint.appendChild(shipImage);
  }
}

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _determineWinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./determineWinner */ "./src/modules/determineWinner.js");

const player = {
  playerAttack(event, playerBoard, botBoard) {
    const domBotBoard = document.querySelector('.bot-field');
    const clickedElement = event.target;
    const classes = clickedElement.classList;
    const classesArray = Array.from(classes);
    if (classesArray.includes('grid-cell') && !botBoard.bombedCoordinates.includes(classesArray[1])) {
      const chosenSpot = classesArray[1];
      if (botBoard.occupiedCoordinates.includes(chosenSpot)) {
        const spotIndex = botBoard.occupiedCoordinates.indexOf(chosenSpot);
        let shipHit;
        if (spotIndex >= 0 && spotIndex < 5) {
          shipHit = botBoard.ships[0];
        } else if (spotIndex < 9) {
          shipHit = botBoard.ships[1];
        } else if (spotIndex < 12) {
          shipHit = botBoard.ships[2];
        } else if (spotIndex < 15) {
          shipHit = botBoard.ships[3];
        } else {
          shipHit = botBoard.ships[4];
        }
        shipHit.hit();
        if (shipHit.isSunk()) {
          botBoard.placeImage(shipHit, 'bot-field', true);
        }
        const domChosenSpot = domBotBoard.querySelector(`.${chosenSpot}`);
        const hit = document.createElement('div');
        hit.classList.add('hit');
        domChosenSpot.appendChild(hit);
      } else {
        const domChosenSpot = domBotBoard.querySelector(`.${chosenSpot}`);
        const noHit = document.createElement('div');
        noHit.classList.add('no-hit');
        domChosenSpot.appendChild(noHit);
      }
      botBoard.bombedCoordinates.push(chosenSpot);
      setTimeout(_determineWinner__WEBPACK_IMPORTED_MODULE_0__["default"], 1000, botBoard, playerBoard);
      this.playStatus = false;
      return true;
    }
    return false;
  },
  playStatus: true
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/modules/randomField.js":
/*!************************************!*\
  !*** ./src/modules/randomField.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createRandomField)
/* harmony export */ });
/* harmony import */ var _availabilityValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./availabilityValidator */ "./src/modules/availabilityValidator.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");



function createRandomField() {
  const botGameBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
  const shipSizes = [5, 4, 3, 3, 2];
  const orientation = ['AXIS: X', 'AXIS: Y'];
  while (shipSizes.length > 0) {
    let xNum;
    let yNum;
    const currentSize = shipSizes.shift();
    const orientationPick = orientation[Math.round(Math.random())];
    const randomPick = Math.floor(Math.random() * 10) + 1;
    const startPoint = Math.floor(Math.random() * (10 - currentSize)) + 1;
    if (orientationPick === 'AXIS: X') {
      xNum = randomPick;
      yNum = startPoint;
    } else {
      xNum = startPoint;
      yNum = randomPick;
    }
    const connectedClass = `cell-${xNum}-${yNum}`;
    // console.log(connectedClass);

    if (!(0,_availabilityValidator__WEBPACK_IMPORTED_MODULE_0__["default"])(connectedClass, currentSize, orientationPick, botGameBoard)) {
      shipSizes.unshift(currentSize);
    } else {
      const newShip = new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](currentSize, orientationPick, connectedClass);
      botGameBoard.ships.push(newShip);
    }
  }
  return botGameBoard;
}

/***/ }),

/***/ "./src/modules/ship-listener.js":
/*!**************************************!*\
  !*** ./src/modules/ship-listener.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipListener)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _spotValidator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spotValidator */ "./src/modules/spotValidator.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _availabilityValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./availabilityValidator */ "./src/modules/availabilityValidator.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* eslint-disable no-useless-return */





function shipListener(className, playerGameBoard) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  (0,_dom__WEBPACK_IMPORTED_MODULE_4__.hoverColors)('AXIS: X', 5);
  function clickHandler(e) {
    const classes = e.target.classList;
    const position = classes[1];
    if (classes.length < 3) {
      return;
    }
    const shipLength = shipSizes.shift();
    const shipOrientation = document.querySelector('.axis-button').textContent;
    (0,_dom__WEBPACK_IMPORTED_MODULE_4__.hoverColors)(shipOrientation, shipLength);
    if ((0,_spotValidator__WEBPACK_IMPORTED_MODULE_1__["default"])(shipOrientation, shipLength, position) && (0,_availabilityValidator__WEBPACK_IMPORTED_MODULE_3__["default"])(position, shipLength, shipOrientation, playerGameBoard)) {
      const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
      playerGameBoard.ships.push(ship);
      playerGameBoard.placeImage(ship, 'grid-container-picker');
      if (shipSizes.length === 0) {
        gameField.removeEventListener('click', clickHandler);
        const backgroundAnimation = document.querySelector('.background-animation-space');
        backgroundAnimation.classList.add('background-animation');
        window.scrollTo(0, 0);
        setTimeout(() => {
          (0,_dom__WEBPACK_IMPORTED_MODULE_4__.createMainGameField)(playerGameBoard);
        }, 800);
        return;
      }
    } else {
      shipSizes.unshift(shipLength);
    }
  }

  // Add the event listener
  gameField.addEventListener('click', clickHandler);
}

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(length, orientation, position) {
    this.length = length;
    this.hitCounter = 0;
    this.orientation = orientation;
    this.position = position;
  }
  hit() {
    this.hitCounter++;
  }
  isSunk() {
    return this.hitCounter === this.length;
  }
}

/***/ }),

/***/ "./src/modules/spotValidator.js":
/*!**************************************!*\
  !*** ./src/modules/spotValidator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ checkShipValidity)
/* harmony export */ });
function checkShipValidity(axis, length, position) {
  const realSize = length - 1;
  const axisParts = position.split('-');
  const row = Number(axisParts[1]);
  const col = Number(axisParts[2]);
  if (axis === 'AXIS: X') {
    if (col + realSize > 10) {
      return false;
    }
    return true;
  }
  if (axis === 'AXIS: Y') {
    if (row + realSize > 10) {
      return false;
    }
    return true;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");

(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__.createWelcomeScreen)();
function reloadPage() {
  location.reload();
}
window.addEventListener('orientationchange', () => {
  reloadPage();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUssQ0FBQyxHQUFHLENBQUM7RUFDckMsTUFBTUMsR0FBRyxHQUFHQyxNQUFNLENBQUNILFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNSSxHQUFHLEdBQUdELE1BQU0sQ0FBQ0gsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUkwSCxJQUFJLEtBQUssU0FBUyxFQUFFO0lBQ3RCLElBQUt0SCxHQUFHLEdBQUcrTyxRQUFRLEdBQUcsRUFBRSxFQUFHO01BQ3pCLE9BQU8sS0FBSztJQUNkO0lBQ0EsT0FBTyxJQUFJO0VBQ2I7RUFBRSxJQUFJekgsSUFBSSxLQUFLLFNBQVMsRUFBRTtJQUN4QixJQUFLeEgsR0FBRyxHQUFHaVAsUUFBUSxHQUFHLEVBQUUsRUFBRztNQUN6QixPQUFPLEtBQUs7SUFDZDtJQUNBLE9BQU8sSUFBSTtFQUNiO0FBQ0Y7Ozs7OztVQ2hCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9EO0FBRXBEcEcsaUVBQW1CLENBQUMsQ0FBQztBQUVyQixTQUFTcUcsVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCL0QsUUFBUSxDQUFDQyxNQUFNLENBQUMsQ0FBQztBQUNuQjtBQUVBNUYsTUFBTSxDQUFDaUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsTUFBTTtFQUNqRHlILFVBQVUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvYXZhaWxhYmlsaXR5VmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZGV0ZXJtaW5lV2lubmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUtbG9vcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3JhbmRvbUZpZWxkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLWxpc3RlbmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zcG90VmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENIRUNLUyBJRiBUSEUgQ09PUkRJTkFURSBDQU4gQkUgQ0hPU0VOXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU3RhdHVzKFxuICBuZXdQb3NpdGlvbixcbiAgbGVuZ3RoLFxuICBvcmllbnRhdGlvbixcbiAgcGxheUJvYXJkLFxuKSB7XG4gIGNvbnN0IGF4aXNQYXJ0cyA9IG5ld1Bvc2l0aW9uLnNwbGl0KCctJyk7XG4gIGNvbnN0IHJvdyA9IE51bWJlcihheGlzUGFydHNbMV0pO1xuICBjb25zdCBjb2wgPSBOdW1iZXIoYXhpc1BhcnRzWzJdKTtcbiAgaWYgKCFwbGF5Qm9hcmQuY2hlY2tPY2N1cGllZChyb3csIGNvbCwgb3JpZW50YXRpb24sIGxlbmd0aCkpIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBwbGF5Qm9hcmQudXBkYXRlQ29vcmRpbmF0ZXMoYGNlbGwtJHtyb3d9LSR7Y29sICsgaX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAnQVhJUzogWScpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxheUJvYXJkLnVwZGF0ZUNvb3JkaW5hdGVzKGBjZWxsLSR7cm93ICsgaX0tJHtjb2x9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHBsYXlCb2FyZC5jaGVja09jY3VwaWVkKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgc2hvd1dpbm5lciBmcm9tICcuL2RldGVybWluZVdpbm5lcic7XG5cbmNvbnN0IGNvbXB1dGVyID0ge1xuICBnZW5lcmF0ZVJhbmRvbU1vdmUoYm9tYmVkQXJyKSB7XG4gICAgbGV0IG51bTE7XG4gICAgbGV0IG51bTI7XG4gICAgbGV0IGNvb3JkaW5hdGU7XG5cbiAgICBkbyB7XG4gICAgICBudW0xID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgIG51bTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgICAgY29vcmRpbmF0ZSA9IGBjZWxsLSR7bnVtMX0tJHtudW0yfWA7XG4gICAgfSB3aGlsZSAoYm9tYmVkQXJyLmluY2x1ZGVzKGNvb3JkaW5hdGUpKTtcblxuICAgIHJldHVybiBjb29yZGluYXRlO1xuICB9LFxuXG4gIGZpbmRBZGphY2VudEhpdENlbGxzKHJvdywgY29sLCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBkb21QbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZmllbGQnKTtcbiAgICBjb25zdCBncmlkID0gQXJyYXkuZnJvbShkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsJykpO1xuICAgIGNvbnN0IGFkamFjZW50Q2VsbHMgPSBbXTtcblxuICAgIGNvbnN0IGRpcmVjdGlvbnMgPSB7XG4gICAgICBsZWZ0OiB7IHJvdzogMCwgY29sOiAtMSB9LFxuICAgICAgcmlnaHQ6IHsgcm93OiAwLCBjb2w6IDEgfSxcbiAgICAgIHVwOiB7IHJvdzogLTEsIGNvbDogMCB9LFxuICAgICAgZG93bjogeyByb3c6IDEsIGNvbDogMCB9LFxuICAgIH07XG5cbiAgICBsZXQgY3VycmVudFJvdyA9IHJvdztcbiAgICBsZXQgY3VycmVudENvbCA9IGNvbDtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBuZXdSb3cgPSBjdXJyZW50Um93ICsgZGlyZWN0aW9uc1tkaXJlY3Rpb25dLnJvdztcbiAgICAgIGNvbnN0IG5ld0NvbCA9IGN1cnJlbnRDb2wgKyBkaXJlY3Rpb25zW2RpcmVjdGlvbl0uY29sO1xuXG4gICAgICBjb25zdCBjZWxsQ2xhc3NOYW1lID0gYGNlbGwtJHtuZXdSb3d9LSR7bmV3Q29sfWA7XG4gICAgICBjb25zdCBjZWxsID0gZ3JpZC5maW5kKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhjZWxsQ2xhc3NOYW1lKSk7XG5cbiAgICAgIGlmICghY2VsbCkgYnJlYWs7XG5cbiAgICAgIGNvbnN0IGlubmVyRGl2ID0gY2VsbC5xdWVyeVNlbGVjdG9yKCcuaGl0Jyk7XG4gICAgICBpZiAoaW5uZXJEaXYpIHtcbiAgICAgICAgYWRqYWNlbnRDZWxscy5wdXNoKGNlbGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7IFxuICAgICAgfVxuXG4gICAgICBjdXJyZW50Um93ID0gbmV3Um93O1xuICAgICAgY3VycmVudENvbCA9IG5ld0NvbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRqYWNlbnRDZWxscztcbiAgfSxcblxuICBwbGF5Q29tcHV0ZXIob2NjdXBpZWRBcnIsIGJvbWJlZEFyciwgcGxheWVyQm9hcmQsIGJvdEJvYXJkKSB7XG4gICAgY29uc3QgZG9tUGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWZpZWxkJyk7XG4gICAgY29uc3QgZ3JpZCA9IEFycmF5LmZyb20oZG9tUGxheWVyQm9hcmQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpKTtcbiAgICBjb25zdCByYW5kb21Db29yZGluYXRlID0gdGhpcy5nZW5lcmF0ZVJhbmRvbU1vdmUoYm9tYmVkQXJyKTtcbiAgICBsZXQgZG9tQ2hvc2VuU3BvdCA9IGRvbVBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC4ke3JhbmRvbUNvb3JkaW5hdGV9YCk7XG5cbiAgICBvdXRlckxvb3A6IGZvciAobGV0IHJvdyA9IDE7IHJvdyA8PSAxMDsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDE7IGNvbCA8PSAxMDsgY29sKyspIHtcbiAgICAgICAgY29uc3QgY2VsbENsYXNzTmFtZSA9IGBjZWxsLSR7cm93fS0ke2NvbH1gO1xuICAgICAgICBjb25zdCBjZWxsID0gZ3JpZC5maW5kKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhjZWxsQ2xhc3NOYW1lKSk7XG4gICAgICAgIGNvbnN0IGlubmVyRGl2ID0gY2VsbC5xdWVyeVNlbGVjdG9yKCcuaGl0Jyk7XG5cbiAgICAgICAgaWYgKGlubmVyRGl2ICYmICFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2FuaycpKSB7XG4gICAgICAgICAgY29uc3QgbGVmdENlbGxzID0gdGhpcy5maW5kQWRqYWNlbnRIaXRDZWxscyhyb3csIGNvbCwgJ2xlZnQnKTtcbiAgICAgICAgICBjb25zdCByaWdodENlbGxzID0gdGhpcy5maW5kQWRqYWNlbnRIaXRDZWxscyhyb3csIGNvbCwgJ3JpZ2h0Jyk7XG4gICAgICAgICAgY29uc3QgdXBDZWxscyA9IHRoaXMuZmluZEFkamFjZW50SGl0Q2VsbHMocm93LCBjb2wsICd1cCcpO1xuICAgICAgICAgIGNvbnN0IGRvd25DZWxscyA9IHRoaXMuZmluZEFkamFjZW50SGl0Q2VsbHMocm93LCBjb2wsICdkb3duJyk7XG5cbiAgICAgICAgICBpZiAobGVmdENlbGxzLmxlbmd0aCA+PSAxIHx8IHJpZ2h0Q2VsbHMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHJvdztcbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbFZlck9uZSA9IGNvbCArIDE7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2xWZXJUd28gPSBjb2wgLSAxO1xuICAgICAgICAgICAgbGV0IG5ld0NvbCA9IG5ld0NvbFZlck9uZTtcblxuICAgICAgICAgICAgaWYgKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJPbmV9YCkgJiYgYm9tYmVkQXJyLmluY2x1ZGVzKGBjZWxsLSR7bmV3Um93fS0ke25ld0NvbFZlclR3b31gKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJPbmV9YCkpICYmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJUd299YCkpKSB7XG4gICAgICAgICAgICAgIG5ld0NvbCA9IG5ld0NvbFZlclR3bztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJUd299YCkpICYmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJPbmV9YCkpKSB7XG4gICAgICAgICAgICAgIG5ld0NvbCA9IG5ld0NvbFZlck9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaW5hbENsYXNzID0gYGNlbGwtJHtuZXdSb3d9LSR7bmV3Q29sfWA7XG4gICAgICAgICAgICBkb21DaG9zZW5TcG90ID0gZG9tUGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgLiR7ZmluYWxDbGFzc31gKTtcblxuICAgICAgICAgICAgY2hlY2tIaXQoZmluYWxDbGFzcyk7XG4gICAgICAgICAgICBicmVhayBvdXRlckxvb3A7XG4gICAgICAgICAgfSBlbHNlIGlmICh1cENlbGxzLmxlbmd0aCA+PSAxIHx8IGRvd25DZWxscy5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgbmV3Um93VmVyT25lID0gcm93ICsgMTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Jvd1ZlclR3byA9IHJvdyAtIDE7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2wgPSBjb2w7XG4gICAgICAgICAgICBsZXQgbmV3Um93ID0gbmV3Um93VmVyT25lO1xuXG4gICAgICAgICAgICBpZiAoYm9tYmVkQXJyLmluY2x1ZGVzKGBjZWxsLSR7bmV3Um93VmVyT25lfS0ke25ld0NvbH1gKSAmJiBib21iZWRBcnIuaW5jbHVkZXMoYGNlbGwtJHtuZXdSb3dWZXJUd299LSR7bmV3Q29sfWApKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoYm9tYmVkQXJyLmluY2x1ZGVzKGBjZWxsLSR7bmV3Um93VmVyT25lfS0ke25ld0NvbH1gKSkgJiYgKGRvbVBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsLSR7bmV3Um93VmVyVHdvfS0ke25ld0NvbH1gKSkpIHtcbiAgICAgICAgICAgICAgbmV3Um93ID0gbmV3Um93VmVyVHdvO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoYm9tYmVkQXJyLmluY2x1ZGVzKGBjZWxsLSR7bmV3Um93VmVyVHdvfS0ke25ld0NvbH1gKSkgJiYgKGRvbVBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC5jZWxsLSR7bmV3Um93VmVyT25lfS0ke25ld0NvbH1gKSkpIHtcbiAgICAgICAgICAgICAgbmV3Um93ID0gbmV3Um93VmVyT25lO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZmluYWxDbGFzcyA9IGBjZWxsLSR7bmV3Um93fS0ke25ld0NvbH1gO1xuICAgICAgICAgICAgZG9tQ2hvc2VuU3BvdCA9IGRvbVBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC4ke2ZpbmFsQ2xhc3N9YCk7XG4gICAgICAgICAgICBjaGVja0hpdChmaW5hbENsYXNzKTtcbiAgICAgICAgICAgIGJyZWFrIG91dGVyTG9vcDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb25lUmlnaHQgPSBgY2VsbC0ke3Jvd30tJHtjb2wgKyAxfWA7XG4gICAgICAgICAgICBjb25zdCBvbmVMZWZ0ID0gYGNlbGwtJHtyb3d9LSR7Y29sIC0gMX1gO1xuICAgICAgICAgICAgY29uc3Qgb25lVG9wID0gYGNlbGwtJHtyb3cgLSAxfS0ke2NvbH1gO1xuICAgICAgICAgICAgY29uc3Qgb25lQm90dG9tID0gYGNlbGwtJHtyb3cgKyAxfS0ke2NvbH1gO1xuXG4gICAgICAgICAgICBsZXQgZmluYWxDbGFzcztcblxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFtvbmVCb3R0b20sIG9uZUxlZnQsIG9uZVJpZ2h0LCBvbmVUb3BdO1xuICAgICAgICAgICAgY29uc3QgbWF4QXR0ZW1wdHMgPSA0O1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWREaXJlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgbGV0IGF0dGVtcHRzID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKGF0dGVtcHRzIDw9IG1heEF0dGVtcHRzKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGVkRGlyZWN0aW9uID0gZGlyZWN0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBkaXJlY3Rpb25zLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgIGlmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuJHtzZWxlY3RlZERpcmVjdGlvbn1gKSAmJiAhYm9tYmVkQXJyLmluY2x1ZGVzKHNlbGVjdGVkRGlyZWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYXR0ZW1wdHMrKztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGF0dGVtcHRzIDw9IG1heEF0dGVtcHRzKSB7XG4gICAgICAgICAgICAgIGNoZWNrSGl0KHNlbGVjdGVkRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgYnJlYWsgb3V0ZXJMb29wO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2hlY2tIaXQocmFuZG9tQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgICAgIGJyZWFrIG91dGVyTG9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocm93ID09PSAxMCAmJiBjb2wgPT09IDEwKSB7XG4gICAgICAgICAgY2hlY2tIaXQocmFuZG9tQ29vcmRpbmF0ZSk7XG4gICAgICAgICAgYnJlYWsgb3V0ZXJMb29wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tIaXQoc3BvdCkge1xuICAgICAgY29uc3QgZmluYWxTcG90ID0gZG9tUGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgLiR7c3BvdH1gKTtcbiAgICAgIGlmIChvY2N1cGllZEFyci5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICBjb25zdCBzcG90SW5kZXggPSBvY2N1cGllZEFyci5pbmRleE9mKHNwb3QpO1xuICAgICAgICBsZXQgc2hpcEhpdDtcblxuICAgICAgICBpZiAoc3BvdEluZGV4ID49IDAgJiYgc3BvdEluZGV4IDwgNSkge1xuICAgICAgICAgIHNoaXBIaXQgPSBwbGF5ZXJCb2FyZC5zaGlwc1swXTtcbiAgICAgICAgfSBlbHNlIGlmIChzcG90SW5kZXggPCA5KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IHBsYXllckJvYXJkLnNoaXBzWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDEyKSB7XG4gICAgICAgICAgc2hpcEhpdCA9IHBsYXllckJvYXJkLnNoaXBzWzJdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDE1KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IHBsYXllckJvYXJkLnNoaXBzWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoaXBIaXQgPSBwbGF5ZXJCb2FyZC5zaGlwc1s0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBIaXQuaGl0KCk7XG5cbiAgICAgICAgaWYgKHNoaXBIaXQuaXNTdW5rKCkpIHtcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZUltYWdlKHNoaXBIaXQsICdwbGF5ZXItZmllbGQnLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5tYXJrU3Vua1NoaXBzKHNoaXBIaXQsICdwbGF5ZXItZmllbGQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGZpbmFsU3BvdC5hcHBlbmRDaGlsZChoaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgbm9IaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm9IaXQuY2xhc3NMaXN0LmFkZCgnbm8taGl0Jyk7XG4gICAgICAgIGZpbmFsU3BvdC5hcHBlbmRDaGlsZChub0hpdCk7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoc2hvd1dpbm5lciwgMTAwMCwgYm90Qm9hcmQsIHBsYXllckJvYXJkKTtcblxuICAgICAgYm9tYmVkQXJyLnB1c2goc3BvdCk7XG4gICAgICBwbGF5ZXIucGxheVN0YXR1cyA9IHRydWU7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlUmFuZG9tTW92ZSA9IGNvbXB1dGVyLmdlbmVyYXRlUmFuZG9tTW92ZTtcbmV4cG9ydCBkZWZhdWx0IGNvbXB1dGVyO1xuIiwiaW1wb3J0IHsgY2FsbFdpbm5lciB9IGZyb20gJy4vZG9tJztcblxuZnVuY3Rpb24gdXBkYXRlRG9tKHdpbm5lcikge1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcblxuICBpZiAod2lubmVyID09PSAncGxheWVyJykge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGNhbGxXaW5uZXIoJ3BsYXllcicpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ2NvbXB1dGVyJykge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGNhbGxXaW5uZXIoJ2NvbXB1dGVyJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd1dpbm5lcihib3RCb2FyZCwgcGxheWVyQm9hcmQpIHtcbiAgY29uc3QgcGxheWVyV2luID0gYm90Qm9hcmQub2NjdXBpZWRDb29yZGluYXRlcy5ldmVyeSgoaXRlbSkgPT4gYm90Qm9hcmQuYm9tYmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoaXRlbSkpO1xuICBjb25zdCBib3RXaW4gPSBwbGF5ZXJCb2FyZC5vY2N1cGllZENvb3JkaW5hdGVzLmV2ZXJ5KChpdGVtKSA9PiBwbGF5ZXJCb2FyZC5ib21iZWRDb29yZGluYXRlcy5pbmNsdWRlcyhpdGVtKSk7XG5cbiAgaWYgKHBsYXllcldpbikge1xuICAgIHVwZGF0ZURvbSgncGxheWVyJyk7XG4gICAgcmV0dXJuICdwbGF5ZXIgd29uJztcbiAgfSBpZiAoYm90V2luKSB7XG4gICAgdXBkYXRlRG9tKCdjb21wdXRlcicpO1xuICAgIHJldHVybiAnY29tcHV0ZXIgd29uJztcbiAgfVxuICByZXR1cm4gJ05vIHdpbm5lciB5ZXQnO1xufVxuIiwiaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBzaGlwTGlzdGVuZXIgZnJvbSAnLi9zaGlwLWxpc3RlbmVyJztcbmltcG9ydCBjcmVhdGVSYW5kb21GaWVsZCBmcm9tICcuL3JhbmRvbUZpZWxkJztcbmltcG9ydCBnYW1lTG9vcCBmcm9tICcuL2dhbWUtbG9vcCc7XG5cbi8vIE1BSU4gVkFSSUFCTEVTXG5cbmNvbnN0IG1pZGRsZUhlYWRpbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWlkZGxlLWhlYWRpbmcnKTtcbmNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG5jb25zdCBtYWluQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmNvbnN0IGxvZ29JbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciBpbWcnKTtcbmNvbnN0IHh5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5jb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpO1xuY29uc3QgcnVsZXNCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucnVsZXMtbGluaycpO1xuY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgbGVmdFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHJpZ2h0U2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgcGxheWVySGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG5jb25zdCBib3RIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbmNvbnN0IHBsYXllckZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBib3RGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG5jb25zdCBwaWNrZXJJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xucGlja2VySW1hZ2Uuc3JjID0gJ2ltYWdlcy9iYXR0bGVzaGlwLWxvZ28ucG5nJztcbnBpY2tlckltYWdlLmNsYXNzTGlzdC5hZGQoJ3BpY2tlci1pbWFnZScpO1xubGV0IHBsYXllckdhbWVCb2FyZDtcblxuZnVuY3Rpb24gY2hlY2tCdXR0b24oKSB7XG4gIGNvbnN0IGF4aXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXhpcy1idXR0b24nKTtcbiAgYXhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoYXhpcy50ZXh0Q29udGVudCA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBheGlzLnRleHRDb250ZW50ID0gJ0FYSVM6IFknO1xuICAgIH0gZWxzZSB7XG4gICAgICBheGlzLnRleHRDb250ZW50ID0gJ0FYSVM6IFgnO1xuICAgIH1cbiAgfSk7XG59XG5cbi8vIEZVTkNUSU9OIFdISUNIIENSRUFURVMgVEhFIEJPQVJEIFdIRVJFIFRIRSBQTEFZRVIgUExBQ0VTIEhJUyBTSElQU1xuXG5mdW5jdGlvbiBib2FyZFBpY2tlcigpIHtcbiAgZ3JpZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdncmlkLWNvbnRhaW5lci1waWNrZXInKTtcblxuICBsb2dvSW1hZ2UucmVtb3ZlKCk7XG4gIG1haW5BcmVhLnN0eWxlLmdhcCA9ICcyMHB4JztcbiAgcnVsZXNCdXR0b24ucmVtb3ZlKCk7XG4gIGhlYWRlci5hcHBlbmRDaGlsZChwaWNrZXJJbWFnZSk7XG4gIG1pZGRsZUhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIubmFtZX0sIFBMQUNFIFlPVVIgU0hJUFNgO1xuICBtaWRkbGVIZWFkaW5nLnN0eWxlLm1hcmdpblRvcCA9ICcxMHB4JztcbiAgeHlCdXR0b24udGV4dENvbnRlbnQgPSAnQVhJUzogWCc7XG4gIGlucHV0RWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh4eUJ1dHRvbiwgaW5wdXRFbGVtZW50KTtcbiAgeHlCdXR0b24uY2xhc3NMaXN0LmFkZCgnYXhpcy1idXR0b24nKTtcbiAgd3JhcHBlci5zdHlsZS5nYXAgPSAnMTBweCc7XG4gIG1haW5BcmVhLnJlbW92ZUNoaWxkKHN0YXJ0QnV0dG9uKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQoZ3JpZENvbnRhaW5lcik7XG5cbiAgY2hlY2tCdXR0b24oKTtcblxuICBwbGF5ZXJHYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIHBsYXllckdhbWVCb2FyZC5zaG93Qm9hcmQoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicpO1xuICBzaGlwTGlzdGVuZXIoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicsIHBsYXllckdhbWVCb2FyZCk7XG59XG5cbi8vIEZVTkNUSU9OIFdISUNIIENSRUFURVMgVEhFIE1BSU4gR0FNRSBGSUVMRCAoUExBWUVSIEFORCBDT01QVVRFUilcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1haW5HYW1lRmllbGQocGxheWVyQm9hcmQpIHtcbiAgbWlkZGxlSGVhZGluZy5yZW1vdmUoKTtcbiAgeHlCdXR0b24ucmVtb3ZlKCk7XG4gIGdyaWRDb250YWluZXIucmVtb3ZlKCk7XG4gIG1haW5BcmVhLnN0eWxlLmdhcCA9ICc0MHB4JztcbiAgaGVhZGVyLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc0MHB4JztcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0LXRleHQnKS5yZW1vdmUoKTtcbiAgbWFpbkFyZWEuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgbWFpbkFyZWEuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnc3BhY2UtYXJvdW5kJztcbiAgbWFpbkFyZWEuc3R5bGUuYWxpZ25JdGVtcyA9ICdjZW50ZXInO1xuICBwbGF5ZXJGaWVsZC5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItZmllbGQnKTtcbiAgYm90RmllbGQuY2xhc3NMaXN0LmFkZCgnYm90LWZpZWxkJyk7XG4gIGxlZnRTaWRlLmNsYXNzTGlzdC5hZGQoJ3BsYXllci1oYWxmJyk7XG4gIHJpZ2h0U2lkZS5jbGFzc0xpc3QuYWRkKCdib3QtaGFsZicpO1xuICBwbGF5ZXJIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3BsYXllci1oZWFkaW5nJyk7XG4gIGJvdEhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnYm90LWhlYWRpbmcnKTtcbiAgcGxheWVySGVhZGluZy50ZXh0Q29udGVudCA9ICdGUklFRE5MWSBXQVRFUlMnO1xuICBib3RIZWFkaW5nLnRleHRDb250ZW50ID0gJ0VORU1ZIFdBVEVSUyc7XG4gIGxlZnRTaWRlLmFwcGVuZENoaWxkKHBsYXllckhlYWRpbmcpO1xuICByaWdodFNpZGUuYXBwZW5kQ2hpbGQoYm90SGVhZGluZyk7XG4gIGxlZnRTaWRlLmFwcGVuZENoaWxkKHBsYXllckZpZWxkKTtcbiAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKGJvdEZpZWxkKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQobGVmdFNpZGUpO1xuICBtYWluQXJlYS5hcHBlbmRDaGlsZChyaWdodFNpZGUpO1xuICBwbGF5ZXJCb2FyZC5zaG93Qm9hcmQoJ3BsYXllci1maWVsZCcpO1xuICBjb25zdCBib3RHYW1lQm9hcmQgPSBjcmVhdGVSYW5kb21GaWVsZCgpO1xuICBib3RHYW1lQm9hcmQuc2hvd0JvYXJkKCdib3QtZmllbGQnKTtcbiAgcGxheWVyQm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHBsYXllckJvYXJkLnBsYWNlSW1hZ2Uoc2hpcCwgJ3BsYXllci1maWVsZCcpO1xuICB9KTtcbiAgZ2FtZUxvb3AocGxheWVyQm9hcmQsIGJvdEdhbWVCb2FyZCk7XG59XG5cbi8vIEZVTkNUSU9OIFdISUNIIENSRUFURVMgVEhFIFdFTENPTUUgU0NSRUVOXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWxjb21lU2NyZWVuKCkge1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZS1pbnB1dCcpO1xuICBuYW1lSW5wdXQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JnYigyMDQsIDIwOCwgMjA2KSc7XG4gIGNvbnN0IGFsZXJ0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC10ZXh0Jyk7XG5cbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgIGFsZXJ0VGV4dC5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbnB1dFZhbHVlID0gbmFtZUlucHV0LnZhbHVlO1xuICAgICAgY29uc3QgY29ycmVjdEZvcm0gPSBpbnB1dFZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICBwbGF5ZXIubmFtZSA9IGAke2NvcnJlY3RGb3JtfWA7XG4gICAgICBhbGVydFRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGJvYXJkUGlja2VyKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxXaW5uZXIod2lubmVyKSB7XG4gIGNvbnN0IHdpbm5pbmdTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmluZy1zY3JlZW4nKTtcbiAgY29uc3Qgd2lubmluZ1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLXF1ZXN0aW9uJyk7XG4gIGNvbnN0IHdpbm5pbmdJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5uZXItaW1hZ2UnKTtcblxuICB3aW5uaW5nU2NyZWVuLnN0eWxlLnRvcCA9ICcwJztcbiAgd2lubmluZ1NjcmVlbi5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICB3aW5uaW5nU2NyZWVuLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnYWxsJztcblxuICBpZiAod2lubmVyID09PSAncGxheWVyJykge1xuICAgIHdpbm5pbmdUZXh0LnRleHRDb250ZW50ID0gJ1lvdSB3b24hJztcbiAgICB3aW5uaW5nSW1hZ2Uuc3JjID0gJ2ltYWdlcy9wZXJzb24td2lubmVyLnBuZyc7XG4gIH0gZWxzZSB7XG4gICAgd2lubmluZ1RleHQudGV4dENvbnRlbnQgPSAnQ29tcHV0ZXIgd29uISc7XG4gICAgd2lubmluZ0ltYWdlLnNyYyA9ICdpbWFnZXMvY29tcHV0ZXItd2lubmVyLnBuZyc7XG4gICAgd2lubmluZ0ltYWdlLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoLTUwcHgsIDApJztcbiAgfVxufVxuXG4vLyBGVU5DVElPTiBGT1IgQ1JFQVRJTkcgUFJPUEVSIEhPVkVSIEVGRkVDVFNcblxuZXhwb3J0IGZ1bmN0aW9uIGhvdmVyQ29sb3JzKG9yaWVudGF0aW9uLCBsZW5ndGgpIHtcbiAgbGV0IHNoaXBPcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICBsZXQgYWN0aXZlTnVtYmVyID0gbGVuZ3RoO1xuICBjb25zdCBncmlkQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsJyk7XG4gIGNvbnN0IG9yaWVudGF0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJyk7XG5cbiAgZ3JpZENlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKG9yaWVudGF0aW9uQnV0dG9uLnRleHRDb250ZW50ID09PSAnQVhJUzogWCcpIHtcbiAgICAgICAgc2hpcE9yaWVudGF0aW9uID0gJ0FYSVM6IFgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcE9yaWVudGF0aW9uID0gJ0FYSVM6IFknO1xuICAgICAgfVxuXG4gICAgICBpZiAocGxheWVyR2FtZUJvYXJkLnNob3dDdXJyZW50U2l6ZSgpWzBdKSB7XG4gICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gcGxheWVyR2FtZUJvYXJkLnNob3dDdXJyZW50U2l6ZSgpWzBdLmxlbmd0aDtcbiAgICAgICAgbGV0IHByZXZpb3VzTGVuZ3RoO1xuXG4gICAgICAgIGlmIChwbGF5ZXJHYW1lQm9hcmQuc2hvd0N1cnJlbnRTaXplKClbMV0pIHtcbiAgICAgICAgICBwcmV2aW91c0xlbmd0aCA9IHBsYXllckdhbWVCb2FyZC5zaG93Q3VycmVudFNpemUoKVsxXS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudExlbmd0aCA9PT0gMyAmJiBwcmV2aW91c0xlbmd0aCAhPT0gMykge1xuICAgICAgICAgIGFjdGl2ZU51bWJlciA9IDM7XG4gICAgICAgICAgY3VycmVudExlbmd0aCAtPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRMZW5ndGggPT09IDQpIHtcbiAgICAgICAgICBhY3RpdmVOdW1iZXIgPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFjdGl2ZU51bWJlciA9IGN1cnJlbnRMZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbGxDbGFzc0xpc3QgPSBjZWxsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IFssIHJvdywgY29sXSA9IGNlbGxDbGFzc0xpc3RbMV0uc3BsaXQoJy0nKS5tYXAoTnVtYmVyKTtcblxuICAgICAgY29uc3QgbWF4Q2VsbHNJblJvdyA9IDEwIC0gcm93ICsgMTtcbiAgICAgIGNvbnN0IG1heENlbGxzSW5Db2wgPSAxMCAtIGNvbCArIDE7XG5cbiAgICAgIGlmIChhY3RpdmVOdW1iZXIgPiBtYXhDZWxsc0luUm93ICYmIHNoaXBPcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFknKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZlTnVtYmVyID4gbWF4Q2VsbHNJbkNvbCAmJiBzaGlwT3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hvdmVyZWQtcmVkJyk7XG4gICAgICB9IGVsc2UgaWYgKHBsYXllckdhbWVCb2FyZC5jaGVja09jY3VwaWVkKHJvdywgY29sLCBzaGlwT3JpZW50YXRpb24sIGFjdGl2ZU51bWJlcikpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkLXJlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhY3RpdmVOdW1iZXI7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5leHRSb3dDZWxsID0gZ3JpZENlbGxzW2luZGV4ICsgaV07XG4gICAgICAgICAgY29uc3QgbmV4dENvbENlbGwgPSBncmlkQ2VsbHNbaW5kZXggKyBpICogMTBdO1xuICAgICAgICAgIGlmIChuZXh0Um93Q2VsbCAmJiBzaGlwT3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgICAgICAgbmV4dFJvd0NlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmV4dENvbENlbGwgJiYgc2hpcE9yaWVudGF0aW9uID09PSAnQVhJUzogWScpIHtcbiAgICAgICAgICAgIG5leHRDb2xDZWxsLmNsYXNzTGlzdC5hZGQoJ2hvdmVyZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGlzVG91Y2hEZXZpY2UgPSAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCB8fCBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDA7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVIb3ZlcigpIHtcbiAgICAgIGdyaWRDZWxscy5mb3JFYWNoKChwb2xlKSA9PiB7XG4gICAgICAgIHBvbGUuY2xhc3NMaXN0LnJlbW92ZSgnaG92ZXJlZCcsICdob3ZlcmVkLXJlZCcpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGlzVG91Y2hEZXZpY2UpIHtcbiAgICAgIHNldFRpbWVvdXQocmVtb3ZlSG92ZXIsIDUwMCk7XG4gICAgfVxuXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgcmVtb3ZlSG92ZXIoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IHJlc2V0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ldy1nYW1lJyk7XG5yZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgbG9jYXRpb24ucmVsb2FkKCk7XG59KTtcbiIsImltcG9ydCBjb21wdXRlciBmcm9tICcuL2NvbXB1dGVyJztcbmltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgY2FsbFdpbm5lciB9IGZyb20gJy4vZG9tJztcblxuLy8gTUFOQUdFUyBUSEUgRkxPVyBPRiBUSEUgR0FNRVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnYW1lTG9vcChwbGF5ZXJCb2FyZCwgYm90Qm9hcmQpIHtcbiAgY29uc3QgZG9tQm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90LWZpZWxkJyk7XG5cbiAgZG9tQm90Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChwbGF5ZXIucGxheVN0YXR1cykge1xuICAgICAgY29uc3Qgcm91bmQgPSBwbGF5ZXIucGxheWVyQXR0YWNrKGUsIHBsYXllckJvYXJkLCBib3RCb2FyZCk7XG5cbiAgICAgIGlmIChyb3VuZCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBjb21wdXRlci5wbGF5Q29tcHV0ZXIoXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZC5vY2N1cGllZENvb3JkaW5hdGVzLFxuICAgICAgICAgICAgcGxheWVyQm9hcmQuYm9tYmVkQ29vcmRpbmF0ZXMsXG4gICAgICAgICAgICBwbGF5ZXJCb2FyZCxcbiAgICAgICAgICAgIGJvdEJvYXJkLFxuICAgICAgICAgICk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLmJvbWJlZENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgdXBkYXRlQm9tYmVkKGJvbWJlZEl0ZW0pIHtcbiAgICB0aGlzLmJvbWJlZENvb3JkaW5hdGVzLnB1c2goYm9tYmVkSXRlbSk7XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhvY2N1cGllZEl0ZW0pIHtcbiAgICB0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMucHVzaChvY2N1cGllZEl0ZW0pO1xuICB9XG5cbiAgbWFya1N1bmtTaGlwcyhzaGlwLCBmaWVsZCkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBbXTtcbiAgICBjb25zdCBwbGF5RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtmaWVsZH1gKTtcbiAgICBjb25zdCBzdGFydFBvc2l0aW9uID0gc2hpcC5wb3NpdGlvbjtcbiAgICBjb25zdCBnaXZlbkxlbmd0aCA9IHNoaXAubGVuZ3RoO1xuICAgIGNvbnN0IFtwcmVmaXgsIHJvdywgY29sXSA9IHN0YXJ0UG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdpdmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGAke3ByZWZpeH0tJHtyb3d9LSR7TnVtYmVyKGNvbCkgKyBpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdpdmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKGAke3ByZWZpeH0tJHtOdW1iZXIocm93KSArIGl9LSR7Y29sfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzZXMuZm9yRWFjaCgoY2VsbFN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHBsYXlGaWVsZC5xdWVyeVNlbGVjdG9yKGAuJHtjZWxsU3RyaW5nfWApO1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzYW5rJyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja09jY3VwaWVkKHJvdywgY29sLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3BvdCA9IGBjZWxsLSR7cm93fS0ke2NvbCArIGl9YDtcbiAgICAgICAgaWYgKHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3BvdCA9IGBjZWxsLSR7cm93ICsgaX0tJHtjb2x9YDtcbiAgICAgICAgaWYgKHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gQ1JFQVRFUyBUSEUgR0FNRSBHUklEIElOIERPTVxuXG4gIHNob3dCb2FyZChjbGFzc05hbWUpIHtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICAgIGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuXG4gICAgICAgIGNvbnN0IHVuaXF1ZUNsYXNzTmFtZSA9IGBjZWxsLSR7aSArIDF9LSR7aiArIDF9YDtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNob3dDdXJyZW50U2l6ZSgpIHtcbiAgICBjb25zdCBpbmZvQXJyID0gW3RoaXMuc2hpcHNbdGhpcy5zaGlwcy5sZW5ndGggLSAxXSwgdGhpcy5zaGlwc1t0aGlzLnNoaXBzLmxlbmd0aCAtIDJdXTtcbiAgICByZXR1cm4gaW5mb0FycjtcbiAgfVxuXG4gIHBsYWNlSW1hZ2Uoc2hpcCwgZ2FtZUZpZWxkLCBzdGF0dXMsIG9sZEltYWdlKSB7XG4gICAgbGV0IGdhcCA9IDQ7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgMTA3MCkgZ2FwID0gMjtcbiAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLWNlbGwnKTtcbiAgICBjb25zdCBjZWxsU2l6ZSA9IGdyaWRDZWxsLm9mZnNldFdpZHRoO1xuICAgIGNvbnN0IHBvc2l0aW9uUGFydHMgPSBzaGlwLnBvc2l0aW9uLnNwbGl0KCctJyk7XG4gICAgY29uc3Qgcm93ID0gTnVtYmVyKHBvc2l0aW9uUGFydHNbMV0pO1xuICAgIGNvbnN0IGNvbCA9IE51bWJlcihwb3NpdGlvblBhcnRzWzJdKTtcbiAgICBsZXQgbGVmdE1hcmdpbjtcbiAgICBsZXQgdG9wTWFyZ2luO1xuICAgIGNvbnN0IGZpbmFsU2l6ZSA9ICgoY2VsbFNpemUgKyBnYXApICogc2hpcC5sZW5ndGgpO1xuICAgIGNvbnN0IGZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Z2FtZUZpZWxkfWApO1xuICAgIGNvbnN0IHN0YXJ0aW5nUG9pbnQgPSBmaWVsZC5xdWVyeVNlbGVjdG9yKGAuJHtzaGlwLnBvc2l0aW9ufWApO1xuICAgIGNvbnN0IGltYWdlVG9SZW1vdmUgPSBzdGFydGluZ1BvaW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuICAgIGNvbnN0IHNoaXBJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgIHNoaXBJbWFnZS5jbGFzc0xpc3QuYWRkKCdzaGlwLWltYWdlLXgnKTtcbiAgICAgIHRvcE1hcmdpbiA9IChncmlkQ2VsbC5vZmZzZXRXaWR0aCArIGdhcCkgKiAocm93IC0gMSk7XG4gICAgICBsZWZ0TWFyZ2luID0gKGdyaWRDZWxsLm9mZnNldFdpZHRoICsgZ2FwKSAqIChjb2wgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoJ3NoaXAtaW1hZ2UteScpO1xuICAgICAgdG9wTWFyZ2luID0gKGdyaWRDZWxsLm9mZnNldFdpZHRoICsgZ2FwKSAqIChyb3cgLSAxKTtcbiAgICAgIGxlZnRNYXJnaW4gPSAoZ3JpZENlbGwub2Zmc2V0V2lkdGggKyBnYXApICogKGNvbCAtIDEpO1xuICAgIH1cbiAgICBzaGlwSW1hZ2Uuc3R5bGUud2lkdGggPSBgJHtmaW5hbFNpemV9cHhgO1xuICAgIHNoaXBJbWFnZS5zdHlsZS50b3AgPSBgJHt0b3BNYXJnaW59cHhgO1xuICAgIHNoaXBJbWFnZS5zdHlsZS5sZWZ0ID0gYCR7bGVmdE1hcmdpbn1weGA7XG4gICAgaWYgKG9sZEltYWdlKSB7XG4gICAgICBpbWFnZVRvUmVtb3ZlLnJlbW92ZSgpO1xuICAgIH1cbiAgICBpZiAoc3RhdHVzKSB7XG4gICAgICBpZiAoc2hpcC5sZW5ndGggPT09IDIpIHNoaXBJbWFnZS5jbGFzc0xpc3QuYWRkKGBsZW5ndGgtJHsyfWApO1xuICAgICAgc2hpcEltYWdlLnNyYyA9IGBpbWFnZXMvJHtzaGlwLmxlbmd0aH0tc2hpcC1kZWFkLnBuZ2A7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzaGlwLmxlbmd0aCA9PT0gMikgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoYGxlbmd0aC0kezJ9YCk7XG4gICAgICBzaGlwSW1hZ2Uuc3JjID0gYGltYWdlcy8ke3NoaXAubGVuZ3RofS1zaGlwLnBuZ2A7XG4gICAgfVxuICAgIHN0YXJ0aW5nUG9pbnQuYXBwZW5kQ2hpbGQoc2hpcEltYWdlKTtcbiAgfVxufVxuIiwiaW1wb3J0IHNob3dXaW5uZXIgZnJvbSAnLi9kZXRlcm1pbmVXaW5uZXInO1xuXG5jb25zdCBwbGF5ZXIgPSB7XG4gIHBsYXllckF0dGFjayhldmVudCwgcGxheWVyQm9hcmQsIGJvdEJvYXJkKSB7XG4gICAgY29uc3QgZG9tQm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90LWZpZWxkJyk7XG4gICAgY29uc3QgY2xpY2tlZEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNsaWNrZWRFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjb25zdCBjbGFzc2VzQXJyYXkgPSBBcnJheS5mcm9tKGNsYXNzZXMpO1xuICAgIGlmIChjbGFzc2VzQXJyYXkuaW5jbHVkZXMoJ2dyaWQtY2VsbCcpICYmICFib3RCb2FyZC5ib21iZWRDb29yZGluYXRlcy5pbmNsdWRlcyhjbGFzc2VzQXJyYXlbMV0pKSB7XG4gICAgICBjb25zdCBjaG9zZW5TcG90ID0gY2xhc3Nlc0FycmF5WzFdO1xuICAgICAgaWYgKGJvdEJvYXJkLm9jY3VwaWVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoY2hvc2VuU3BvdCkpIHtcbiAgICAgICAgY29uc3Qgc3BvdEluZGV4ID0gYm90Qm9hcmQub2NjdXBpZWRDb29yZGluYXRlcy5pbmRleE9mKGNob3NlblNwb3QpO1xuICAgICAgICBsZXQgc2hpcEhpdDtcblxuICAgICAgICBpZiAoc3BvdEluZGV4ID49IDAgJiYgc3BvdEluZGV4IDwgNSkge1xuICAgICAgICAgIHNoaXBIaXQgPSBib3RCb2FyZC5zaGlwc1swXTtcbiAgICAgICAgfSBlbHNlIGlmIChzcG90SW5kZXggPCA5KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IGJvdEJvYXJkLnNoaXBzWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDEyKSB7XG4gICAgICAgICAgc2hpcEhpdCA9IGJvdEJvYXJkLnNoaXBzWzJdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDE1KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IGJvdEJvYXJkLnNoaXBzWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoaXBIaXQgPSBib3RCb2FyZC5zaGlwc1s0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBIaXQuaGl0KCk7XG5cbiAgICAgICAgaWYgKHNoaXBIaXQuaXNTdW5rKCkpIHtcbiAgICAgICAgICBib3RCb2FyZC5wbGFjZUltYWdlKHNoaXBIaXQsICdib3QtZmllbGQnLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRvbUNob3NlblNwb3QgPSBkb21Cb3RCb2FyZC5xdWVyeVNlbGVjdG9yKGAuJHtjaG9zZW5TcG90fWApO1xuICAgICAgICBjb25zdCBoaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBkb21DaG9zZW5TcG90LmFwcGVuZENoaWxkKGhpdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkb21DaG9zZW5TcG90ID0gZG9tQm90Qm9hcmQucXVlcnlTZWxlY3RvcihgLiR7Y2hvc2VuU3BvdH1gKTtcbiAgICAgICAgY29uc3Qgbm9IaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm9IaXQuY2xhc3NMaXN0LmFkZCgnbm8taGl0Jyk7XG4gICAgICAgIGRvbUNob3NlblNwb3QuYXBwZW5kQ2hpbGQobm9IaXQpO1xuICAgICAgfVxuICAgICAgYm90Qm9hcmQuYm9tYmVkQ29vcmRpbmF0ZXMucHVzaChjaG9zZW5TcG90KTtcblxuICAgICAgc2V0VGltZW91dChzaG93V2lubmVyLCAxMDAwLCBib3RCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4gICAgICB0aGlzLnBsYXlTdGF0dXMgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBwbGF5U3RhdHVzOiB0cnVlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyO1xuIiwiaW1wb3J0IGNoZWNrU3RhdHVzIGZyb20gJy4vYXZhaWxhYmlsaXR5VmFsaWRhdG9yJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUmFuZG9tRmllbGQoKSB7XG4gIGNvbnN0IGJvdEdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3Qgc2hpcFNpemVzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBjb25zdCBvcmllbnRhdGlvbiA9IFsnQVhJUzogWCcsICdBWElTOiBZJ107XG5cbiAgd2hpbGUgKHNoaXBTaXplcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHhOdW07XG4gICAgbGV0IHlOdW07XG4gICAgY29uc3QgY3VycmVudFNpemUgPSBzaGlwU2l6ZXMuc2hpZnQoKTtcbiAgICBjb25zdCBvcmllbnRhdGlvblBpY2sgPSBvcmllbnRhdGlvbltNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXTtcbiAgICBjb25zdCByYW5kb21QaWNrID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICBjb25zdCBzdGFydFBvaW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gY3VycmVudFNpemUpKSArIDE7XG4gICAgaWYgKG9yaWVudGF0aW9uUGljayA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICB4TnVtID0gcmFuZG9tUGljaztcbiAgICAgIHlOdW0gPSBzdGFydFBvaW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB4TnVtID0gc3RhcnRQb2ludDtcbiAgICAgIHlOdW0gPSByYW5kb21QaWNrO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0ZWRDbGFzcyA9IGBjZWxsLSR7eE51bX0tJHt5TnVtfWA7XG4gICAgLy8gY29uc29sZS5sb2coY29ubmVjdGVkQ2xhc3MpO1xuXG4gICAgaWYgKCFjaGVja1N0YXR1cyhjb25uZWN0ZWRDbGFzcywgY3VycmVudFNpemUsIG9yaWVudGF0aW9uUGljaywgYm90R2FtZUJvYXJkKSkge1xuICAgICAgc2hpcFNpemVzLnVuc2hpZnQoY3VycmVudFNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoY3VycmVudFNpemUsIG9yaWVudGF0aW9uUGljaywgY29ubmVjdGVkQ2xhc3MpO1xuICAgICAgYm90R2FtZUJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3RHYW1lQm9hcmQ7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLXJldHVybiAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcbmltcG9ydCBjaGVja1NoaXBWYWxpZGl0eSBmcm9tICcuL3Nwb3RWYWxpZGF0b3InO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgY2hlY2tTdGF0dXMgZnJvbSAnLi9hdmFpbGFiaWxpdHlWYWxpZGF0b3InO1xuaW1wb3J0IHsgY3JlYXRlTWFpbkdhbWVGaWVsZCwgaG92ZXJDb2xvcnMgfSBmcm9tICcuL2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBMaXN0ZW5lcihjbGFzc05hbWUsIHBsYXllckdhbWVCb2FyZCkge1xuICBjb25zdCBzaGlwU2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG4gIGNvbnN0IGdhbWVGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcbiAgaG92ZXJDb2xvcnMoJ0FYSVM6IFgnLCA1KTtcblxuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgY29uc3QgcG9zaXRpb24gPSBjbGFzc2VzWzFdO1xuXG4gICAgaWYgKGNsYXNzZXMubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwU2l6ZXMuc2hpZnQoKTtcblxuICAgIGNvbnN0IHNoaXBPcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpLnRleHRDb250ZW50O1xuXG4gICAgaG92ZXJDb2xvcnMoc2hpcE9yaWVudGF0aW9uLCBzaGlwTGVuZ3RoKTtcblxuICAgIGlmIChjaGVja1NoaXBWYWxpZGl0eShzaGlwT3JpZW50YXRpb24sIHNoaXBMZW5ndGgsIHBvc2l0aW9uKSAmJiBjaGVja1N0YXR1cyhwb3NpdGlvbiwgc2hpcExlbmd0aCwgc2hpcE9yaWVudGF0aW9uLCBwbGF5ZXJHYW1lQm9hcmQpKSB7XG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCwgc2hpcE9yaWVudGF0aW9uLCBwb3NpdGlvbik7XG4gICAgICBwbGF5ZXJHYW1lQm9hcmQuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5wbGFjZUltYWdlKHNoaXAsICdncmlkLWNvbnRhaW5lci1waWNrZXInKTtcbiAgICAgIGlmIChzaGlwU2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGdhbWVGaWVsZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRBbmltYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2dyb3VuZC1hbmltYXRpb24tc3BhY2UnKTtcbiAgICAgICAgYmFja2dyb3VuZEFuaW1hdGlvbi5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLWFuaW1hdGlvbicpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNyZWF0ZU1haW5HYW1lRmllbGQocGxheWVyR2FtZUJvYXJkKTtcbiAgICAgICAgfSwgODAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaGlwU2l6ZXMudW5zaGlmdChzaGlwTGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyXG4gIGdhbWVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBvcmllbnRhdGlvbiwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ZXIgPSAwO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudGVyKys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0Q291bnRlciA9PT0gdGhpcy5sZW5ndGg7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hpcFZhbGlkaXR5KGF4aXMsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgY29uc3QgcmVhbFNpemUgPSBsZW5ndGggLSAxO1xuICBjb25zdCBheGlzUGFydHMgPSBwb3NpdGlvbi5zcGxpdCgnLScpO1xuICBjb25zdCByb3cgPSBOdW1iZXIoYXhpc1BhcnRzWzFdKTtcbiAgY29uc3QgY29sID0gTnVtYmVyKGF4aXNQYXJ0c1syXSk7XG4gIGlmIChheGlzID09PSAnQVhJUzogWCcpIHtcbiAgICBpZiAoKGNvbCArIHJlYWxTaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9IGlmIChheGlzID09PSAnQVhJUzogWScpIHtcbiAgICBpZiAoKHJvdyArIHJlYWxTaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVdlbGNvbWVTY3JlZW4gfSBmcm9tICcuL21vZHVsZXMvZG9tJztcblxuY3JlYXRlV2VsY29tZVNjcmVlbigpO1xuXG5mdW5jdGlvbiByZWxvYWRQYWdlKCkge1xuICBsb2NhdGlvbi5yZWxvYWQoKTtcbn1cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgKCkgPT4ge1xuICByZWxvYWRQYWdlKCk7XG59KTtcbiJdLCJuYW1lcyI6WyJjaGVja1N0YXR1cyIsIm5ld1Bvc2l0aW9uIiwibGVuZ3RoIiwib3JpZW50YXRpb24iLCJwbGF5Qm9hcmQiLCJheGlzUGFydHMiLCJzcGxpdCIsInJvdyIsIk51bWJlciIsImNvbCIsImNoZWNrT2NjdXBpZWQiLCJpIiwidXBkYXRlQ29vcmRpbmF0ZXMiLCJwbGF5ZXIiLCJzaG93V2lubmVyIiwiY29tcHV0ZXIiLCJnZW5lcmF0ZVJhbmRvbU1vdmUiLCJib21iZWRBcnIiLCJudW0xIiwibnVtMiIsImNvb3JkaW5hdGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpbmNsdWRlcyIsImZpbmRBZGphY2VudEhpdENlbGxzIiwiZGlyZWN0aW9uIiwiZG9tUGxheWVyQm9hcmQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJncmlkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImFkamFjZW50Q2VsbHMiLCJkaXJlY3Rpb25zIiwibGVmdCIsInJpZ2h0IiwidXAiLCJkb3duIiwiY3VycmVudFJvdyIsImN1cnJlbnRDb2wiLCJuZXdSb3ciLCJuZXdDb2wiLCJjZWxsQ2xhc3NOYW1lIiwiY2VsbCIsImZpbmQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImlubmVyRGl2IiwicHVzaCIsInBsYXlDb21wdXRlciIsIm9jY3VwaWVkQXJyIiwicGxheWVyQm9hcmQiLCJib3RCb2FyZCIsInJhbmRvbUNvb3JkaW5hdGUiLCJkb21DaG9zZW5TcG90Iiwib3V0ZXJMb29wIiwibGVmdENlbGxzIiwicmlnaHRDZWxscyIsInVwQ2VsbHMiLCJkb3duQ2VsbHMiLCJuZXdDb2xWZXJPbmUiLCJuZXdDb2xWZXJUd28iLCJmaW5hbENsYXNzIiwiY2hlY2tIaXQiLCJuZXdSb3dWZXJPbmUiLCJuZXdSb3dWZXJUd28iLCJvbmVSaWdodCIsIm9uZUxlZnQiLCJvbmVUb3AiLCJvbmVCb3R0b20iLCJtYXhBdHRlbXB0cyIsInNlbGVjdGVkRGlyZWN0aW9uIiwiYXR0ZW1wdHMiLCJzcG90IiwiZmluYWxTcG90Iiwic3BvdEluZGV4IiwiaW5kZXhPZiIsInNoaXBIaXQiLCJzaGlwcyIsImhpdCIsImlzU3VuayIsInBsYWNlSW1hZ2UiLCJtYXJrU3Vua1NoaXBzIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImFwcGVuZENoaWxkIiwibm9IaXQiLCJzZXRUaW1lb3V0IiwicGxheVN0YXR1cyIsImNhbGxXaW5uZXIiLCJ1cGRhdGVEb20iLCJ3aW5uZXIiLCJ3cmFwcGVyIiwid2luZG93Iiwic2Nyb2xsVG8iLCJpbm5lckhUTUwiLCJwbGF5ZXJXaW4iLCJvY2N1cGllZENvb3JkaW5hdGVzIiwiZXZlcnkiLCJpdGVtIiwiYm9tYmVkQ29vcmRpbmF0ZXMiLCJib3RXaW4iLCJHYW1lYm9hcmQiLCJzaGlwTGlzdGVuZXIiLCJjcmVhdGVSYW5kb21GaWVsZCIsImdhbWVMb29wIiwibWlkZGxlSGVhZGluZyIsImlucHV0RWxlbWVudCIsIm1haW5BcmVhIiwibG9nb0ltYWdlIiwieHlCdXR0b24iLCJzdGFydEJ1dHRvbiIsInJ1bGVzQnV0dG9uIiwiZ3JpZENvbnRhaW5lciIsImxlZnRTaWRlIiwicmlnaHRTaWRlIiwicGxheWVySGVhZGluZyIsImJvdEhlYWRpbmciLCJwbGF5ZXJGaWVsZCIsImJvdEZpZWxkIiwiaGVhZGVyIiwicGlja2VySW1hZ2UiLCJzcmMiLCJwbGF5ZXJHYW1lQm9hcmQiLCJjaGVja0J1dHRvbiIsImF4aXMiLCJhZGRFdmVudExpc3RlbmVyIiwidGV4dENvbnRlbnQiLCJib2FyZFBpY2tlciIsInJlbW92ZSIsInN0eWxlIiwiZ2FwIiwibmFtZSIsIm1hcmdpblRvcCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJyZW1vdmVDaGlsZCIsInNob3dCb2FyZCIsImNyZWF0ZU1haW5HYW1lRmllbGQiLCJtYXJnaW5Cb3R0b20iLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwiYm90R2FtZUJvYXJkIiwiZm9yRWFjaCIsInNoaXAiLCJjcmVhdGVXZWxjb21lU2NyZWVuIiwibmFtZUlucHV0IiwiYmFja2dyb3VuZENvbG9yIiwiYWxlcnRUZXh0IiwidmFsdWUiLCJjb2xvciIsImlucHV0VmFsdWUiLCJjb3JyZWN0Rm9ybSIsInJlcGxhY2UiLCJ3aW5uaW5nU2NyZWVuIiwid2lubmluZ1RleHQiLCJ3aW5uaW5nSW1hZ2UiLCJ0b3AiLCJ2aXNpYmlsaXR5IiwicG9pbnRlckV2ZW50cyIsInRyYW5zZm9ybSIsImhvdmVyQ29sb3JzIiwic2hpcE9yaWVudGF0aW9uIiwiYWN0aXZlTnVtYmVyIiwiZ3JpZENlbGxzIiwib3JpZW50YXRpb25CdXR0b24iLCJpbmRleCIsInNob3dDdXJyZW50U2l6ZSIsImN1cnJlbnRMZW5ndGgiLCJwcmV2aW91c0xlbmd0aCIsImNlbGxDbGFzc0xpc3QiLCJtYXAiLCJtYXhDZWxsc0luUm93IiwibWF4Q2VsbHNJbkNvbCIsIm5leHRSb3dDZWxsIiwibmV4dENvbENlbGwiLCJpc1RvdWNoRGV2aWNlIiwibmF2aWdhdG9yIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwicmVtb3ZlSG92ZXIiLCJwb2xlIiwicmVzZXRCdXR0b24iLCJsb2NhdGlvbiIsInJlbG9hZCIsImRvbUJvdEJvYXJkIiwiZSIsInJvdW5kIiwicGxheWVyQXR0YWNrIiwiY29uc3RydWN0b3IiLCJ1cGRhdGVCb21iZWQiLCJib21iZWRJdGVtIiwib2NjdXBpZWRJdGVtIiwiZmllbGQiLCJjbGFzc2VzIiwicGxheUZpZWxkIiwic3RhcnRQb3NpdGlvbiIsInBvc2l0aW9uIiwiZ2l2ZW5MZW5ndGgiLCJwcmVmaXgiLCJjZWxsU3RyaW5nIiwiZWxlbWVudCIsImNsYXNzTmFtZSIsImoiLCJncmlkQ2VsbCIsInVuaXF1ZUNsYXNzTmFtZSIsImluZm9BcnIiLCJnYW1lRmllbGQiLCJzdGF0dXMiLCJvbGRJbWFnZSIsImlubmVyV2lkdGgiLCJjZWxsU2l6ZSIsIm9mZnNldFdpZHRoIiwicG9zaXRpb25QYXJ0cyIsImxlZnRNYXJnaW4iLCJ0b3BNYXJnaW4iLCJmaW5hbFNpemUiLCJzdGFydGluZ1BvaW50IiwiaW1hZ2VUb1JlbW92ZSIsInNoaXBJbWFnZSIsIndpZHRoIiwiZXZlbnQiLCJjbGlja2VkRWxlbWVudCIsInRhcmdldCIsImNsYXNzZXNBcnJheSIsImNob3NlblNwb3QiLCJTaGlwIiwic2hpcFNpemVzIiwieE51bSIsInlOdW0iLCJjdXJyZW50U2l6ZSIsInNoaWZ0Iiwib3JpZW50YXRpb25QaWNrIiwicmFuZG9tUGljayIsInN0YXJ0UG9pbnQiLCJjb25uZWN0ZWRDbGFzcyIsInVuc2hpZnQiLCJuZXdTaGlwIiwiY2hlY2tTaGlwVmFsaWRpdHkiLCJhbGxTaGlwcyIsImNsaWNrSGFuZGxlciIsInNoaXBMZW5ndGgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYmFja2dyb3VuZEFuaW1hdGlvbiIsImhpdENvdW50ZXIiLCJyZWFsU2l6ZSIsInJlbG9hZFBhZ2UiXSwic291cmNlUm9vdCI6IiJ9