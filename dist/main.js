/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/checkers/availabilityValidator.js":
/*!*******************************************************!*\
  !*** ./src/modules/checkers/availabilityValidator.js ***!
  \*******************************************************/
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

/***/ "./src/modules/checkers/determineWinner.js":
/*!*************************************************!*\
  !*** ./src/modules/checkers/determineWinner.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showWinner)
/* harmony export */ });
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/dom */ "./src/modules/dom/dom.js");

function updateDom(winner) {
  const wrapper = document.querySelector('.wrapper');
  if (winner === 'player') {
    window.scrollTo(0, 0);
    wrapper.innerHTML = '';
    (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.callWinner)('player');
  } else if (winner === 'computer') {
    window.scrollTo(0, 0);
    wrapper.innerHTML = '';
    (0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.callWinner)('computer');
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

/***/ "./src/modules/checkers/spotValidator.js":
/*!***********************************************!*\
  !*** ./src/modules/checkers/spotValidator.js ***!
  \***********************************************/
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
  return 'none';
}

/***/ }),

/***/ "./src/modules/dom/dom.js":
/*!********************************!*\
  !*** ./src/modules/dom/dom.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   callWinner: () => (/* binding */ callWinner),
/* harmony export */   createMainGameField: () => (/* binding */ createMainGameField),
/* harmony export */   createWelcomeScreen: () => (/* binding */ createWelcomeScreen),
/* harmony export */   hoverColors: () => (/* binding */ hoverColors)
/* harmony export */ });
/* harmony import */ var _game_objects_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-objects/player */ "./src/modules/game-objects/player.js");
/* harmony import */ var _game_objects_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-objects/gameboard */ "./src/modules/game-objects/gameboard.js");
/* harmony import */ var _ship_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-listener */ "./src/modules/dom/ship-listener.js");
/* harmony import */ var _game_loop_randomField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game-loop/randomField */ "./src/modules/game-loop/randomField.js");
/* harmony import */ var _game_loop_game_loop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game-loop/game-loop */ "./src/modules/game-loop/game-loop.js");






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
  middleHeading.textContent = `${_game_objects_player__WEBPACK_IMPORTED_MODULE_0__["default"].name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '10px';
  xyButton.textContent = 'AXIS: X';
  inputElement.parentNode.replaceChild(xyButton, inputElement);
  xyButton.classList.add('axis-button');
  wrapper.style.gap = '10px';
  mainArea.removeChild(startButton);
  mainArea.appendChild(gridContainer);
  checkButton();
  playerGameBoard = new _game_objects_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
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
  const botGameBoard = (0,_game_loop_randomField__WEBPACK_IMPORTED_MODULE_3__["default"])();
  botGameBoard.showBoard('bot-field');
  playerBoard.ships.forEach(ship => {
    playerBoard.placeImage(ship, 'player-field');
  });
  (0,_game_loop_game_loop__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, botGameBoard);
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
      _game_objects_player__WEBPACK_IMPORTED_MODULE_0__["default"].name = `${correctForm}`;
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

/***/ "./src/modules/dom/ship-listener.js":
/*!******************************************!*\
  !*** ./src/modules/dom/ship-listener.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipListener)
/* harmony export */ });
/* harmony import */ var _game_objects_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-objects/ship */ "./src/modules/game-objects/ship.js");
/* harmony import */ var _checkers_spotValidator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../checkers/spotValidator */ "./src/modules/checkers/spotValidator.js");
/* harmony import */ var _game_objects_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-objects/gameboard */ "./src/modules/game-objects/gameboard.js");
/* harmony import */ var _checkers_availabilityValidator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../checkers/availabilityValidator */ "./src/modules/checkers/availabilityValidator.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom */ "./src/modules/dom/dom.js");
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
    if ((0,_checkers_spotValidator__WEBPACK_IMPORTED_MODULE_1__["default"])(shipOrientation, shipLength, position) && (0,_checkers_availabilityValidator__WEBPACK_IMPORTED_MODULE_3__["default"])(position, shipLength, shipOrientation, playerGameBoard)) {
      const ship = new _game_objects_ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
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

/***/ "./src/modules/game-loop/game-loop.js":
/*!********************************************!*\
  !*** ./src/modules/game-loop/game-loop.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ gameLoop)
/* harmony export */ });
/* harmony import */ var _game_objects_computer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game-objects/computer */ "./src/modules/game-objects/computer.js");
/* harmony import */ var _game_objects_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-objects/player */ "./src/modules/game-objects/player.js");
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom/dom */ "./src/modules/dom/dom.js");




// MANAGES THE FLOW OF THE GAME

function gameLoop(playerBoard, botBoard) {
  const domBotBoard = document.querySelector('.bot-field');
  domBotBoard.addEventListener('click', e => {
    if (_game_objects_player__WEBPACK_IMPORTED_MODULE_1__["default"].playStatus) {
      const round = _game_objects_player__WEBPACK_IMPORTED_MODULE_1__["default"].playerAttack(e, playerBoard, botBoard);
      if (round) {
        setTimeout(() => {
          _game_objects_computer__WEBPACK_IMPORTED_MODULE_0__["default"].playComputer(playerBoard.occupiedCoordinates, playerBoard.bombedCoordinates, playerBoard, botBoard);
        }, 1000);
      }
    }
  });
}

/***/ }),

/***/ "./src/modules/game-loop/randomField.js":
/*!**********************************************!*\
  !*** ./src/modules/game-loop/randomField.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createRandomField)
/* harmony export */ });
/* harmony import */ var _checkers_availabilityValidator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../checkers/availabilityValidator */ "./src/modules/checkers/availabilityValidator.js");
/* harmony import */ var _game_objects_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-objects/gameboard */ "./src/modules/game-objects/gameboard.js");
/* harmony import */ var _game_objects_ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../game-objects/ship */ "./src/modules/game-objects/ship.js");



function createRandomField() {
  const botGameBoard = new _game_objects_gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
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

    if (!(0,_checkers_availabilityValidator__WEBPACK_IMPORTED_MODULE_0__["default"])(connectedClass, currentSize, orientationPick, botGameBoard)) {
      shipSizes.unshift(currentSize);
    } else {
      const newShip = new _game_objects_ship__WEBPACK_IMPORTED_MODULE_2__["default"](currentSize, orientationPick, connectedClass);
      botGameBoard.ships.push(newShip);
    }
  }
  return botGameBoard;
}

/***/ }),

/***/ "./src/modules/game-objects/computer.js":
/*!**********************************************!*\
  !*** ./src/modules/game-objects/computer.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   generateRandomMove: () => (/* binding */ generateRandomMove)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/game-objects/player.js");
/* harmony import */ var _checkers_determineWinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../checkers/determineWinner */ "./src/modules/checkers/determineWinner.js");
/* eslint-disable no-labels */
/* eslint-disable no-shadow */
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
      setTimeout(_checkers_determineWinner__WEBPACK_IMPORTED_MODULE_1__["default"], 1000, botBoard, playerBoard);
      bombedArr.push(spot);
      _player__WEBPACK_IMPORTED_MODULE_0__["default"].playStatus = true;
    }
    const grid = Array.from(domPlayerBoard.querySelectorAll('.grid-cell'));
    const randomCoordinate = this.generateRandomMove(bombedArr);
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
            checkHit(finalClass);
            break outerLoop;
          } else {
            const oneRight = `cell-${row}-${col + 1}`;
            const oneLeft = `cell-${row}-${col - 1}`;
            const oneTop = `cell-${row - 1}-${col}`;
            const oneBottom = `cell-${row + 1}-${col}`;
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
  }
};
const generateRandomMove = computer.generateRandomMove;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computer);

/***/ }),

/***/ "./src/modules/game-objects/gameboard.js":
/*!***********************************************!*\
  !*** ./src/modules/game-objects/gameboard.js ***!
  \***********************************************/
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

/***/ "./src/modules/game-objects/player.js":
/*!********************************************!*\
  !*** ./src/modules/game-objects/player.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _checkers_determineWinner__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../checkers/determineWinner */ "./src/modules/checkers/determineWinner.js");

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
      setTimeout(_checkers_determineWinner__WEBPACK_IMPORTED_MODULE_0__["default"], 1000, botBoard, playerBoard);
      this.playStatus = false;
      return true;
    }
    return false;
  },
  playStatus: true
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

/***/ }),

/***/ "./src/modules/game-objects/ship.js":
/*!******************************************!*\
  !*** ./src/modules/game-objects/ship.js ***!
  \******************************************/
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
/* harmony import */ var _modules_dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom/dom */ "./src/modules/dom/dom.js");

(0,_modules_dom_dom__WEBPACK_IMPORTED_MODULE_0__.createWelcomeScreen)();
function reloadPage() {
  location.reload();
}
window.addEventListener('orientationchange', () => {
  reloadPage();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VztJQUM5QixJQUFJLENBQUMrQixRQUFRLEdBQUdBLFFBQVE7RUFDMUI7RUFFQStKLEdBQUdBLENBQUEsRUFBRztJQUNKLElBQUksQ0FBQ3VELFVBQVUsRUFBRTtFQUNuQjtFQUVBdEQsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsT0FBTyxJQUFJLENBQUNzRCxVQUFVLEtBQUssSUFBSSxDQUFDdFAsTUFBTTtFQUN4QztBQUNGOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndEO0FBRXhEb0YscUVBQW1CLENBQUMsQ0FBQztBQUVyQixTQUFTbUssVUFBVUEsQ0FBQSxFQUFHO0VBQ3BCMUgsUUFBUSxDQUFDQyxNQUFNLENBQUMsQ0FBQztBQUNuQjtBQUVBN0csTUFBTSxDQUFDNEMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsTUFBTTtFQUNqRDBMLFVBQVUsQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY2hlY2tlcnMvYXZhaWxhYmlsaXR5VmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9jaGVja2Vycy9kZXRlcm1pbmVXaW5uZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2NoZWNrZXJzL3Nwb3RWYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbS9zaGlwLWxpc3RlbmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLWxvb3AvZ2FtZS1sb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lLWxvb3AvcmFuZG9tRmllbGQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWUtb2JqZWN0cy9jb21wdXRlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS1vYmplY3RzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS1vYmplY3RzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS1vYmplY3RzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ0hFQ0tTIElGIFRIRSBDT09SRElOQVRFIENBTiBCRSBDSE9TRU5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTdGF0dXMoXG4gIG5ld1Bvc2l0aW9uLFxuICBsZW5ndGgsXG4gIG9yaWVudGF0aW9uLFxuICBwbGF5Qm9hcmQsXG4pIHtcbiAgY29uc3QgYXhpc1BhcnRzID0gbmV3UG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgY29uc3Qgcm93ID0gTnVtYmVyKGF4aXNQYXJ0c1sxXSk7XG4gIGNvbnN0IGNvbCA9IE51bWJlcihheGlzUGFydHNbMl0pO1xuICBpZiAoIXBsYXlCb2FyZC5jaGVja09jY3VwaWVkKHJvdywgY29sLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSkge1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYXlCb2FyZC51cGRhdGVDb29yZGluYXRlcyhgY2VsbC0ke3Jvd30tJHtjb2wgKyBpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICdBWElTOiBZJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBwbGF5Qm9hcmQudXBkYXRlQ29vcmRpbmF0ZXMoYGNlbGwtJHtyb3cgKyBpfS0ke2NvbH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGxheUJvYXJkLmNoZWNrT2NjdXBpZWQoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiIsImltcG9ydCB7IGNhbGxXaW5uZXIgfSBmcm9tICcuLi9kb20vZG9tJztcblxuZnVuY3Rpb24gdXBkYXRlRG9tKHdpbm5lcikge1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcblxuICBpZiAod2lubmVyID09PSAncGxheWVyJykge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGNhbGxXaW5uZXIoJ3BsYXllcicpO1xuICB9IGVsc2UgaWYgKHdpbm5lciA9PT0gJ2NvbXB1dGVyJykge1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB3cmFwcGVyLmlubmVySFRNTCA9ICcnO1xuICAgIGNhbGxXaW5uZXIoJ2NvbXB1dGVyJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hvd1dpbm5lcihib3RCb2FyZCwgcGxheWVyQm9hcmQpIHtcbiAgY29uc3QgcGxheWVyV2luID0gYm90Qm9hcmQub2NjdXBpZWRDb29yZGluYXRlcy5ldmVyeShcbiAgICAoaXRlbSkgPT4gYm90Qm9hcmQuYm9tYmVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoaXRlbSksXG4gICk7XG4gIGNvbnN0IGJvdFdpbiA9IHBsYXllckJvYXJkLm9jY3VwaWVkQ29vcmRpbmF0ZXMuZXZlcnkoXG4gICAgKGl0ZW0pID0+IHBsYXllckJvYXJkLmJvbWJlZENvb3JkaW5hdGVzLmluY2x1ZGVzKGl0ZW0pLFxuICApO1xuXG4gIGlmIChwbGF5ZXJXaW4pIHtcbiAgICB1cGRhdGVEb20oJ3BsYXllcicpO1xuICAgIHJldHVybiAncGxheWVyIHdvbic7XG4gIH0gaWYgKGJvdFdpbikge1xuICAgIHVwZGF0ZURvbSgnY29tcHV0ZXInKTtcbiAgICByZXR1cm4gJ2NvbXB1dGVyIHdvbic7XG4gIH1cbiAgcmV0dXJuICdObyB3aW5uZXIgeWV0Jztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hpcFZhbGlkaXR5KGF4aXMsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgY29uc3QgcmVhbFNpemUgPSBsZW5ndGggLSAxO1xuICBjb25zdCBheGlzUGFydHMgPSBwb3NpdGlvbi5zcGxpdCgnLScpO1xuICBjb25zdCByb3cgPSBOdW1iZXIoYXhpc1BhcnRzWzFdKTtcbiAgY29uc3QgY29sID0gTnVtYmVyKGF4aXNQYXJ0c1syXSk7XG4gIGlmIChheGlzID09PSAnQVhJUzogWCcpIHtcbiAgICBpZiAoKGNvbCArIHJlYWxTaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9IGlmIChheGlzID09PSAnQVhJUzogWScpIHtcbiAgICBpZiAoKHJvdyArIHJlYWxTaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiAnbm9uZSc7XG59XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gJy4uL2dhbWUtb2JqZWN0cy9wbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuLi9nYW1lLW9iamVjdHMvZ2FtZWJvYXJkJztcbmltcG9ydCBzaGlwTGlzdGVuZXIgZnJvbSAnLi9zaGlwLWxpc3RlbmVyJztcbmltcG9ydCBjcmVhdGVSYW5kb21GaWVsZCBmcm9tICcuLi9nYW1lLWxvb3AvcmFuZG9tRmllbGQnO1xuaW1wb3J0IGdhbWVMb29wIGZyb20gJy4uL2dhbWUtbG9vcC9nYW1lLWxvb3AnO1xuXG4vLyBNQUlOIFZBUklBQkxFU1xuXG5jb25zdCBtaWRkbGVIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZS1oZWFkaW5nJyk7XG5jb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZS1pbnB1dCcpO1xuY29uc3QgbWFpbkFyZWEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG5jb25zdCBsb2dvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgaW1nJyk7XG5jb25zdCB4eUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cmFwcGVyJyk7XG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbmNvbnN0IHJ1bGVzQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJ1bGVzLWxpbmsnKTtcbmNvbnN0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGxlZnRTaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCByaWdodFNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHBsYXllckhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuY29uc3QgYm90SGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG5jb25zdCBwbGF5ZXJGaWVsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgYm90RmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuY29uc3QgcGlja2VySW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbnBpY2tlckltYWdlLnNyYyA9ICdpbWFnZXMvYmF0dGxlc2hpcC1sb2dvLnBuZyc7XG5waWNrZXJJbWFnZS5jbGFzc0xpc3QuYWRkKCdwaWNrZXItaW1hZ2UnKTtcbmxldCBwbGF5ZXJHYW1lQm9hcmQ7XG5cbmZ1bmN0aW9uIGNoZWNrQnV0dG9uKCkge1xuICBjb25zdCBheGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJyk7XG4gIGF4aXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKGF4aXMudGV4dENvbnRlbnQgPT09ICdBWElTOiBYJykge1xuICAgICAgYXhpcy50ZXh0Q29udGVudCA9ICdBWElTOiBZJztcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpcy50ZXh0Q29udGVudCA9ICdBWElTOiBYJztcbiAgICB9XG4gIH0pO1xufVxuXG4vLyBGVU5DVElPTiBXSElDSCBDUkVBVEVTIFRIRSBCT0FSRCBXSEVSRSBUSEUgUExBWUVSIFBMQUNFUyBISVMgU0hJUFNcblxuZnVuY3Rpb24gYm9hcmRQaWNrZXIoKSB7XG4gIGdyaWRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jb250YWluZXItcGlja2VyJyk7XG5cbiAgbG9nb0ltYWdlLnJlbW92ZSgpO1xuICBtYWluQXJlYS5zdHlsZS5nYXAgPSAnMjBweCc7XG4gIHJ1bGVzQnV0dG9uLnJlbW92ZSgpO1xuICBoZWFkZXIuYXBwZW5kQ2hpbGQocGlja2VySW1hZ2UpO1xuICBtaWRkbGVIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7cGxheWVyLm5hbWV9LCBQTEFDRSBZT1VSIFNISVBTYDtcbiAgbWlkZGxlSGVhZGluZy5zdHlsZS5tYXJnaW5Ub3AgPSAnMTBweCc7XG4gIHh5QnV0dG9uLnRleHRDb250ZW50ID0gJ0FYSVM6IFgnO1xuICBpbnB1dEVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoeHlCdXR0b24sIGlucHV0RWxlbWVudCk7XG4gIHh5QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2F4aXMtYnV0dG9uJyk7XG4gIHdyYXBwZXIuc3R5bGUuZ2FwID0gJzEwcHgnO1xuICBtYWluQXJlYS5yZW1vdmVDaGlsZChzdGFydEJ1dHRvbik7XG4gIG1haW5BcmVhLmFwcGVuZENoaWxkKGdyaWRDb250YWluZXIpO1xuXG4gIGNoZWNrQnV0dG9uKCk7XG5cbiAgcGxheWVyR2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICBwbGF5ZXJHYW1lQm9hcmQuc2hvd0JvYXJkKCdncmlkLWNvbnRhaW5lci1waWNrZXInKTtcbiAgc2hpcExpc3RlbmVyKCdncmlkLWNvbnRhaW5lci1waWNrZXInLCBwbGF5ZXJHYW1lQm9hcmQpO1xufVxuXG4vLyBGVU5DVElPTiBXSElDSCBDUkVBVEVTIFRIRSBNQUlOIEdBTUUgRklFTEQgKFBMQVlFUiBBTkQgQ09NUFVURVIpXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYWluR2FtZUZpZWxkKHBsYXllckJvYXJkKSB7XG4gIG1pZGRsZUhlYWRpbmcucmVtb3ZlKCk7XG4gIHh5QnV0dG9uLnJlbW92ZSgpO1xuICBncmlkQ29udGFpbmVyLnJlbW92ZSgpO1xuICBtYWluQXJlYS5zdHlsZS5nYXAgPSAnNDBweCc7XG4gIGhlYWRlci5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNDBweCc7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC10ZXh0JykucmVtb3ZlKCk7XG4gIG1haW5BcmVhLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gIG1haW5BcmVhLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ3NwYWNlLWFyb3VuZCc7XG4gIG1haW5BcmVhLnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgcGxheWVyRmllbGQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWZpZWxkJyk7XG4gIGJvdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2JvdC1maWVsZCcpO1xuICBsZWZ0U2lkZS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItaGFsZicpO1xuICByaWdodFNpZGUuY2xhc3NMaXN0LmFkZCgnYm90LWhhbGYnKTtcbiAgcGxheWVySGVhZGluZy5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItaGVhZGluZycpO1xuICBib3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2JvdC1oZWFkaW5nJyk7XG4gIHBsYXllckhlYWRpbmcudGV4dENvbnRlbnQgPSAnRlJJRUROTFkgV0FURVJTJztcbiAgYm90SGVhZGluZy50ZXh0Q29udGVudCA9ICdFTkVNWSBXQVRFUlMnO1xuICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChwbGF5ZXJIZWFkaW5nKTtcbiAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKGJvdEhlYWRpbmcpO1xuICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChwbGF5ZXJGaWVsZCk7XG4gIHJpZ2h0U2lkZS5hcHBlbmRDaGlsZChib3RGaWVsZCk7XG4gIG1haW5BcmVhLmFwcGVuZENoaWxkKGxlZnRTaWRlKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQocmlnaHRTaWRlKTtcbiAgcGxheWVyQm9hcmQuc2hvd0JvYXJkKCdwbGF5ZXItZmllbGQnKTtcbiAgY29uc3QgYm90R2FtZUJvYXJkID0gY3JlYXRlUmFuZG9tRmllbGQoKTtcbiAgYm90R2FtZUJvYXJkLnNob3dCb2FyZCgnYm90LWZpZWxkJyk7XG4gIHBsYXllckJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZUltYWdlKHNoaXAsICdwbGF5ZXItZmllbGQnKTtcbiAgfSk7XG4gIGdhbWVMb29wKHBsYXllckJvYXJkLCBib3RHYW1lQm9hcmQpO1xufVxuXG4vLyBGVU5DVElPTiBXSElDSCBDUkVBVEVTIFRIRSBXRUxDT01FIFNDUkVFTlxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2VsY29tZVNjcmVlbigpIHtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcbiAgbmFtZUlucHV0LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZ2IoMjA0LCAyMDgsIDIwNiknO1xuICBjb25zdCBhbGVydFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtdGV4dCcpO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICBhbGVydFRleHQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IG5hbWVJbnB1dC52YWx1ZTtcbiAgICAgIGNvbnN0IGNvcnJlY3RGb3JtID0gaW5wdXRWYWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcGxheWVyLm5hbWUgPSBgJHtjb3JyZWN0Rm9ybX1gO1xuICAgICAgYWxlcnRUZXh0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBib2FyZFBpY2tlcigpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsV2lubmVyKHdpbm5lcikge1xuICBjb25zdCB3aW5uaW5nU2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5pbmctc2NyZWVuJyk7XG4gIGNvbnN0IHdpbm5pbmdUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbm5lci1xdWVzdGlvbicpO1xuICBjb25zdCB3aW5uaW5nSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2lubmVyLWltYWdlJyk7XG5cbiAgd2lubmluZ1NjcmVlbi5zdHlsZS50b3AgPSAnMCc7XG4gIHdpbm5pbmdTY3JlZW4uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgd2lubmluZ1NjcmVlbi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2FsbCc7XG5cbiAgaWYgKHdpbm5lciA9PT0gJ3BsYXllcicpIHtcbiAgICB3aW5uaW5nVGV4dC50ZXh0Q29udGVudCA9ICdZb3Ugd29uISc7XG4gICAgd2lubmluZ0ltYWdlLnNyYyA9ICdpbWFnZXMvcGVyc29uLXdpbm5lci5wbmcnO1xuICB9IGVsc2Uge1xuICAgIHdpbm5pbmdUZXh0LnRleHRDb250ZW50ID0gJ0NvbXB1dGVyIHdvbiEnO1xuICAgIHdpbm5pbmdJbWFnZS5zcmMgPSAnaW1hZ2VzL2NvbXB1dGVyLXdpbm5lci5wbmcnO1xuICAgIHdpbm5pbmdJbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKC01MHB4LCAwKSc7XG4gIH1cbn1cblxuLy8gRlVOQ1RJT04gRk9SIENSRUFUSU5HIFBST1BFUiBIT1ZFUiBFRkZFQ1RTXG5cbmV4cG9ydCBmdW5jdGlvbiBob3ZlckNvbG9ycyhvcmllbnRhdGlvbiwgbGVuZ3RoKSB7XG4gIGxldCBzaGlwT3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgbGV0IGFjdGl2ZU51bWJlciA9IGxlbmd0aDtcbiAgY29uc3QgZ3JpZENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuICBjb25zdCBvcmllbnRhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpO1xuXG4gIGdyaWRDZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGlmIChvcmllbnRhdGlvbkJ1dHRvbi50ZXh0Q29udGVudCA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICAgIHNoaXBPcmllbnRhdGlvbiA9ICdBWElTOiBYJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNoaXBPcmllbnRhdGlvbiA9ICdBWElTOiBZJztcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXllckdhbWVCb2FyZC5zaG93Q3VycmVudFNpemUoKVswXSkge1xuICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IHBsYXllckdhbWVCb2FyZC5zaG93Q3VycmVudFNpemUoKVswXS5sZW5ndGg7XG4gICAgICAgIGxldCBwcmV2aW91c0xlbmd0aDtcblxuICAgICAgICBpZiAocGxheWVyR2FtZUJvYXJkLnNob3dDdXJyZW50U2l6ZSgpWzFdKSB7XG4gICAgICAgICAgcHJldmlvdXNMZW5ndGggPSBwbGF5ZXJHYW1lQm9hcmQuc2hvd0N1cnJlbnRTaXplKClbMV0ubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDMgJiYgcHJldmlvdXNMZW5ndGggIT09IDMpIHtcbiAgICAgICAgICBhY3RpdmVOdW1iZXIgPSAzO1xuICAgICAgICAgIGN1cnJlbnRMZW5ndGggLT0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50TGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgYWN0aXZlTnVtYmVyID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhY3RpdmVOdW1iZXIgPSBjdXJyZW50TGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjZWxsQ2xhc3NMaXN0ID0gY2VsbC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBbLCByb3csIGNvbF0gPSBjZWxsQ2xhc3NMaXN0WzFdLnNwbGl0KCctJykubWFwKE51bWJlcik7XG5cbiAgICAgIGNvbnN0IG1heENlbGxzSW5Sb3cgPSAxMCAtIHJvdyArIDE7XG4gICAgICBjb25zdCBtYXhDZWxsc0luQ29sID0gMTAgLSBjb2wgKyAxO1xuXG4gICAgICBpZiAoYWN0aXZlTnVtYmVyID4gbWF4Q2VsbHNJblJvdyAmJiBzaGlwT3JpZW50YXRpb24gPT09ICdBWElTOiBZJykge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hvdmVyZWQtcmVkJyk7XG4gICAgICB9IGVsc2UgaWYgKGFjdGl2ZU51bWJlciA+IG1heENlbGxzSW5Db2wgJiYgc2hpcE9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkLXJlZCcpO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXJHYW1lQm9hcmQuY2hlY2tPY2N1cGllZChyb3csIGNvbCwgc2hpcE9yaWVudGF0aW9uLCBhY3RpdmVOdW1iZXIpKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYWN0aXZlTnVtYmVyOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBuZXh0Um93Q2VsbCA9IGdyaWRDZWxsc1tpbmRleCArIGldO1xuICAgICAgICAgIGNvbnN0IG5leHRDb2xDZWxsID0gZ3JpZENlbGxzW2luZGV4ICsgaSAqIDEwXTtcbiAgICAgICAgICBpZiAobmV4dFJvd0NlbGwgJiYgc2hpcE9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgICAgICAgIG5leHRSb3dDZWxsLmNsYXNzTGlzdC5hZGQoJ2hvdmVyZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG5leHRDb2xDZWxsICYmIHNoaXBPcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFknKSB7XG4gICAgICAgICAgICBuZXh0Q29sQ2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBpc1RvdWNoRGV2aWNlID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHwgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlSG92ZXIoKSB7XG4gICAgICBncmlkQ2VsbHMuZm9yRWFjaCgocG9sZSkgPT4ge1xuICAgICAgICBwb2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyZWQnLCAnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChpc1RvdWNoRGV2aWNlKSB7XG4gICAgICBzZXRUaW1lb3V0KHJlbW92ZUhvdmVyLCA1MDApO1xuICAgIH1cblxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIHJlbW92ZUhvdmVyKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5jb25zdCByZXNldEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXctZ2FtZScpO1xucmVzZXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGxvY2F0aW9uLnJlbG9hZCgpO1xufSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2VsZXNzLXJldHVybiAqL1xuaW1wb3J0IFNoaXAgZnJvbSAnLi4vZ2FtZS1vYmplY3RzL3NoaXAnO1xuaW1wb3J0IGNoZWNrU2hpcFZhbGlkaXR5IGZyb20gJy4uL2NoZWNrZXJzL3Nwb3RWYWxpZGF0b3InO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuLi9nYW1lLW9iamVjdHMvZ2FtZWJvYXJkJztcbmltcG9ydCBjaGVja1N0YXR1cyBmcm9tICcuLi9jaGVja2Vycy9hdmFpbGFiaWxpdHlWYWxpZGF0b3InO1xuaW1wb3J0IHsgY3JlYXRlTWFpbkdhbWVGaWVsZCwgaG92ZXJDb2xvcnMgfSBmcm9tICcuL2RvbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBMaXN0ZW5lcihjbGFzc05hbWUsIHBsYXllckdhbWVCb2FyZCkge1xuICBjb25zdCBzaGlwU2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG4gIGNvbnN0IGdhbWVGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcbiAgaG92ZXJDb2xvcnMoJ0FYSVM6IFgnLCA1KTtcblxuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgY29uc3QgcG9zaXRpb24gPSBjbGFzc2VzWzFdO1xuXG4gICAgaWYgKGNsYXNzZXMubGVuZ3RoIDwgMykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwU2l6ZXMuc2hpZnQoKTtcblxuICAgIGNvbnN0IHNoaXBPcmllbnRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpLnRleHRDb250ZW50O1xuXG4gICAgaG92ZXJDb2xvcnMoc2hpcE9yaWVudGF0aW9uLCBzaGlwTGVuZ3RoKTtcblxuICAgIGlmIChjaGVja1NoaXBWYWxpZGl0eShzaGlwT3JpZW50YXRpb24sIHNoaXBMZW5ndGgsIHBvc2l0aW9uKSAmJiBjaGVja1N0YXR1cyhwb3NpdGlvbiwgc2hpcExlbmd0aCwgc2hpcE9yaWVudGF0aW9uLCBwbGF5ZXJHYW1lQm9hcmQpKSB7XG4gICAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCwgc2hpcE9yaWVudGF0aW9uLCBwb3NpdGlvbik7XG4gICAgICBwbGF5ZXJHYW1lQm9hcmQuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5wbGFjZUltYWdlKHNoaXAsICdncmlkLWNvbnRhaW5lci1waWNrZXInKTtcbiAgICAgIGlmIChzaGlwU2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGdhbWVGaWVsZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmRBbmltYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFja2dyb3VuZC1hbmltYXRpb24tc3BhY2UnKTtcbiAgICAgICAgYmFja2dyb3VuZEFuaW1hdGlvbi5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLWFuaW1hdGlvbicpO1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNyZWF0ZU1haW5HYW1lRmllbGQocGxheWVyR2FtZUJvYXJkKTtcbiAgICAgICAgfSwgODAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzaGlwU2l6ZXMudW5zaGlmdChzaGlwTGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyXG4gIGdhbWVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG59XG4iLCJpbXBvcnQgY29tcHV0ZXIgZnJvbSAnLi4vZ2FtZS1vYmplY3RzL2NvbXB1dGVyJztcbmltcG9ydCBwbGF5ZXIgZnJvbSAnLi4vZ2FtZS1vYmplY3RzL3BsYXllcic7XG5pbXBvcnQgeyBjYWxsV2lubmVyIH0gZnJvbSAnLi4vZG9tL2RvbSc7XG5cbi8vIE1BTkFHRVMgVEhFIEZMT1cgT0YgVEhFIEdBTUVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUxvb3AocGxheWVyQm9hcmQsIGJvdEJvYXJkKSB7XG4gIGNvbnN0IGRvbUJvdEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvdC1maWVsZCcpO1xuXG4gIGRvbUJvdEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAocGxheWVyLnBsYXlTdGF0dXMpIHtcbiAgICAgIGNvbnN0IHJvdW5kID0gcGxheWVyLnBsYXllckF0dGFjayhlLCBwbGF5ZXJCb2FyZCwgYm90Qm9hcmQpO1xuXG4gICAgICBpZiAocm91bmQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY29tcHV0ZXIucGxheUNvbXB1dGVyKFxuICAgICAgICAgICAgcGxheWVyQm9hcmQub2NjdXBpZWRDb29yZGluYXRlcyxcbiAgICAgICAgICAgIHBsYXllckJvYXJkLmJvbWJlZENvb3JkaW5hdGVzLFxuICAgICAgICAgICAgcGxheWVyQm9hcmQsXG4gICAgICAgICAgICBib3RCb2FyZCxcbiAgICAgICAgICApO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNoZWNrU3RhdHVzIGZyb20gJy4uL2NoZWNrZXJzL2F2YWlsYWJpbGl0eVZhbGlkYXRvcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4uL2dhbWUtb2JqZWN0cy9nYW1lYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi4vZ2FtZS1vYmplY3RzL3NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVSYW5kb21GaWVsZCgpIHtcbiAgY29uc3QgYm90R2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICBjb25zdCBzaGlwU2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG4gIGNvbnN0IG9yaWVudGF0aW9uID0gWydBWElTOiBYJywgJ0FYSVM6IFknXTtcblxuICB3aGlsZSAoc2hpcFNpemVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgeE51bTtcbiAgICBsZXQgeU51bTtcbiAgICBjb25zdCBjdXJyZW50U2l6ZSA9IHNoaXBTaXplcy5zaGlmdCgpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uUGljayA9IG9yaWVudGF0aW9uW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSldO1xuICAgIGNvbnN0IHJhbmRvbVBpY2sgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBjdXJyZW50U2l6ZSkpICsgMTtcbiAgICBpZiAob3JpZW50YXRpb25QaWNrID09PSAnQVhJUzogWCcpIHtcbiAgICAgIHhOdW0gPSByYW5kb21QaWNrO1xuICAgICAgeU51bSA9IHN0YXJ0UG9pbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhOdW0gPSBzdGFydFBvaW50O1xuICAgICAgeU51bSA9IHJhbmRvbVBpY2s7XG4gICAgfVxuICAgIGNvbnN0IGNvbm5lY3RlZENsYXNzID0gYGNlbGwtJHt4TnVtfS0ke3lOdW19YDtcbiAgICAvLyBjb25zb2xlLmxvZyhjb25uZWN0ZWRDbGFzcyk7XG5cbiAgICBpZiAoIWNoZWNrU3RhdHVzKGNvbm5lY3RlZENsYXNzLCBjdXJyZW50U2l6ZSwgb3JpZW50YXRpb25QaWNrLCBib3RHYW1lQm9hcmQpKSB7XG4gICAgICBzaGlwU2l6ZXMudW5zaGlmdChjdXJyZW50U2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSBuZXcgU2hpcChjdXJyZW50U2l6ZSwgb3JpZW50YXRpb25QaWNrLCBjb25uZWN0ZWRDbGFzcyk7XG4gICAgICBib3RHYW1lQm9hcmQuc2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdEdhbWVCb2FyZDtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWxhYmVscyAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tc2hhZG93ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllcic7XG5pbXBvcnQgc2hvd1dpbm5lciBmcm9tICcuLi9jaGVja2Vycy9kZXRlcm1pbmVXaW5uZXInO1xuXG5jb25zdCBjb21wdXRlciA9IHtcbiAgZ2VuZXJhdGVSYW5kb21Nb3ZlKGJvbWJlZEFycikge1xuICAgIGxldCBudW0xO1xuICAgIGxldCBudW0yO1xuICAgIGxldCBjb29yZGluYXRlO1xuXG4gICAgZG8ge1xuICAgICAgbnVtMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICBudW0yID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICAgIGNvb3JkaW5hdGUgPSBgY2VsbC0ke251bTF9LSR7bnVtMn1gO1xuICAgIH0gd2hpbGUgKGJvbWJlZEFyci5pbmNsdWRlcyhjb29yZGluYXRlKSk7XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgfSxcblxuICBmaW5kQWRqYWNlbnRIaXRDZWxscyhyb3csIGNvbCwgZGlyZWN0aW9uKSB7XG4gICAgY29uc3QgZG9tUGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWZpZWxkJyk7XG4gICAgY29uc3QgZ3JpZCA9IEFycmF5LmZyb20oZG9tUGxheWVyQm9hcmQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpKTtcbiAgICBjb25zdCBhZGphY2VudENlbGxzID0gW107XG5cbiAgICBjb25zdCBkaXJlY3Rpb25zID0ge1xuICAgICAgbGVmdDogeyByb3c6IDAsIGNvbDogLTEgfSxcbiAgICAgIHJpZ2h0OiB7IHJvdzogMCwgY29sOiAxIH0sXG4gICAgICB1cDogeyByb3c6IC0xLCBjb2w6IDAgfSxcbiAgICAgIGRvd246IHsgcm93OiAxLCBjb2w6IDAgfSxcbiAgICB9O1xuXG4gICAgbGV0IGN1cnJlbnRSb3cgPSByb3c7XG4gICAgbGV0IGN1cnJlbnRDb2wgPSBjb2w7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgbmV3Um93ID0gY3VycmVudFJvdyArIGRpcmVjdGlvbnNbZGlyZWN0aW9uXS5yb3c7XG4gICAgICBjb25zdCBuZXdDb2wgPSBjdXJyZW50Q29sICsgZGlyZWN0aW9uc1tkaXJlY3Rpb25dLmNvbDtcblxuICAgICAgY29uc3QgY2VsbENsYXNzTmFtZSA9IGBjZWxsLSR7bmV3Um93fS0ke25ld0NvbH1gO1xuICAgICAgY29uc3QgY2VsbCA9IGdyaWQuZmluZCgoY2VsbCkgPT4gY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoY2VsbENsYXNzTmFtZSkpO1xuXG4gICAgICBpZiAoIWNlbGwpIGJyZWFrO1xuXG4gICAgICBjb25zdCBpbm5lckRpdiA9IGNlbGwucXVlcnlTZWxlY3RvcignLmhpdCcpO1xuICAgICAgaWYgKGlubmVyRGl2KSB7XG4gICAgICAgIGFkamFjZW50Q2VsbHMucHVzaChjZWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50Um93ID0gbmV3Um93O1xuICAgICAgY3VycmVudENvbCA9IG5ld0NvbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYWRqYWNlbnRDZWxscztcbiAgfSxcblxuICBwbGF5Q29tcHV0ZXIob2NjdXBpZWRBcnIsIGJvbWJlZEFyciwgcGxheWVyQm9hcmQsIGJvdEJvYXJkKSB7XG4gICAgY29uc3QgZG9tUGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWZpZWxkJyk7XG4gICAgZnVuY3Rpb24gY2hlY2tIaXQoc3BvdCkge1xuICAgICAgY29uc3QgZmluYWxTcG90ID0gZG9tUGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgLiR7c3BvdH1gKTtcbiAgICAgIGlmIChvY2N1cGllZEFyci5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICBjb25zdCBzcG90SW5kZXggPSBvY2N1cGllZEFyci5pbmRleE9mKHNwb3QpO1xuICAgICAgICBsZXQgc2hpcEhpdDtcblxuICAgICAgICBpZiAoc3BvdEluZGV4ID49IDAgJiYgc3BvdEluZGV4IDwgNSkge1xuICAgICAgICAgIHNoaXBIaXQgPSBwbGF5ZXJCb2FyZC5zaGlwc1swXTtcbiAgICAgICAgfSBlbHNlIGlmIChzcG90SW5kZXggPCA5KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IHBsYXllckJvYXJkLnNoaXBzWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDEyKSB7XG4gICAgICAgICAgc2hpcEhpdCA9IHBsYXllckJvYXJkLnNoaXBzWzJdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDE1KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IHBsYXllckJvYXJkLnNoaXBzWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoaXBIaXQgPSBwbGF5ZXJCb2FyZC5zaGlwc1s0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBIaXQuaGl0KCk7XG5cbiAgICAgICAgaWYgKHNoaXBIaXQuaXNTdW5rKCkpIHtcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZUltYWdlKHNoaXBIaXQsICdwbGF5ZXItZmllbGQnLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5tYXJrU3Vua1NoaXBzKHNoaXBIaXQsICdwbGF5ZXItZmllbGQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGZpbmFsU3BvdC5hcHBlbmRDaGlsZChoaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgbm9IaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm9IaXQuY2xhc3NMaXN0LmFkZCgnbm8taGl0Jyk7XG4gICAgICAgIGZpbmFsU3BvdC5hcHBlbmRDaGlsZChub0hpdCk7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoc2hvd1dpbm5lciwgMTAwMCwgYm90Qm9hcmQsIHBsYXllckJvYXJkKTtcblxuICAgICAgYm9tYmVkQXJyLnB1c2goc3BvdCk7XG4gICAgICBwbGF5ZXIucGxheVN0YXR1cyA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGdyaWQgPSBBcnJheS5mcm9tKGRvbVBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkLWNlbGwnKSk7XG4gICAgY29uc3QgcmFuZG9tQ29vcmRpbmF0ZSA9IHRoaXMuZ2VuZXJhdGVSYW5kb21Nb3ZlKGJvbWJlZEFycik7XG5cbiAgICBvdXRlckxvb3A6IGZvciAobGV0IHJvdyA9IDE7IHJvdyA8PSAxMDsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDE7IGNvbCA8PSAxMDsgY29sKyspIHtcbiAgICAgICAgY29uc3QgY2VsbENsYXNzTmFtZSA9IGBjZWxsLSR7cm93fS0ke2NvbH1gO1xuICAgICAgICBjb25zdCBjZWxsID0gZ3JpZC5maW5kKChjZWxsKSA9PiBjZWxsLmNsYXNzTGlzdC5jb250YWlucyhjZWxsQ2xhc3NOYW1lKSk7XG4gICAgICAgIGNvbnN0IGlubmVyRGl2ID0gY2VsbC5xdWVyeVNlbGVjdG9yKCcuaGl0Jyk7XG5cbiAgICAgICAgaWYgKGlubmVyRGl2ICYmICFjZWxsLmNsYXNzTGlzdC5jb250YWlucygnc2FuaycpKSB7XG4gICAgICAgICAgY29uc3QgbGVmdENlbGxzID0gdGhpcy5maW5kQWRqYWNlbnRIaXRDZWxscyhyb3csIGNvbCwgJ2xlZnQnKTtcbiAgICAgICAgICBjb25zdCByaWdodENlbGxzID0gdGhpcy5maW5kQWRqYWNlbnRIaXRDZWxscyhyb3csIGNvbCwgJ3JpZ2h0Jyk7XG4gICAgICAgICAgY29uc3QgdXBDZWxscyA9IHRoaXMuZmluZEFkamFjZW50SGl0Q2VsbHMocm93LCBjb2wsICd1cCcpO1xuICAgICAgICAgIGNvbnN0IGRvd25DZWxscyA9IHRoaXMuZmluZEFkamFjZW50SGl0Q2VsbHMocm93LCBjb2wsICdkb3duJyk7XG5cbiAgICAgICAgICBpZiAobGVmdENlbGxzLmxlbmd0aCA+PSAxIHx8IHJpZ2h0Q2VsbHMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1JvdyA9IHJvdztcbiAgICAgICAgICAgIGNvbnN0IG5ld0NvbFZlck9uZSA9IGNvbCArIDE7XG4gICAgICAgICAgICBjb25zdCBuZXdDb2xWZXJUd28gPSBjb2wgLSAxO1xuICAgICAgICAgICAgbGV0IG5ld0NvbCA9IG5ld0NvbFZlck9uZTtcblxuICAgICAgICAgICAgaWYgKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJPbmV9YCkgJiYgYm9tYmVkQXJyLmluY2x1ZGVzKGBjZWxsLSR7bmV3Um93fS0ke25ld0NvbFZlclR3b31gKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJPbmV9YCkpICYmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJUd299YCkpKSB7XG4gICAgICAgICAgICAgIG5ld0NvbCA9IG5ld0NvbFZlclR3bztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJUd299YCkpICYmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke25ld1Jvd30tJHtuZXdDb2xWZXJPbmV9YCkpKSB7XG4gICAgICAgICAgICAgIG5ld0NvbCA9IG5ld0NvbFZlck9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaW5hbENsYXNzID0gYGNlbGwtJHtuZXdSb3d9LSR7bmV3Q29sfWA7XG5cbiAgICAgICAgICAgIGNoZWNrSGl0KGZpbmFsQ2xhc3MpO1xuICAgICAgICAgICAgYnJlYWsgb3V0ZXJMb29wO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXBDZWxscy5sZW5ndGggPj0gMSB8fCBkb3duQ2VsbHMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Jvd1Zlck9uZSA9IHJvdyArIDE7XG4gICAgICAgICAgICBjb25zdCBuZXdSb3dWZXJUd28gPSByb3cgLSAxO1xuICAgICAgICAgICAgY29uc3QgbmV3Q29sID0gY29sO1xuICAgICAgICAgICAgbGV0IG5ld1JvdyA9IG5ld1Jvd1Zlck9uZTtcblxuICAgICAgICAgICAgaWYgKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd1Zlck9uZX0tJHtuZXdDb2x9YCkgJiYgYm9tYmVkQXJyLmluY2x1ZGVzKGBjZWxsLSR7bmV3Um93VmVyVHdvfS0ke25ld0NvbH1gKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd1Zlck9uZX0tJHtuZXdDb2x9YCkpICYmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke25ld1Jvd1ZlclR3b30tJHtuZXdDb2x9YCkpKSB7XG4gICAgICAgICAgICAgIG5ld1JvdyA9IG5ld1Jvd1ZlclR3bztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGJvbWJlZEFyci5pbmNsdWRlcyhgY2VsbC0ke25ld1Jvd1ZlclR3b30tJHtuZXdDb2x9YCkpICYmIChkb21QbGF5ZXJCb2FyZC5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke25ld1Jvd1Zlck9uZX0tJHtuZXdDb2x9YCkpKSB7XG4gICAgICAgICAgICAgIG5ld1JvdyA9IG5ld1Jvd1Zlck9uZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZpbmFsQ2xhc3MgPSBgY2VsbC0ke25ld1Jvd30tJHtuZXdDb2x9YDtcbiAgICAgICAgICAgIGNoZWNrSGl0KGZpbmFsQ2xhc3MpO1xuICAgICAgICAgICAgYnJlYWsgb3V0ZXJMb29wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBvbmVSaWdodCA9IGBjZWxsLSR7cm93fS0ke2NvbCArIDF9YDtcbiAgICAgICAgICAgIGNvbnN0IG9uZUxlZnQgPSBgY2VsbC0ke3Jvd30tJHtjb2wgLSAxfWA7XG4gICAgICAgICAgICBjb25zdCBvbmVUb3AgPSBgY2VsbC0ke3JvdyAtIDF9LSR7Y29sfWA7XG4gICAgICAgICAgICBjb25zdCBvbmVCb3R0b20gPSBgY2VsbC0ke3JvdyArIDF9LSR7Y29sfWA7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbnMgPSBbb25lQm90dG9tLCBvbmVMZWZ0LCBvbmVSaWdodCwgb25lVG9wXTtcbiAgICAgICAgICAgIGNvbnN0IG1heEF0dGVtcHRzID0gNDtcblxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkRGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBhdHRlbXB0cyA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChhdHRlbXB0cyA8PSBtYXhBdHRlbXB0cykge1xuICAgICAgICAgICAgICBzZWxlY3RlZERpcmVjdGlvbiA9IGRpcmVjdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZGlyZWN0aW9ucy5sZW5ndGgpXTtcblxuICAgICAgICAgICAgICBpZiAoZG9tUGxheWVyQm9hcmQucXVlcnlTZWxlY3RvcihgLiR7c2VsZWN0ZWREaXJlY3Rpb259YCkgJiYgIWJvbWJlZEFyci5pbmNsdWRlcyhzZWxlY3RlZERpcmVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGF0dGVtcHRzKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA8PSBtYXhBdHRlbXB0cykge1xuICAgICAgICAgICAgICBjaGVja0hpdChzZWxlY3RlZERpcmVjdGlvbik7XG4gICAgICAgICAgICAgIGJyZWFrIG91dGVyTG9vcDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNoZWNrSGl0KHJhbmRvbUNvb3JkaW5hdGUpO1xuICAgICAgICAgICAgICBicmVhayBvdXRlckxvb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJvdyA9PT0gMTAgJiYgY29sID09PSAxMCkge1xuICAgICAgICAgIGNoZWNrSGl0KHJhbmRvbUNvb3JkaW5hdGUpO1xuICAgICAgICAgIGJyZWFrIG91dGVyTG9vcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVJhbmRvbU1vdmUgPSBjb21wdXRlci5nZW5lcmF0ZVJhbmRvbU1vdmU7XG5leHBvcnQgZGVmYXVsdCBjb21wdXRlcjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXMgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2NjdXBpZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuYm9tYmVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICB1cGRhdGVCb21iZWQoYm9tYmVkSXRlbSkge1xuICAgIHRoaXMuYm9tYmVkQ29vcmRpbmF0ZXMucHVzaChib21iZWRJdGVtKTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKG9jY3VwaWVkSXRlbSkge1xuICAgIHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5wdXNoKG9jY3VwaWVkSXRlbSk7XG4gIH1cblxuICBtYXJrU3Vua1NoaXBzKHNoaXAsIGZpZWxkKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IFtdO1xuICAgIGNvbnN0IHBsYXlGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2ZpZWxkfWApO1xuICAgIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSBzaGlwLnBvc2l0aW9uO1xuICAgIGNvbnN0IGdpdmVuTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG4gICAgY29uc3QgW3ByZWZpeCwgcm93LCBjb2xdID0gc3RhcnRQb3NpdGlvbi5zcGxpdCgnLScpO1xuICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2l2ZW5MZW5ndGg7IGkrKykge1xuICAgICAgICBjbGFzc2VzLnB1c2goYCR7cHJlZml4fS0ke3Jvd30tJHtOdW1iZXIoY29sKSArIGl9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2l2ZW5MZW5ndGg7IGkrKykge1xuICAgICAgICBjbGFzc2VzLnB1c2goYCR7cHJlZml4fS0ke051bWJlcihyb3cpICsgaX0tJHtjb2x9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3Nlcy5mb3JFYWNoKChjZWxsU3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gcGxheUZpZWxkLnF1ZXJ5U2VsZWN0b3IoYC4ke2NlbGxTdHJpbmd9YCk7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NhbmsnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrT2NjdXBpZWQocm93LCBjb2wsIG9yaWVudGF0aW9uLCBsZW5ndGgpIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcG90ID0gYGNlbGwtJHtyb3d9LSR7Y29sICsgaX1gO1xuICAgICAgICBpZiAodGhpcy5vY2N1cGllZENvb3JkaW5hdGVzLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcG90ID0gYGNlbGwtJHtyb3cgKyBpfS0ke2NvbH1gO1xuICAgICAgICBpZiAodGhpcy5vY2N1cGllZENvb3JkaW5hdGVzLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBDUkVBVEVTIFRIRSBHQU1FIEdSSUQgSU4gRE9NXG5cbiAgc2hvd0JvYXJkKGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgICAgZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgdW5pcXVlQ2xhc3NOYW1lID0gYGNlbGwtJHtpICsgMX0tJHtqICsgMX1gO1xuICAgICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvd0N1cnJlbnRTaXplKCkge1xuICAgIGNvbnN0IGluZm9BcnIgPSBbdGhpcy5zaGlwc1t0aGlzLnNoaXBzLmxlbmd0aCAtIDFdLCB0aGlzLnNoaXBzW3RoaXMuc2hpcHMubGVuZ3RoIC0gMl1dO1xuICAgIHJldHVybiBpbmZvQXJyO1xuICB9XG5cbiAgcGxhY2VJbWFnZShzaGlwLCBnYW1lRmllbGQsIHN0YXR1cywgb2xkSW1hZ2UpIHtcbiAgICBsZXQgZ2FwID0gNDtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMDcwKSBnYXAgPSAyO1xuICAgIGNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQtY2VsbCcpO1xuICAgIGNvbnN0IGNlbGxTaXplID0gZ3JpZENlbGwub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgcG9zaXRpb25QYXJ0cyA9IHNoaXAucG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIocG9zaXRpb25QYXJ0c1sxXSk7XG4gICAgY29uc3QgY29sID0gTnVtYmVyKHBvc2l0aW9uUGFydHNbMl0pO1xuICAgIGxldCBsZWZ0TWFyZ2luO1xuICAgIGxldCB0b3BNYXJnaW47XG4gICAgY29uc3QgZmluYWxTaXplID0gKChjZWxsU2l6ZSArIGdhcCkgKiBzaGlwLmxlbmd0aCk7XG4gICAgY29uc3QgZmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtnYW1lRmllbGR9YCk7XG4gICAgY29uc3Qgc3RhcnRpbmdQb2ludCA9IGZpZWxkLnF1ZXJ5U2VsZWN0b3IoYC4ke3NoaXAucG9zaXRpb259YCk7XG4gICAgY29uc3QgaW1hZ2VUb1JlbW92ZSA9IHN0YXJ0aW5nUG9pbnQucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgY29uc3Qgc2hpcEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoJ3NoaXAtaW1hZ2UteCcpO1xuICAgICAgdG9wTWFyZ2luID0gKGdyaWRDZWxsLm9mZnNldFdpZHRoICsgZ2FwKSAqIChyb3cgLSAxKTtcbiAgICAgIGxlZnRNYXJnaW4gPSAoZ3JpZENlbGwub2Zmc2V0V2lkdGggKyBnYXApICogKGNvbCAtIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGlwSW1hZ2UuY2xhc3NMaXN0LmFkZCgnc2hpcC1pbWFnZS15Jyk7XG4gICAgICB0b3BNYXJnaW4gPSAoZ3JpZENlbGwub2Zmc2V0V2lkdGggKyBnYXApICogKHJvdyAtIDEpO1xuICAgICAgbGVmdE1hcmdpbiA9IChncmlkQ2VsbC5vZmZzZXRXaWR0aCArIGdhcCkgKiAoY29sIC0gMSk7XG4gICAgfVxuICAgIHNoaXBJbWFnZS5zdHlsZS53aWR0aCA9IGAke2ZpbmFsU2l6ZX1weGA7XG4gICAgc2hpcEltYWdlLnN0eWxlLnRvcCA9IGAke3RvcE1hcmdpbn1weGA7XG4gICAgc2hpcEltYWdlLnN0eWxlLmxlZnQgPSBgJHtsZWZ0TWFyZ2lufXB4YDtcbiAgICBpZiAob2xkSW1hZ2UpIHtcbiAgICAgIGltYWdlVG9SZW1vdmUucmVtb3ZlKCk7XG4gICAgfVxuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgIGlmIChzaGlwLmxlbmd0aCA9PT0gMikgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoYGxlbmd0aC0kezJ9YCk7XG4gICAgICBzaGlwSW1hZ2Uuc3JjID0gYGltYWdlcy8ke3NoaXAubGVuZ3RofS1zaGlwLWRlYWQucG5nYDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNoaXAubGVuZ3RoID09PSAyKSBzaGlwSW1hZ2UuY2xhc3NMaXN0LmFkZChgbGVuZ3RoLSR7Mn1gKTtcbiAgICAgIHNoaXBJbWFnZS5zcmMgPSBgaW1hZ2VzLyR7c2hpcC5sZW5ndGh9LXNoaXAucG5nYDtcbiAgICB9XG4gICAgc3RhcnRpbmdQb2ludC5hcHBlbmRDaGlsZChzaGlwSW1hZ2UpO1xuICB9XG59XG4iLCJpbXBvcnQgc2hvd1dpbm5lciBmcm9tICcuLi9jaGVja2Vycy9kZXRlcm1pbmVXaW5uZXInO1xuXG5jb25zdCBwbGF5ZXIgPSB7XG4gIHBsYXllckF0dGFjayhldmVudCwgcGxheWVyQm9hcmQsIGJvdEJvYXJkKSB7XG4gICAgY29uc3QgZG9tQm90Qm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90LWZpZWxkJyk7XG4gICAgY29uc3QgY2xpY2tlZEVsZW1lbnQgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNsaWNrZWRFbGVtZW50LmNsYXNzTGlzdDtcbiAgICBjb25zdCBjbGFzc2VzQXJyYXkgPSBBcnJheS5mcm9tKGNsYXNzZXMpO1xuICAgIGlmIChjbGFzc2VzQXJyYXkuaW5jbHVkZXMoJ2dyaWQtY2VsbCcpICYmICFib3RCb2FyZC5ib21iZWRDb29yZGluYXRlcy5pbmNsdWRlcyhjbGFzc2VzQXJyYXlbMV0pKSB7XG4gICAgICBjb25zdCBjaG9zZW5TcG90ID0gY2xhc3Nlc0FycmF5WzFdO1xuICAgICAgaWYgKGJvdEJvYXJkLm9jY3VwaWVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoY2hvc2VuU3BvdCkpIHtcbiAgICAgICAgY29uc3Qgc3BvdEluZGV4ID0gYm90Qm9hcmQub2NjdXBpZWRDb29yZGluYXRlcy5pbmRleE9mKGNob3NlblNwb3QpO1xuICAgICAgICBsZXQgc2hpcEhpdDtcblxuICAgICAgICBpZiAoc3BvdEluZGV4ID49IDAgJiYgc3BvdEluZGV4IDwgNSkge1xuICAgICAgICAgIHNoaXBIaXQgPSBib3RCb2FyZC5zaGlwc1swXTtcbiAgICAgICAgfSBlbHNlIGlmIChzcG90SW5kZXggPCA5KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IGJvdEJvYXJkLnNoaXBzWzFdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDEyKSB7XG4gICAgICAgICAgc2hpcEhpdCA9IGJvdEJvYXJkLnNoaXBzWzJdO1xuICAgICAgICB9IGVsc2UgaWYgKHNwb3RJbmRleCA8IDE1KSB7XG4gICAgICAgICAgc2hpcEhpdCA9IGJvdEJvYXJkLnNoaXBzWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNoaXBIaXQgPSBib3RCb2FyZC5zaGlwc1s0XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNoaXBIaXQuaGl0KCk7XG5cbiAgICAgICAgaWYgKHNoaXBIaXQuaXNTdW5rKCkpIHtcbiAgICAgICAgICBib3RCb2FyZC5wbGFjZUltYWdlKHNoaXBIaXQsICdib3QtZmllbGQnLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRvbUNob3NlblNwb3QgPSBkb21Cb3RCb2FyZC5xdWVyeVNlbGVjdG9yKGAuJHtjaG9zZW5TcG90fWApO1xuICAgICAgICBjb25zdCBoaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgICBkb21DaG9zZW5TcG90LmFwcGVuZENoaWxkKGhpdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkb21DaG9zZW5TcG90ID0gZG9tQm90Qm9hcmQucXVlcnlTZWxlY3RvcihgLiR7Y2hvc2VuU3BvdH1gKTtcbiAgICAgICAgY29uc3Qgbm9IaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbm9IaXQuY2xhc3NMaXN0LmFkZCgnbm8taGl0Jyk7XG4gICAgICAgIGRvbUNob3NlblNwb3QuYXBwZW5kQ2hpbGQobm9IaXQpO1xuICAgICAgfVxuICAgICAgYm90Qm9hcmQuYm9tYmVkQ29vcmRpbmF0ZXMucHVzaChjaG9zZW5TcG90KTtcblxuICAgICAgc2V0VGltZW91dChzaG93V2lubmVyLCAxMDAwLCBib3RCb2FyZCwgcGxheWVyQm9hcmQpO1xuXG4gICAgICB0aGlzLnBsYXlTdGF0dXMgPSBmYWxzZTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICBwbGF5U3RhdHVzOiB0cnVlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgb3JpZW50YXRpb24sIHBvc2l0aW9uKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRDb3VudGVyID0gMDtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnRlcisrO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmhpdENvdW50ZXIgPT09IHRoaXMubGVuZ3RoO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVdlbGNvbWVTY3JlZW4gfSBmcm9tICcuL21vZHVsZXMvZG9tL2RvbSc7XG5cbmNyZWF0ZVdlbGNvbWVTY3JlZW4oKTtcblxuZnVuY3Rpb24gcmVsb2FkUGFnZSgpIHtcbiAgbG9jYXRpb24ucmVsb2FkKCk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsICgpID0+IHtcbiAgcmVsb2FkUGFnZSgpO1xufSk7XG4iXSwibmFtZXMiOlsiY2hlY2tTdGF0dXMiLCJuZXdQb3NpdGlvbiIsImxlbmd0aCIsIm9yaWVudGF0aW9uIiwicGxheUJvYXJkIiwiYXhpc1BhcnRzIiwic3BsaXQiLCJyb3ciLCJOdW1iZXIiLCJjb2wiLCJjaGVja09jY3VwaWVkIiwiaSIsInVwZGF0ZUNvb3JkaW5hdGVzIiwiY2FsbFdpbm5lciIsInVwZGF0ZURvbSIsIndpbm5lciIsIndyYXBwZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ3aW5kb3ciLCJzY3JvbGxUbyIsImlubmVySFRNTCIsInNob3dXaW5uZXIiLCJib3RCb2FyZCIsInBsYXllckJvYXJkIiwicGxheWVyV2luIiwib2NjdXBpZWRDb29yZGluYXRlcyIsImV2ZXJ5IiwiaXRlbSIsImJvbWJlZENvb3JkaW5hdGVzIiwiaW5jbHVkZXMiLCJib3RXaW4iLCJjaGVja1NoaXBWYWxpZGl0eSIsImF4aXMiLCJwb3NpdGlvbiIsInJlYWxTaXplIiwicGxheWVyIiwiR2FtZWJvYXJkIiwic2hpcExpc3RlbmVyIiwiY3JlYXRlUmFuZG9tRmllbGQiLCJnYW1lTG9vcCIsIm1pZGRsZUhlYWRpbmciLCJpbnB1dEVsZW1lbnQiLCJtYWluQXJlYSIsImxvZ29JbWFnZSIsInh5QnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsInN0YXJ0QnV0dG9uIiwicnVsZXNCdXR0b24iLCJncmlkQ29udGFpbmVyIiwibGVmdFNpZGUiLCJyaWdodFNpZGUiLCJwbGF5ZXJIZWFkaW5nIiwiYm90SGVhZGluZyIsInBsYXllckZpZWxkIiwiYm90RmllbGQiLCJoZWFkZXIiLCJwaWNrZXJJbWFnZSIsInNyYyIsImNsYXNzTGlzdCIsImFkZCIsInBsYXllckdhbWVCb2FyZCIsImNoZWNrQnV0dG9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRleHRDb250ZW50IiwiYm9hcmRQaWNrZXIiLCJyZW1vdmUiLCJzdHlsZSIsImdhcCIsImFwcGVuZENoaWxkIiwibmFtZSIsIm1hcmdpblRvcCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJyZW1vdmVDaGlsZCIsInNob3dCb2FyZCIsImNyZWF0ZU1haW5HYW1lRmllbGQiLCJtYXJnaW5Cb3R0b20iLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwiYm90R2FtZUJvYXJkIiwic2hpcHMiLCJmb3JFYWNoIiwic2hpcCIsInBsYWNlSW1hZ2UiLCJjcmVhdGVXZWxjb21lU2NyZWVuIiwibmFtZUlucHV0IiwiYmFja2dyb3VuZENvbG9yIiwiYWxlcnRUZXh0IiwidmFsdWUiLCJjb2xvciIsImlucHV0VmFsdWUiLCJjb3JyZWN0Rm9ybSIsInJlcGxhY2UiLCJ3aW5uaW5nU2NyZWVuIiwid2lubmluZ1RleHQiLCJ3aW5uaW5nSW1hZ2UiLCJ0b3AiLCJ2aXNpYmlsaXR5IiwicG9pbnRlckV2ZW50cyIsInRyYW5zZm9ybSIsImhvdmVyQ29sb3JzIiwic2hpcE9yaWVudGF0aW9uIiwiYWN0aXZlTnVtYmVyIiwiZ3JpZENlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIm9yaWVudGF0aW9uQnV0dG9uIiwiY2VsbCIsImluZGV4Iiwic2hvd0N1cnJlbnRTaXplIiwiY3VycmVudExlbmd0aCIsInByZXZpb3VzTGVuZ3RoIiwiY2VsbENsYXNzTGlzdCIsIm1hcCIsIm1heENlbGxzSW5Sb3ciLCJtYXhDZWxsc0luQ29sIiwibmV4dFJvd0NlbGwiLCJuZXh0Q29sQ2VsbCIsImlzVG91Y2hEZXZpY2UiLCJuYXZpZ2F0b3IiLCJtYXhUb3VjaFBvaW50cyIsIm1zTWF4VG91Y2hQb2ludHMiLCJyZW1vdmVIb3ZlciIsInBvbGUiLCJzZXRUaW1lb3V0IiwicmVzZXRCdXR0b24iLCJsb2NhdGlvbiIsInJlbG9hZCIsIlNoaXAiLCJjbGFzc05hbWUiLCJzaGlwU2l6ZXMiLCJhbGxTaGlwcyIsImdhbWVGaWVsZCIsImNsaWNrSGFuZGxlciIsImUiLCJjbGFzc2VzIiwidGFyZ2V0Iiwic2hpcExlbmd0aCIsInNoaWZ0IiwicHVzaCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJiYWNrZ3JvdW5kQW5pbWF0aW9uIiwidW5zaGlmdCIsImNvbXB1dGVyIiwiZG9tQm90Qm9hcmQiLCJwbGF5U3RhdHVzIiwicm91bmQiLCJwbGF5ZXJBdHRhY2siLCJwbGF5Q29tcHV0ZXIiLCJ4TnVtIiwieU51bSIsImN1cnJlbnRTaXplIiwib3JpZW50YXRpb25QaWNrIiwiTWF0aCIsInJhbmRvbSIsInJhbmRvbVBpY2siLCJmbG9vciIsInN0YXJ0UG9pbnQiLCJjb25uZWN0ZWRDbGFzcyIsIm5ld1NoaXAiLCJnZW5lcmF0ZVJhbmRvbU1vdmUiLCJib21iZWRBcnIiLCJudW0xIiwibnVtMiIsImNvb3JkaW5hdGUiLCJmaW5kQWRqYWNlbnRIaXRDZWxscyIsImRpcmVjdGlvbiIsImRvbVBsYXllckJvYXJkIiwiZ3JpZCIsIkFycmF5IiwiZnJvbSIsImFkamFjZW50Q2VsbHMiLCJkaXJlY3Rpb25zIiwibGVmdCIsInJpZ2h0IiwidXAiLCJkb3duIiwiY3VycmVudFJvdyIsImN1cnJlbnRDb2wiLCJuZXdSb3ciLCJuZXdDb2wiLCJjZWxsQ2xhc3NOYW1lIiwiZmluZCIsImNvbnRhaW5zIiwiaW5uZXJEaXYiLCJvY2N1cGllZEFyciIsImNoZWNrSGl0Iiwic3BvdCIsImZpbmFsU3BvdCIsInNwb3RJbmRleCIsImluZGV4T2YiLCJzaGlwSGl0IiwiaGl0IiwiaXNTdW5rIiwibWFya1N1bmtTaGlwcyIsIm5vSGl0IiwicmFuZG9tQ29vcmRpbmF0ZSIsIm91dGVyTG9vcCIsImxlZnRDZWxscyIsInJpZ2h0Q2VsbHMiLCJ1cENlbGxzIiwiZG93bkNlbGxzIiwibmV3Q29sVmVyT25lIiwibmV3Q29sVmVyVHdvIiwiZmluYWxDbGFzcyIsIm5ld1Jvd1Zlck9uZSIsIm5ld1Jvd1ZlclR3byIsIm9uZVJpZ2h0Iiwib25lTGVmdCIsIm9uZVRvcCIsIm9uZUJvdHRvbSIsIm1heEF0dGVtcHRzIiwic2VsZWN0ZWREaXJlY3Rpb24iLCJhdHRlbXB0cyIsImNvbnN0cnVjdG9yIiwidXBkYXRlQm9tYmVkIiwiYm9tYmVkSXRlbSIsIm9jY3VwaWVkSXRlbSIsImZpZWxkIiwicGxheUZpZWxkIiwic3RhcnRQb3NpdGlvbiIsImdpdmVuTGVuZ3RoIiwicHJlZml4IiwiY2VsbFN0cmluZyIsImVsZW1lbnQiLCJqIiwiZ3JpZENlbGwiLCJ1bmlxdWVDbGFzc05hbWUiLCJpbmZvQXJyIiwic3RhdHVzIiwib2xkSW1hZ2UiLCJpbm5lcldpZHRoIiwiY2VsbFNpemUiLCJvZmZzZXRXaWR0aCIsInBvc2l0aW9uUGFydHMiLCJsZWZ0TWFyZ2luIiwidG9wTWFyZ2luIiwiZmluYWxTaXplIiwic3RhcnRpbmdQb2ludCIsImltYWdlVG9SZW1vdmUiLCJzaGlwSW1hZ2UiLCJ3aWR0aCIsImV2ZW50IiwiY2xpY2tlZEVsZW1lbnQiLCJjbGFzc2VzQXJyYXkiLCJjaG9zZW5TcG90IiwiZG9tQ2hvc2VuU3BvdCIsImhpdENvdW50ZXIiLCJyZWxvYWRQYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==