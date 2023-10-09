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
    return true; // vrátí true, když je to v pořádku
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
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");

const computer = {
  generateMove(bombedArr) {
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
  playComputer(occupiedArr, bombedArr, playerBoard) {
    const domPlayerBoard = document.querySelector('.player-field');
    const coordinate = this.generateMove(bombedArr);
    console.log(coordinate);
    const domChosenSpot = domPlayerBoard.querySelector(`.${coordinate}`);
    if (occupiedArr.includes(coordinate)) {
      const hit = document.createElement('div');
      hit.classList.add('hit');
      domChosenSpot.appendChild(hit);
    } else {
      const noHit = document.createElement('div');
      noHit.classList.add('no-hit');
      domChosenSpot.appendChild(noHit);
    }
    bombedArr.push(coordinate);
    _player__WEBPACK_IMPORTED_MODULE_0__["default"].playStatus = true;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computer);

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMainGameField: () => (/* binding */ createMainGameField),
/* harmony export */   createWelcomeScreen: () => (/* binding */ createWelcomeScreen),
/* harmony export */   hoverColors: () => (/* binding */ hoverColors)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-listener */ "./src/modules/ship-listener.js");
/* harmony import */ var _randomField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./randomField */ "./src/modules/randomField.js");
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game-loop */ "./src/modules/game-loop.js");





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
  middleHeading.textContent = `${_player__WEBPACK_IMPORTED_MODULE_0__["default"].name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '40px';
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
function createMainGameField(playerGameBoard) {
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
  const botGameBoard = (0,_randomField__WEBPACK_IMPORTED_MODULE_3__["default"])();
  botGameBoard.showBoard('bot-field');
  botGameBoard.showShips();
  playerGameBoard.ships.forEach(ship => {
    playerGameBoard.placeImage(ship, 'player-field');
  });
  (0,_game_loop__WEBPACK_IMPORTED_MODULE_4__["default"])(playerGameBoard, botGameBoard);
}
function createWelcomeScreen() {
  const startButton = document.querySelector('.start-button');
  const nameInput = document.querySelector('.name-input');
  const alertText = document.querySelector('.alert-text');
  startButton.addEventListener('click', () => {
    if (nameInput.value === '') {
      alertText.style.color = 'red';
    } else {
      _player__WEBPACK_IMPORTED_MODULE_0__["default"].name = `${nameInput.value}`;
      alertText.style.display = 'none';
      boardPicker();
    }
  });
}
function hoverColors(orientation, length) {
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
      gridCells.forEach(cell => {
        cell.classList.remove('hovered', 'hovered-red');
      });
    });
  });
}

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


function gameLoop(playerBoard, botBoard) {
  const domBotBoard = document.querySelector('.bot-field');
  domBotBoard.addEventListener('click', e => {
    if (_player__WEBPACK_IMPORTED_MODULE_1__["default"].playStatus) {
      const round = _player__WEBPACK_IMPORTED_MODULE_1__["default"].playPlayer(e, playerBoard, botBoard);
      if (round) {
        setTimeout(() => {
          _computer__WEBPACK_IMPORTED_MODULE_0__["default"].playComputer(playerBoard.occupiedCoordinates, playerBoard.bombedCoordinates, playerBoard);
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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

class Gameboard {
  constructor() {
    this.occupiedCoordinates = [];
    this.bombedCoordinates = [];
    this.emptyCoordinates = [];
    this.ships = [];
  }
  updateCoordinates(occupiedItem) {
    this.occupiedCoordinates.push(occupiedItem);
  }
  checkOccupied(row, col, orientation, length) {
    if (orientation === 'AXIS: X') {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row}-${col + i}`;
        console.log(spot);
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row + i}-${col}`;
        console.log(spot);
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
    }
    console.log(this.occupiedCoordinates);
    return false;
  }
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
  showShips() {
    console.log(this.ships);
    console.log(this.occupiedCoordinates);
  }
  showCurrentSize() {
    const infoArr = [this.ships[this.ships.length - 1], this.ships[this.ships.length - 2]];
    return infoArr;
  }
  placeImage(ship, gameField) {
    const cellSize = 48;
    const positionParts = ship.position.split('-');
    const row = Number(positionParts[1]);
    const col = Number(positionParts[2]);
    let leftMargin;
    let topMargin;
    const finalSize = cellSize * ship.length;
    const field = document.querySelector(`.${gameField}`);
    const startingPoint = field.querySelector(`.${ship.position}`);
    console.log(startingPoint);
    const shipImage = document.createElement('img');
    if (ship.orientation === 'AXIS: X') {
      shipImage.classList.add('ship-image-x');
      topMargin = 50 * (row - 1);
      leftMargin = 50 * (col - 1);
    } else {
      shipImage.classList.add('ship-image-y');
      topMargin = 50 * (row - 1);
      leftMargin = 50 * (col - 1);
    }
    shipImage.style.width = `${finalSize}px`;
    shipImage.style.top = `${topMargin}px`;
    shipImage.style.left = `${leftMargin}px`;
    shipImage.src = `images/${ship.length}-ship.png`;
    startingPoint.appendChild(shipImage);
  }
  receiveAttack(row, col) {}
  sunkAllShips() {}
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
const player = {
  playPlayer(event, playerBoard, botBoard) {
    const domBotBoard = document.querySelector('.bot-field');
    const clickedElement = event.target;
    const classes = clickedElement.classList;
    const classesArray = Array.from(classes);
    if (classesArray.includes('grid-cell') && !botBoard.bombedCoordinates.includes(classesArray[1])) {
      const chosenSpot = classesArray[1];
      if (botBoard.occupiedCoordinates.includes(chosenSpot)) {
        const spotIndex = botBoard.occupiedCoordinates.indexOf(chosenSpot);
        botBoard.occupiedCoordinates.splice(spotIndex, 1);
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
      this.playStatus = false;
      return true;
    } else {
      return false;
    }
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
      console.log('worked');
      xNum = startPoint;
      yNum = randomPick;
    }
    const connectedClass = `cell-${xNum}-${yNum}`;
    console.log(connectedClass);
    if (!(0,_availabilityValidator__WEBPACK_IMPORTED_MODULE_0__["default"])(connectedClass, currentSize, orientationPick, botGameBoard)) {
      shipSizes.unshift(currentSize);
    } else {
      const newShip = new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](currentSize, orientationPick, connectedClass);
      botGameBoard.ships.push(newShip);
    }
  }
  botGameBoard.showShips();
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

  // Define the event listener function
  function clickHandler(e) {
    const classes = e.target.classList;
    const position = classes[1];
    if (classes.length < 3) {
      // does not count if the user clicks on the gap
      return;
    }
    const shipLength = shipSizes.shift();
    const shipOrientation = document.querySelector('.axis-button').textContent;
    (0,_dom__WEBPACK_IMPORTED_MODULE_4__.hoverColors)(shipOrientation, shipLength);
    if ((0,_spotValidator__WEBPACK_IMPORTED_MODULE_1__["default"])(shipOrientation, shipLength, position) && (0,_availabilityValidator__WEBPACK_IMPORTED_MODULE_3__["default"])(position, shipLength, shipOrientation, playerGameBoard)) {
      console.log('completed');
      const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
      playerGameBoard.ships.push(ship);
      playerGameBoard.placeImage(ship, 'grid-container-picker');
      if (shipSizes.length === 0) {
        // Remove the event listener when the condition is fulfilled
        gameField.removeEventListener('click', clickHandler);
        const backgroundAnimation = document.querySelector('.background-animation-space');
        backgroundAnimation.classList.add('background-animation');
        setTimeout(() => {
          (0,_dom__WEBPACK_IMPORTED_MODULE_4__.createMainGameField)(playerGameBoard);
        }, 800);
        return;
      }
      console.log(shipSizes);
    } else {
      console.log('occupied');
      shipSizes.unshift(shipLength);
      console.log(shipSizes);
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
    this.sunk = false;
    this.orientation = orientation;
    this.position = position;
  }
  hit() {
    this.hitCounter++;
  }
  isSunk() {
    if (this.hitCounter === this.length) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
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
  console.log(position);
  const realSize = length - 1;
  const axisParts = position.split('-');
  const row = Number(axisParts[1]);
  const col = Number(axisParts[2]);
  if (axis === 'AXIS: X') {
    console.log(row);
    console.log(col);
    console.log(col - realSize);
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxHQUFHLEVBQUUsRUFBRztNQUN6QixPQUFPLEtBQUs7SUFDZDtJQUNBLE9BQU8sSUFBSTtFQUNiO0FBQ0Y7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9EO0FBRXBEdkYsaUVBQW1CLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2F2YWlsYWJpbGl0eVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZS1sb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcmFuZG9tRmllbGQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAtbGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3Nwb3RWYWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTdGF0dXMoXG4gIG5ld1Bvc2l0aW9uLFxuICBsZW5ndGgsXG4gIG9yaWVudGF0aW9uLFxuICBwbGF5Qm9hcmQsXG4pIHtcbiAgY29uc3QgYXhpc1BhcnRzID0gbmV3UG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgY29uc3Qgcm93ID0gTnVtYmVyKGF4aXNQYXJ0c1sxXSk7XG4gIGNvbnN0IGNvbCA9IE51bWJlcihheGlzUGFydHNbMl0pO1xuICBpZiAoIXBsYXlCb2FyZC5jaGVja09jY3VwaWVkKHJvdywgY29sLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSkge1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYXlCb2FyZC51cGRhdGVDb29yZGluYXRlcyhgY2VsbC0ke3Jvd30tJHtjb2wgKyBpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3JpZW50YXRpb24gPT09ICdBWElTOiBZJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBwbGF5Qm9hcmQudXBkYXRlQ29vcmRpbmF0ZXMoYGNlbGwtJHtyb3cgKyBpfS0ke2NvbH1gKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGxheUJvYXJkLmNoZWNrT2NjdXBpZWQoKTtcbiAgICByZXR1cm4gdHJ1ZTsgLy8gdnLDoXTDrSB0cnVlLCBrZHnFviBqZSB0byB2IHBvxZnDoWRrdVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHBsYXllciBmcm9tICcuL3BsYXllcic7XG5cbmNvbnN0IGNvbXB1dGVyID0ge1xuICBnZW5lcmF0ZU1vdmUoYm9tYmVkQXJyKSB7XG4gICAgbGV0IG51bTE7IGxldFxuICAgICAgbnVtMjtcbiAgICBsZXQgY29vcmRpbmF0ZTtcblxuICAgIGRvIHtcbiAgICAgIG51bTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgICAgbnVtMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgICBjb29yZGluYXRlID0gYGNlbGwtJHtudW0xfS0ke251bTJ9YDtcbiAgICB9IHdoaWxlIChib21iZWRBcnIuaW5jbHVkZXMoY29vcmRpbmF0ZSkpO1xuXG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XG4gIH0sXG5cbiAgcGxheUNvbXB1dGVyKG9jY3VwaWVkQXJyLCBib21iZWRBcnIsIHBsYXllckJvYXJkKSB7XG4gICAgY29uc3QgZG9tUGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWZpZWxkJyk7XG4gICAgY29uc3QgY29vcmRpbmF0ZSA9IHRoaXMuZ2VuZXJhdGVNb3ZlKGJvbWJlZEFycik7XG4gICAgY29uc29sZS5sb2coY29vcmRpbmF0ZSk7XG4gICAgY29uc3QgZG9tQ2hvc2VuU3BvdCA9IGRvbVBsYXllckJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC4ke2Nvb3JkaW5hdGV9YCk7XG5cbiAgICBpZiAob2NjdXBpZWRBcnIuaW5jbHVkZXMoY29vcmRpbmF0ZSkpIHtcbiAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgaGl0LmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgICAgZG9tQ2hvc2VuU3BvdC5hcHBlbmRDaGlsZChoaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub0hpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgbm9IaXQuY2xhc3NMaXN0LmFkZCgnbm8taGl0Jyk7XG4gICAgICBkb21DaG9zZW5TcG90LmFwcGVuZENoaWxkKG5vSGl0KTtcbiAgICB9XG5cbiAgICBib21iZWRBcnIucHVzaChjb29yZGluYXRlKTtcbiAgICBwbGF5ZXIucGxheVN0YXR1cyA9IHRydWU7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb21wdXRlcjtcbiIsImltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgc2hpcExpc3RlbmVyIGZyb20gJy4vc2hpcC1saXN0ZW5lcic7XG5pbXBvcnQgY3JlYXRlUmFuZG9tRmllbGQgZnJvbSAnLi9yYW5kb21GaWVsZCc7XG5pbXBvcnQgZ2FtZUxvb3AgZnJvbSAnLi9nYW1lLWxvb3AnO1xuXG5jb25zdCBjb250ZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuY29uc3QgbWlkZGxlSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWRkbGUtaGVhZGluZycpO1xuY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcbmNvbnN0IG1haW5BcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgbG9nb0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIGltZycpO1xuY29uc3QgeHlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtYnV0dG9uJyk7XG5jb25zdCBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBsZWZ0U2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgcmlnaHRTaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBwbGF5ZXJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbmNvbnN0IGJvdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuY29uc3QgcGxheWVyRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGJvdEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5sZXQgcGxheWVyR2FtZUJvYXJkO1xuXG5mdW5jdGlvbiBjaGVja0J1dHRvbigpIHtcbiAgY29uc3QgYXhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpO1xuICBheGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChheGlzLnRleHRDb250ZW50ID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGF4aXMudGV4dENvbnRlbnQgPSAnQVhJUzogWSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMudGV4dENvbnRlbnQgPSAnQVhJUzogWCc7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYm9hcmRQaWNrZXIoKSB7XG4gIGdyaWRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jb250YWluZXItcGlja2VyJyk7XG5cbiAgbG9nb0ltYWdlLnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgbWlkZGxlSGVhZGluZy50ZXh0Q29udGVudCA9IGAke3BsYXllci5uYW1lfSwgUExBQ0UgWU9VUiBTSElQU2A7XG4gIG1pZGRsZUhlYWRpbmcuc3R5bGUubWFyZ2luVG9wID0gJzQwcHgnO1xuICB4eUJ1dHRvbi50ZXh0Q29udGVudCA9ICdBWElTOiBYJztcbiAgaW5wdXRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHh5QnV0dG9uLCBpbnB1dEVsZW1lbnQpO1xuICB4eUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdheGlzLWJ1dHRvbicpO1xuICB3cmFwcGVyLnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgbWFpbkFyZWEucmVtb3ZlQ2hpbGQoc3RhcnRCdXR0b24pO1xuICBtYWluQXJlYS5hcHBlbmRDaGlsZChncmlkQ29udGFpbmVyKTtcblxuICBjaGVja0J1dHRvbigpO1xuXG4gIHBsYXllckdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgcGxheWVyR2FtZUJvYXJkLnNob3dCb2FyZCgnZ3JpZC1jb250YWluZXItcGlja2VyJyk7XG4gIHNoaXBMaXN0ZW5lcignZ3JpZC1jb250YWluZXItcGlja2VyJywgcGxheWVyR2FtZUJvYXJkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1haW5HYW1lRmllbGQocGxheWVyR2FtZUJvYXJkKSB7XG4gIG1pZGRsZUhlYWRpbmcucmVtb3ZlKCk7XG4gIHh5QnV0dG9uLnJlbW92ZSgpO1xuICBncmlkQ29udGFpbmVyLnJlbW92ZSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtdGV4dCcpLnJlbW92ZSgpO1xuICBtYWluQXJlYS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBtYWluQXJlYS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdzcGFjZUFyb3VuZCc7XG4gIG1haW5BcmVhLnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgcGxheWVyRmllbGQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWZpZWxkJyk7XG4gIGJvdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2JvdC1maWVsZCcpO1xuICBsZWZ0U2lkZS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItaGFsZicpO1xuICByaWdodFNpZGUuY2xhc3NMaXN0LmFkZCgnYm90LWhhbGYnKTtcbiAgcGxheWVySGVhZGluZy5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItaGVhZGluZycpO1xuICBib3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2JvdC1oZWFkaW5nJyk7XG4gIHBsYXllckhlYWRpbmcudGV4dENvbnRlbnQgPSAnRlJJRUROTFkgV0FURVJTJztcbiAgYm90SGVhZGluZy50ZXh0Q29udGVudCA9ICdFTkVNWSBXQVRFUlMnO1xuICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChwbGF5ZXJIZWFkaW5nKTtcbiAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKGJvdEhlYWRpbmcpO1xuICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChwbGF5ZXJGaWVsZCk7XG4gIHJpZ2h0U2lkZS5hcHBlbmRDaGlsZChib3RGaWVsZCk7XG4gIG1haW5BcmVhLmFwcGVuZENoaWxkKGxlZnRTaWRlKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQocmlnaHRTaWRlKTtcbiAgcGxheWVyR2FtZUJvYXJkLnNob3dCb2FyZCgncGxheWVyLWZpZWxkJyk7XG4gIHBsYXllckdhbWVCb2FyZC5zaG93U2hpcHMoKTtcbiAgY29uc3QgYm90R2FtZUJvYXJkID0gY3JlYXRlUmFuZG9tRmllbGQoKTtcbiAgYm90R2FtZUJvYXJkLnNob3dCb2FyZCgnYm90LWZpZWxkJyk7XG4gIGJvdEdhbWVCb2FyZC5zaG93U2hpcHMoKTtcbiAgcGxheWVyR2FtZUJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBwbGF5ZXJHYW1lQm9hcmQucGxhY2VJbWFnZShzaGlwLCAncGxheWVyLWZpZWxkJyk7XG4gIH0pO1xuICBnYW1lTG9vcChwbGF5ZXJHYW1lQm9hcmQsIGJvdEdhbWVCb2FyZCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXZWxjb21lU2NyZWVuKCkge1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcbiAgY29uc3QgYWxlcnRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0LXRleHQnKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgYWxlcnRUZXh0LnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllci5uYW1lID0gYCR7bmFtZUlucHV0LnZhbHVlfWA7XG4gICAgICBhbGVydFRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGJvYXJkUGlja2VyKCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhvdmVyQ29sb3JzKG9yaWVudGF0aW9uLCBsZW5ndGgpIHtcbiAgbGV0IGFjdGl2ZU51bWJlciA9IGxlbmd0aDtcbiAgY29uc3QgZ3JpZENlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyaWQtY2VsbCcpO1xuICBjb25zdCBvcmllbnRhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpO1xuXG4gIGdyaWRDZWxscy5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGlmIChvcmllbnRhdGlvbkJ1dHRvbi50ZXh0Q29udGVudCA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICAgIG9yaWVudGF0aW9uID0gJ0FYSVM6IFgnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3JpZW50YXRpb24gPSAnQVhJUzogWSc7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5lZWRlZENvb3JkaW5hdGVzID0gW107XG5cbiAgICAgIGlmIChwbGF5ZXJHYW1lQm9hcmQuc2hvd0N1cnJlbnRTaXplKClbMF0pIHtcbiAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBwbGF5ZXJHYW1lQm9hcmQuc2hvd0N1cnJlbnRTaXplKClbMF0ubGVuZ3RoO1xuICAgICAgICBsZXQgcHJldmlvdXNMZW5ndGg7XG5cbiAgICAgICAgaWYgKHBsYXllckdhbWVCb2FyZC5zaG93Q3VycmVudFNpemUoKVsxXSkge1xuICAgICAgICAgIHByZXZpb3VzTGVuZ3RoID0gcGxheWVyR2FtZUJvYXJkLnNob3dDdXJyZW50U2l6ZSgpWzFdLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyZW50TGVuZ3RoID09PSAzICYmIHByZXZpb3VzTGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbjEnKTtcbiAgICAgICAgICBhY3RpdmVOdW1iZXIgPSAzO1xuICAgICAgICAgIGN1cnJlbnRMZW5ndGggLT0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50TGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbjInKTtcbiAgICAgICAgICBhY3RpdmVOdW1iZXIgPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRMZW5ndGgpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdvcHRpb24zJyk7XG4gICAgICAgICAgYWN0aXZlTnVtYmVyID0gY3VycmVudExlbmd0aCAtIDE7XG4gICAgICAgICAgY29uc29sZS5sb2coYWN0aXZlTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjZWxsQ2xhc3NMaXN0ID0gY2VsbC5jbGFzc0xpc3Q7XG4gICAgICBjb25zdCBbLCByb3csIGNvbF0gPSBjZWxsQ2xhc3NMaXN0WzFdLnNwbGl0KCctJykubWFwKE51bWJlcik7XG5cbiAgICAgIGNvbnN0IG1heENlbGxzSW5Sb3cgPSAxMCAtIHJvdyArIDE7XG4gICAgICBjb25zdCBtYXhDZWxsc0luQ29sID0gMTAgLSBjb2wgKyAxO1xuXG4gICAgICBpZiAoYWN0aXZlTnVtYmVyID4gbWF4Q2VsbHNJblJvdyAmJiBvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFknKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0gZWxzZSBpZiAoYWN0aXZlTnVtYmVyID4gbWF4Q2VsbHNJbkNvbCAmJiBvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0gZWxzZSBpZiAocGxheWVyR2FtZUJvYXJkLmNoZWNrT2NjdXBpZWQocm93LCBjb2wsIG9yaWVudGF0aW9uLCBhY3RpdmVOdW1iZXIpKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYWN0aXZlTnVtYmVyOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBuZXh0Um93Q2VsbCA9IGdyaWRDZWxsc1tpbmRleCArIGldO1xuICAgICAgICAgIGNvbnN0IG5leHRDb2xDZWxsID0gZ3JpZENlbGxzW2luZGV4ICsgaSAqIDEwXTtcbiAgICAgICAgICBpZiAobmV4dFJvd0NlbGwgJiYgb3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgICAgICAgbmV4dFJvd0NlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmV4dENvbENlbGwgJiYgb3JpZW50YXRpb24gPT09ICdBWElTOiBZJykge1xuICAgICAgICAgICAgbmV4dENvbENlbGwuY2xhc3NMaXN0LmFkZCgnaG92ZXJlZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgZ3JpZENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdob3ZlcmVkJywgJ2hvdmVyZWQtcmVkJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgY29tcHV0ZXIgZnJvbSAnLi9jb21wdXRlcic7XG5pbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2FtZUxvb3AocGxheWVyQm9hcmQsIGJvdEJvYXJkKSB7XG4gIGNvbnN0IGRvbUJvdEJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvdC1maWVsZCcpO1xuXG4gIGRvbUJvdEJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBpZiAocGxheWVyLnBsYXlTdGF0dXMpIHtcbiAgICAgIGNvbnN0IHJvdW5kID0gcGxheWVyLnBsYXlQbGF5ZXIoZSwgcGxheWVyQm9hcmQsIGJvdEJvYXJkKTtcblxuICAgICAgaWYgKHJvdW5kKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNvbXB1dGVyLnBsYXlDb21wdXRlcihwbGF5ZXJCb2FyZC5vY2N1cGllZENvb3JkaW5hdGVzLCBwbGF5ZXJCb2FyZC5ib21iZWRDb29yZGluYXRlcywgcGxheWVyQm9hcmQpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vY2N1cGllZENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5ib21iZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuZW1wdHlDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKG9jY3VwaWVkSXRlbSkge1xuICAgIHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5wdXNoKG9jY3VwaWVkSXRlbSk7XG4gIH1cblxuICBjaGVja09jY3VwaWVkKHJvdywgY29sLCBvcmllbnRhdGlvbiwgbGVuZ3RoKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3BvdCA9IGBjZWxsLSR7cm93fS0ke2NvbCArIGl9YDtcbiAgICAgICAgY29uc29sZS5sb2coc3BvdCk7XG4gICAgICAgIGlmICh0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoc3BvdCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNwb3QgPSBgY2VsbC0ke3JvdyArIGl9LSR7Y29sfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKHNwb3QpO1xuICAgICAgICBpZiAodGhpcy5vY2N1cGllZENvb3JkaW5hdGVzLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc2hvd0JvYXJkKGNsYXNzTmFtZSkge1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBjb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgICAgZ3JpZENvbnRhaW5lci5hcHBlbmRDaGlsZChncmlkQ2VsbCk7XG5cbiAgICAgICAgY29uc3QgdW5pcXVlQ2xhc3NOYW1lID0gYGNlbGwtJHtpICsgMX0tJHtqICsgMX1gO1xuICAgICAgICBncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2hvd1NoaXBzKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuc2hpcHMpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMub2NjdXBpZWRDb29yZGluYXRlcyk7XG4gIH1cblxuICBzaG93Q3VycmVudFNpemUoKSB7XG4gICAgY29uc3QgaW5mb0FyciA9IFt0aGlzLnNoaXBzW3RoaXMuc2hpcHMubGVuZ3RoIC0gMV0sIHRoaXMuc2hpcHNbdGhpcy5zaGlwcy5sZW5ndGggLSAyXV07XG4gICAgcmV0dXJuIGluZm9BcnI7XG4gIH1cblxuICBwbGFjZUltYWdlKHNoaXAsIGdhbWVGaWVsZCkge1xuICAgIGNvbnN0IGNlbGxTaXplID0gNDg7XG4gICAgY29uc3QgcG9zaXRpb25QYXJ0cyA9IHNoaXAucG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgICBjb25zdCByb3cgPSBOdW1iZXIocG9zaXRpb25QYXJ0c1sxXSk7XG4gICAgY29uc3QgY29sID0gTnVtYmVyKHBvc2l0aW9uUGFydHNbMl0pO1xuICAgIGxldCBsZWZ0TWFyZ2luO1xuICAgIGxldCB0b3BNYXJnaW47XG4gICAgY29uc3QgZmluYWxTaXplID0gY2VsbFNpemUgKiBzaGlwLmxlbmd0aDtcbiAgICBjb25zdCBmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2dhbWVGaWVsZH1gKTtcbiAgICBjb25zdCBzdGFydGluZ1BvaW50ID0gZmllbGQucXVlcnlTZWxlY3RvcihgLiR7c2hpcC5wb3NpdGlvbn1gKTtcbiAgICBjb25zb2xlLmxvZyhzdGFydGluZ1BvaW50KTtcbiAgICBjb25zdCBzaGlwSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBzaGlwSW1hZ2UuY2xhc3NMaXN0LmFkZCgnc2hpcC1pbWFnZS14Jyk7XG4gICAgICB0b3BNYXJnaW4gPSA1MCAqIChyb3cgLSAxKTtcbiAgICAgIGxlZnRNYXJnaW4gPSA1MCAqIChjb2wgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hpcEltYWdlLmNsYXNzTGlzdC5hZGQoJ3NoaXAtaW1hZ2UteScpO1xuICAgICAgdG9wTWFyZ2luID0gNTAgKiAocm93IC0gMSk7XG4gICAgICBsZWZ0TWFyZ2luID0gNTAgKiAoY29sIC0gMSk7XG4gICAgfVxuICAgIHNoaXBJbWFnZS5zdHlsZS53aWR0aCA9IGAke2ZpbmFsU2l6ZX1weGA7XG4gICAgc2hpcEltYWdlLnN0eWxlLnRvcCA9IGAke3RvcE1hcmdpbn1weGA7XG4gICAgc2hpcEltYWdlLnN0eWxlLmxlZnQgPSBgJHtsZWZ0TWFyZ2lufXB4YDtcbiAgICBzaGlwSW1hZ2Uuc3JjID0gYGltYWdlcy8ke3NoaXAubGVuZ3RofS1zaGlwLnBuZ2A7XG4gICAgc3RhcnRpbmdQb2ludC5hcHBlbmRDaGlsZChzaGlwSW1hZ2UpO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuXG4gIH1cblxuICBzdW5rQWxsU2hpcHMoKSB7XG5cbiAgfVxufVxuIiwiY29uc3QgcGxheWVyID0ge1xuICBwbGF5UGxheWVyKGV2ZW50LCBwbGF5ZXJCb2FyZCwgYm90Qm9hcmQpIHtcbiAgICBjb25zdCBkb21Cb3RCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3QtZmllbGQnKTtcbiAgICBjb25zdCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldDtcbiAgICBjb25zdCBjbGFzc2VzID0gY2xpY2tlZEVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IGNsYXNzZXNBcnJheSA9IEFycmF5LmZyb20oY2xhc3Nlcyk7XG4gICAgaWYgKGNsYXNzZXNBcnJheS5pbmNsdWRlcygnZ3JpZC1jZWxsJykgJiYgIWJvdEJvYXJkLmJvbWJlZENvb3JkaW5hdGVzLmluY2x1ZGVzKGNsYXNzZXNBcnJheVsxXSkpIHtcbiAgICAgIGNvbnN0IGNob3NlblNwb3QgPSBjbGFzc2VzQXJyYXlbMV07XG4gICAgICBpZiAoYm90Qm9hcmQub2NjdXBpZWRDb29yZGluYXRlcy5pbmNsdWRlcyhjaG9zZW5TcG90KSkge1xuICAgICAgICBjb25zdCBzcG90SW5kZXggPSBib3RCb2FyZC5vY2N1cGllZENvb3JkaW5hdGVzLmluZGV4T2YoY2hvc2VuU3BvdCk7XG4gICAgICAgIGJvdEJvYXJkLm9jY3VwaWVkQ29vcmRpbmF0ZXMuc3BsaWNlKHNwb3RJbmRleCwgMSk7XG5cbiAgICAgICAgY29uc3QgZG9tQ2hvc2VuU3BvdCA9IGRvbUJvdEJvYXJkLnF1ZXJ5U2VsZWN0b3IoYC4ke2Nob3NlblNwb3R9YCk7XG4gICAgICAgIGNvbnN0IGhpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBoaXQuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgICAgIGRvbUNob3NlblNwb3QuYXBwZW5kQ2hpbGQoaGl0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRvbUNob3NlblNwb3QgPSBkb21Cb3RCb2FyZC5xdWVyeVNlbGVjdG9yKGAuJHtjaG9zZW5TcG90fWApO1xuICAgICAgICBjb25zdCBub0hpdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBub0hpdC5jbGFzc0xpc3QuYWRkKCduby1oaXQnKTtcbiAgICAgICAgZG9tQ2hvc2VuU3BvdC5hcHBlbmRDaGlsZChub0hpdCk7XG4gICAgICB9XG4gICAgICBib3RCb2FyZC5ib21iZWRDb29yZGluYXRlcy5wdXNoKGNob3NlblNwb3QpO1xuICAgICAgdGhpcy5wbGF5U3RhdHVzID0gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSxcblxuICBwbGF5U3RhdHVzOiB0cnVlLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyO1xuIiwiaW1wb3J0IGNoZWNrU3RhdHVzIGZyb20gJy4vYXZhaWxhYmlsaXR5VmFsaWRhdG9yJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUmFuZG9tRmllbGQoKSB7XG4gIGNvbnN0IGJvdEdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgY29uc3Qgc2hpcFNpemVzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBjb25zdCBvcmllbnRhdGlvbiA9IFsnQVhJUzogWCcsICdBWElTOiBZJ107XG5cbiAgd2hpbGUgKHNoaXBTaXplcy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHhOdW07XG4gICAgbGV0IHlOdW07XG4gICAgY29uc3QgY3VycmVudFNpemUgPSBzaGlwU2l6ZXMuc2hpZnQoKTtcbiAgICBjb25zdCBvcmllbnRhdGlvblBpY2sgPSBvcmllbnRhdGlvbltNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXTtcbiAgICBjb25zdCByYW5kb21QaWNrID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICBjb25zdCBzdGFydFBvaW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gY3VycmVudFNpemUpKSArIDE7XG4gICAgaWYgKG9yaWVudGF0aW9uUGljayA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICB4TnVtID0gcmFuZG9tUGljaztcbiAgICAgIHlOdW0gPSBzdGFydFBvaW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnd29ya2VkJyk7XG4gICAgICB4TnVtID0gc3RhcnRQb2ludDtcbiAgICAgIHlOdW0gPSByYW5kb21QaWNrO1xuICAgIH1cbiAgICBjb25zdCBjb25uZWN0ZWRDbGFzcyA9IGBjZWxsLSR7eE51bX0tJHt5TnVtfWA7XG4gICAgY29uc29sZS5sb2coY29ubmVjdGVkQ2xhc3MpO1xuXG4gICAgaWYgKCFjaGVja1N0YXR1cyhjb25uZWN0ZWRDbGFzcywgY3VycmVudFNpemUsIG9yaWVudGF0aW9uUGljaywgYm90R2FtZUJvYXJkKSkge1xuICAgICAgc2hpcFNpemVzLnVuc2hpZnQoY3VycmVudFNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdTaGlwID0gbmV3IFNoaXAoY3VycmVudFNpemUsIG9yaWVudGF0aW9uUGljaywgY29ubmVjdGVkQ2xhc3MpO1xuICAgICAgYm90R2FtZUJvYXJkLnNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgfVxuICB9XG5cbiAgYm90R2FtZUJvYXJkLnNob3dTaGlwcygpO1xuICByZXR1cm4gYm90R2FtZUJvYXJkO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1yZXR1cm4gKi9cbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgY2hlY2tTaGlwVmFsaWRpdHkgZnJvbSAnLi9zcG90VmFsaWRhdG9yJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IGNoZWNrU3RhdHVzIGZyb20gJy4vYXZhaWxhYmlsaXR5VmFsaWRhdG9yJztcbmltcG9ydCB7IGNyZWF0ZU1haW5HYW1lRmllbGQsIGhvdmVyQ29sb3JzIH0gZnJvbSAnLi9kb20nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwTGlzdGVuZXIoY2xhc3NOYW1lLCBwbGF5ZXJHYW1lQm9hcmQpIHtcbiAgY29uc3Qgc2hpcFNpemVzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBjb25zdCBhbGxTaGlwcyA9IFtdO1xuICBjb25zdCBnYW1lRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG4gIGhvdmVyQ29sb3JzKCdBWElTOiBYJywgNSk7XG5cbiAgLy8gRGVmaW5lIHRoZSBldmVudCBsaXN0ZW5lciBmdW5jdGlvblxuICBmdW5jdGlvbiBjbGlja0hhbmRsZXIoZSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XG4gICAgY29uc3QgcG9zaXRpb24gPSBjbGFzc2VzWzFdO1xuXG4gICAgaWYgKGNsYXNzZXMubGVuZ3RoIDwgMykge1xuICAgICAgLy8gZG9lcyBub3QgY291bnQgaWYgdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBnYXBcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcFNpemVzLnNoaWZ0KCk7XG5cbiAgICBjb25zdCBzaGlwT3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXhpcy1idXR0b24nKS50ZXh0Q29udGVudDtcblxuICAgIGhvdmVyQ29sb3JzKHNoaXBPcmllbnRhdGlvbiwgc2hpcExlbmd0aCk7XG5cbiAgICBpZiAoY2hlY2tTaGlwVmFsaWRpdHkoc2hpcE9yaWVudGF0aW9uLCBzaGlwTGVuZ3RoLCBwb3NpdGlvbikgJiYgY2hlY2tTdGF0dXMocG9zaXRpb24sIHNoaXBMZW5ndGgsIHNoaXBPcmllbnRhdGlvbiwgcGxheWVyR2FtZUJvYXJkKSkge1xuICAgICAgY29uc29sZS5sb2coJ2NvbXBsZXRlZCcpO1xuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW5ndGgsIHNoaXBPcmllbnRhdGlvbiwgcG9zaXRpb24pO1xuICAgICAgcGxheWVyR2FtZUJvYXJkLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICBwbGF5ZXJHYW1lQm9hcmQucGxhY2VJbWFnZShzaGlwLCAnZ3JpZC1jb250YWluZXItcGlja2VyJyk7XG4gICAgICBpZiAoc2hpcFNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIHdoZW4gdGhlIGNvbmRpdGlvbiBpcyBmdWxmaWxsZWRcbiAgICAgICAgZ2FtZUZpZWxkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZEFuaW1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYWNrZ3JvdW5kLWFuaW1hdGlvbi1zcGFjZScpO1xuICAgICAgICBiYWNrZ3JvdW5kQW5pbWF0aW9uLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQtYW5pbWF0aW9uJyk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGNyZWF0ZU1haW5HYW1lRmllbGQocGxheWVyR2FtZUJvYXJkKTtcbiAgICAgICAgfSwgODAwKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coc2hpcFNpemVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ29jY3VwaWVkJyk7XG4gICAgICBzaGlwU2l6ZXMudW5zaGlmdChzaGlwTGVuZ3RoKTtcbiAgICAgIGNvbnNvbGUubG9nKHNoaXBTaXplcyk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHRoZSBldmVudCBsaXN0ZW5lclxuICBnYW1lRmllbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgb3JpZW50YXRpb24sIHBvc2l0aW9uKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRDb3VudGVyID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnRlcisrO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdENvdW50ZXIgPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNoZWNrU2hpcFZhbGlkaXR5KGF4aXMsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgY29uc29sZS5sb2cocG9zaXRpb24pO1xuICBjb25zdCByZWFsU2l6ZSA9IGxlbmd0aCAtIDE7XG4gIGNvbnN0IGF4aXNQYXJ0cyA9IHBvc2l0aW9uLnNwbGl0KCctJyk7XG4gIGNvbnN0IHJvdyA9IE51bWJlcihheGlzUGFydHNbMV0pO1xuICBjb25zdCBjb2wgPSBOdW1iZXIoYXhpc1BhcnRzWzJdKTtcbiAgaWYgKGF4aXMgPT09ICdBWElTOiBYJykge1xuICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgY29uc29sZS5sb2coY29sKTtcbiAgICBjb25zb2xlLmxvZyhjb2wgLSByZWFsU2l6ZSk7XG4gICAgaWYgKChjb2wgKyByZWFsU2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBpZiAoYXhpcyA9PT0gJ0FYSVM6IFknKSB7XG4gICAgaWYgKChyb3cgKyByZWFsU2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVXZWxjb21lU2NyZWVuIH0gZnJvbSAnLi9tb2R1bGVzL2RvbSc7XG5cbmNyZWF0ZVdlbGNvbWVTY3JlZW4oKTtcbiJdLCJuYW1lcyI6WyJjaGVja1N0YXR1cyIsIm5ld1Bvc2l0aW9uIiwibGVuZ3RoIiwib3JpZW50YXRpb24iLCJwbGF5Qm9hcmQiLCJheGlzUGFydHMiLCJzcGxpdCIsInJvdyIsIk51bWJlciIsImNvbCIsImNoZWNrT2NjdXBpZWQiLCJpIiwidXBkYXRlQ29vcmRpbmF0ZXMiLCJwbGF5ZXIiLCJjb21wdXRlciIsImdlbmVyYXRlTW92ZSIsImJvbWJlZEFyciIsIm51bTEiLCJudW0yIiwiY29vcmRpbmF0ZSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImluY2x1ZGVzIiwicGxheUNvbXB1dGVyIiwib2NjdXBpZWRBcnIiLCJwbGF5ZXJCb2FyZCIsImRvbVBsYXllckJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29uc29sZSIsImxvZyIsImRvbUNob3NlblNwb3QiLCJoaXQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kQ2hpbGQiLCJub0hpdCIsInB1c2giLCJwbGF5U3RhdHVzIiwiR2FtZWJvYXJkIiwic2hpcExpc3RlbmVyIiwiY3JlYXRlUmFuZG9tRmllbGQiLCJnYW1lTG9vcCIsImNvbnRlbnRGaWVsZCIsIm1pZGRsZUhlYWRpbmciLCJpbnB1dEVsZW1lbnQiLCJtYWluQXJlYSIsImxvZ29JbWFnZSIsInh5QnV0dG9uIiwid3JhcHBlciIsInN0YXJ0QnV0dG9uIiwiZ3JpZENvbnRhaW5lciIsImxlZnRTaWRlIiwicmlnaHRTaWRlIiwicGxheWVySGVhZGluZyIsImJvdEhlYWRpbmciLCJwbGF5ZXJGaWVsZCIsImJvdEZpZWxkIiwicGxheWVyR2FtZUJvYXJkIiwiY2hlY2tCdXR0b24iLCJheGlzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRleHRDb250ZW50IiwiYm9hcmRQaWNrZXIiLCJzdHlsZSIsIndpZHRoIiwibmFtZSIsIm1hcmdpblRvcCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJnYXAiLCJyZW1vdmVDaGlsZCIsInNob3dCb2FyZCIsImNyZWF0ZU1haW5HYW1lRmllbGQiLCJyZW1vdmUiLCJkaXNwbGF5IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwic2hvd1NoaXBzIiwiYm90R2FtZUJvYXJkIiwic2hpcHMiLCJmb3JFYWNoIiwic2hpcCIsInBsYWNlSW1hZ2UiLCJjcmVhdGVXZWxjb21lU2NyZWVuIiwibmFtZUlucHV0IiwiYWxlcnRUZXh0IiwidmFsdWUiLCJjb2xvciIsImhvdmVyQ29sb3JzIiwiYWN0aXZlTnVtYmVyIiwiZ3JpZENlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIm9yaWVudGF0aW9uQnV0dG9uIiwiY2VsbCIsImluZGV4IiwibmVlZGVkQ29vcmRpbmF0ZXMiLCJzaG93Q3VycmVudFNpemUiLCJjdXJyZW50TGVuZ3RoIiwicHJldmlvdXNMZW5ndGgiLCJjZWxsQ2xhc3NMaXN0IiwibWFwIiwibWF4Q2VsbHNJblJvdyIsIm1heENlbGxzSW5Db2wiLCJuZXh0Um93Q2VsbCIsIm5leHRDb2xDZWxsIiwiYm90Qm9hcmQiLCJkb21Cb3RCb2FyZCIsImUiLCJyb3VuZCIsInBsYXlQbGF5ZXIiLCJzZXRUaW1lb3V0Iiwib2NjdXBpZWRDb29yZGluYXRlcyIsImJvbWJlZENvb3JkaW5hdGVzIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwiZW1wdHlDb29yZGluYXRlcyIsIm9jY3VwaWVkSXRlbSIsInNwb3QiLCJjbGFzc05hbWUiLCJqIiwiZ3JpZENlbGwiLCJ1bmlxdWVDbGFzc05hbWUiLCJpbmZvQXJyIiwiZ2FtZUZpZWxkIiwiY2VsbFNpemUiLCJwb3NpdGlvblBhcnRzIiwicG9zaXRpb24iLCJsZWZ0TWFyZ2luIiwidG9wTWFyZ2luIiwiZmluYWxTaXplIiwiZmllbGQiLCJzdGFydGluZ1BvaW50Iiwic2hpcEltYWdlIiwidG9wIiwibGVmdCIsInNyYyIsInJlY2VpdmVBdHRhY2siLCJzdW5rQWxsU2hpcHMiLCJldmVudCIsImNsaWNrZWRFbGVtZW50IiwidGFyZ2V0IiwiY2xhc3NlcyIsImNsYXNzZXNBcnJheSIsIkFycmF5IiwiZnJvbSIsImNob3NlblNwb3QiLCJzcG90SW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwic2hpcFNpemVzIiwieE51bSIsInlOdW0iLCJjdXJyZW50U2l6ZSIsInNoaWZ0Iiwib3JpZW50YXRpb25QaWNrIiwicmFuZG9tUGljayIsInN0YXJ0UG9pbnQiLCJjb25uZWN0ZWRDbGFzcyIsInVuc2hpZnQiLCJuZXdTaGlwIiwiY2hlY2tTaGlwVmFsaWRpdHkiLCJhbGxTaGlwcyIsImNsaWNrSGFuZGxlciIsInNoaXBMZW5ndGgiLCJzaGlwT3JpZW50YXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYmFja2dyb3VuZEFuaW1hdGlvbiIsImhpdENvdW50ZXIiLCJzdW5rIiwiaXNTdW5rIiwicmVhbFNpemUiXSwic291cmNlUm9vdCI6IiJ9