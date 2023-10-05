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
          return true; // returns true if one of the coordination is occupied
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
  placeShip(ship) {
    this.ships.push(ship);
  }
  showShips() {
    console.log(this.ships);
    console.log(this.occupiedCoordinates);
  }
  showCurrentSize() {
    const infoArr = [this.ships[this.ships.length - 1], this.ships[this.ships.length - 2]];
    return infoArr;
  }
  receiveAttack(row, col) {}
  sunkAllShips() {}
}

/***/ }),

/***/ "./src/modules/imageCreator.js":
/*!*************************************!*\
  !*** ./src/modules/imageCreator.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createImage)
/* harmony export */ });
function createImage(orientation, length, position) {
  const domSpot = document.querySelector(`.${position}`);
  const imageElement = document.createElement('img');
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
  name: ''
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
      console.log("worked");
      xNum = startPoint;
      yNum = randomPick;
    }
    const connectedClass = `cell-${xNum}-${yNum}`;
    console.log(connectedClass);
    if (!(0,_availabilityValidator__WEBPACK_IMPORTED_MODULE_0__["default"])(connectedClass, currentSize, orientationPick, botGameBoard)) {
      shipSizes.unshift(currentSize);
    } else {
      const newShip = new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](currentSize, orientationPick, connectedClass);
      botGameBoard.placeShip(newShip);
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
/* harmony import */ var _imageCreator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imageCreator */ "./src/modules/imageCreator.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _availabilityValidator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./availabilityValidator */ "./src/modules/availabilityValidator.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* eslint-disable no-useless-return */






function shipListener(className, playerGameBoard) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  (0,_dom__WEBPACK_IMPORTED_MODULE_5__.hoverColors)('AXIS: X', 5);

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
    (0,_dom__WEBPACK_IMPORTED_MODULE_5__.hoverColors)(shipOrientation, shipLength);
    if ((0,_spotValidator__WEBPACK_IMPORTED_MODULE_1__["default"])(shipOrientation, shipLength, position) && (0,_availabilityValidator__WEBPACK_IMPORTED_MODULE_4__["default"])(position, shipLength, shipOrientation, playerGameBoard)) {
      // creates image
      console.log('completed');
      const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
      playerGameBoard.placeShip(ship);
      if (shipSizes.length === 0) {
        // Remove the event listener when the condition is fulfilled
        gameField.removeEventListener('click', clickHandler);
        (0,_dom__WEBPACK_IMPORTED_MODULE_5__.createMainGameField)(playerGameBoard);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7SUFDaEJzRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ3JFLEdBQUcsQ0FBQztJQUNoQm9FLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDckUsR0FBRyxHQUFHZ0ksUUFBUSxDQUFDO0lBQzNCLElBQUtoSSxHQUFHLEdBQUdnSSxRQUFRLEdBQUcsRUFBRSxFQUFHO01BQ3pCLE9BQU8sS0FBSztJQUNkO0lBQ0EsT0FBTyxJQUFJO0VBQ2I7RUFBRSxJQUFJcEcsSUFBSSxLQUFLLFNBQVMsRUFBRTtJQUN4QixJQUFLOUIsR0FBRyxHQUFHa0ksUUFBUSxHQUFHLEVBQUUsRUFBRztNQUN6QixPQUFPLEtBQUs7SUFDZDtJQUNBLE9BQU8sSUFBSTtFQUNiO0FBQ0Y7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9EO0FBRXBEN0UsaUVBQW1CLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2F2YWlsYWJpbGl0eVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ltYWdlQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9yYW5kb21GaWVsZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc3BvdFZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja1N0YXR1cyhcbiAgbmV3UG9zaXRpb24sXG4gIGxlbmd0aCxcbiAgb3JpZW50YXRpb24sXG4gIHBsYXlCb2FyZCxcbikge1xuICBjb25zdCBheGlzUGFydHMgPSBuZXdQb3NpdGlvbi5zcGxpdCgnLScpO1xuICBjb25zdCByb3cgPSBOdW1iZXIoYXhpc1BhcnRzWzFdKTtcbiAgY29uc3QgY29sID0gTnVtYmVyKGF4aXNQYXJ0c1syXSk7XG4gIGlmICghcGxheUJvYXJkLmNoZWNrT2NjdXBpZWQocm93LCBjb2wsIG9yaWVudGF0aW9uLCBsZW5ndGgpKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxheUJvYXJkLnVwZGF0ZUNvb3JkaW5hdGVzKGBjZWxsLSR7cm93fS0ke2NvbCArIGl9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFknKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYXlCb2FyZC51cGRhdGVDb29yZGluYXRlcyhgY2VsbC0ke3JvdyArIGl9LSR7Y29sfWApO1xuICAgICAgfVxuICAgIH1cbiAgICBwbGF5Qm9hcmQuY2hlY2tPY2N1cGllZCgpO1xuICAgIHJldHVybiB0cnVlOyAvLyB2csOhdMOtIHRydWUsIGtkecW+IGplIHRvIHYgcG/FmcOhZGt1XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJpbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHNoaXBMaXN0ZW5lciBmcm9tICcuL3NoaXAtbGlzdGVuZXInO1xuaW1wb3J0IGNyZWF0ZVJhbmRvbUZpZWxkIGZyb20gJy4vcmFuZG9tRmllbGQnO1xuXG5jb25zdCBjb250ZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuY29uc3QgbWlkZGxlSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWRkbGUtaGVhZGluZycpO1xuY29uc3QgaW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcbmNvbnN0IG1haW5BcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgbG9nb0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIGltZycpO1xuY29uc3QgeHlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbmNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtYnV0dG9uJyk7XG5jb25zdCBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBsZWZ0U2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuY29uc3QgcmlnaHRTaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5jb25zdCBwbGF5ZXJIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbmNvbnN0IGJvdEhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuY29uc3QgcGxheWVyRmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IGJvdEZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5sZXQgcGxheWVyR2FtZUJvYXJkO1xuXG5mdW5jdGlvbiBjaGVja0J1dHRvbigpIHtcbiAgY29uc3QgYXhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpO1xuICBheGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChheGlzLnRleHRDb250ZW50ID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGF4aXMudGV4dENvbnRlbnQgPSAnQVhJUzogWSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF4aXMudGV4dENvbnRlbnQgPSAnQVhJUzogWCc7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYm9hcmRQaWNrZXIoKSB7XG4gIGdyaWRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jb250YWluZXItcGlja2VyJyk7XG5cbiAgbG9nb0ltYWdlLnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgbWlkZGxlSGVhZGluZy50ZXh0Q29udGVudCA9IGAke3BsYXllci5uYW1lfSwgUExBQ0UgWU9VUiBTSElQU2A7XG4gIG1pZGRsZUhlYWRpbmcuc3R5bGUubWFyZ2luVG9wID0gJzQwcHgnO1xuICB4eUJ1dHRvbi50ZXh0Q29udGVudCA9ICdBWElTOiBYJztcbiAgaW5wdXRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHh5QnV0dG9uLCBpbnB1dEVsZW1lbnQpO1xuICB4eUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdheGlzLWJ1dHRvbicpO1xuICB3cmFwcGVyLnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgbWFpbkFyZWEucmVtb3ZlQ2hpbGQoc3RhcnRCdXR0b24pO1xuICBtYWluQXJlYS5hcHBlbmRDaGlsZChncmlkQ29udGFpbmVyKTtcblxuICBjaGVja0J1dHRvbigpO1xuXG4gIHBsYXllckdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgcGxheWVyR2FtZUJvYXJkLnNob3dCb2FyZCgnZ3JpZC1jb250YWluZXItcGlja2VyJyk7XG4gIHNoaXBMaXN0ZW5lcignZ3JpZC1jb250YWluZXItcGlja2VyJywgcGxheWVyR2FtZUJvYXJkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1haW5HYW1lRmllbGQocGxheWVyR2FtZUJvYXJkKSB7XG4gIG1pZGRsZUhlYWRpbmcucmVtb3ZlKCk7XG4gIHh5QnV0dG9uLnJlbW92ZSgpO1xuICBncmlkQ29udGFpbmVyLnJlbW92ZSgpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtdGV4dCcpLnJlbW92ZSgpO1xuICBtYWluQXJlYS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICBtYWluQXJlYS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdzcGFjZUFyb3VuZCc7XG4gIG1haW5BcmVhLnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgcGxheWVyRmllbGQuY2xhc3NMaXN0LmFkZCgncGxheWVyLWZpZWxkJyk7XG4gIGJvdEZpZWxkLmNsYXNzTGlzdC5hZGQoJ2JvdC1maWVsZCcpO1xuICBsZWZ0U2lkZS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItaGFsZicpO1xuICByaWdodFNpZGUuY2xhc3NMaXN0LmFkZCgnYm90LWhhbGYnKTtcbiAgcGxheWVySGVhZGluZy5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItaGVhZGluZycpO1xuICBib3RIZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2JvdC1oZWFkaW5nJyk7XG4gIHBsYXllckhlYWRpbmcudGV4dENvbnRlbnQgPSAnRlJJRUROTFkgV0FURVJTJztcbiAgYm90SGVhZGluZy50ZXh0Q29udGVudCA9ICdFTkVNWSBXQVRFUlMnO1xuICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChwbGF5ZXJIZWFkaW5nKTtcbiAgcmlnaHRTaWRlLmFwcGVuZENoaWxkKGJvdEhlYWRpbmcpO1xuICBsZWZ0U2lkZS5hcHBlbmRDaGlsZChwbGF5ZXJGaWVsZCk7XG4gIHJpZ2h0U2lkZS5hcHBlbmRDaGlsZChib3RGaWVsZCk7XG4gIG1haW5BcmVhLmFwcGVuZENoaWxkKGxlZnRTaWRlKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQocmlnaHRTaWRlKTtcbiAgcGxheWVyR2FtZUJvYXJkLnNob3dCb2FyZCgncGxheWVyLWZpZWxkJyk7XG4gIHBsYXllckdhbWVCb2FyZC5zaG93U2hpcHMoKTtcbiAgY29uc3QgYm90R2FtZUJvYXJkID0gY3JlYXRlUmFuZG9tRmllbGQoKTtcbiAgYm90R2FtZUJvYXJkLnNob3dCb2FyZCgnYm90LWZpZWxkJyk7XG4gIGJvdEdhbWVCb2FyZC5zaG93U2hpcHMoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdlbGNvbWVTY3JlZW4oKSB7XG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpO1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZS1pbnB1dCcpO1xuICBjb25zdCBhbGVydFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtdGV4dCcpO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICBhbGVydFRleHQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVyLm5hbWUgPSBgJHtuYW1lSW5wdXQudmFsdWV9YDtcbiAgICAgIGFsZXJ0VGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgYm9hcmRQaWNrZXIoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaG92ZXJDb2xvcnMob3JpZW50YXRpb24sIGxlbmd0aCkge1xuICBsZXQgYWN0aXZlTnVtYmVyID0gbGVuZ3RoO1xuICBjb25zdCBncmlkQ2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ3JpZC1jZWxsJyk7XG4gIGNvbnN0IG9yaWVudGF0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJyk7XG5cbiAgZ3JpZENlbGxzLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKG9yaWVudGF0aW9uQnV0dG9uLnRleHRDb250ZW50ID09PSAnQVhJUzogWCcpIHtcbiAgICAgICAgb3JpZW50YXRpb24gPSAnQVhJUzogWCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcmllbnRhdGlvbiA9ICdBWElTOiBZJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmVlZGVkQ29vcmRpbmF0ZXMgPSBbXTtcblxuICAgICAgaWYgKHBsYXllckdhbWVCb2FyZC5zaG93Q3VycmVudFNpemUoKVswXSkge1xuICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IHBsYXllckdhbWVCb2FyZC5zaG93Q3VycmVudFNpemUoKVswXS5sZW5ndGg7XG4gICAgICAgIGxldCBwcmV2aW91c0xlbmd0aDtcblxuICAgICAgICBpZiAocGxheWVyR2FtZUJvYXJkLnNob3dDdXJyZW50U2l6ZSgpWzFdKSB7XG4gICAgICAgICAgcHJldmlvdXNMZW5ndGggPSBwbGF5ZXJHYW1lQm9hcmQuc2hvd0N1cnJlbnRTaXplKClbMV0ubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnJlbnRMZW5ndGggPT09IDMgJiYgcHJldmlvdXNMZW5ndGggIT09IDMpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9uMScpO1xuICAgICAgICAgIGFjdGl2ZU51bWJlciA9IDM7XG4gICAgICAgICAgY3VycmVudExlbmd0aCAtPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRMZW5ndGggPT09IDQpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnb3B0aW9uMicpO1xuICAgICAgICAgIGFjdGl2ZU51bWJlciA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5sb2coY3VycmVudExlbmd0aCk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ29wdGlvbjMnKTtcbiAgICAgICAgICBhY3RpdmVOdW1iZXIgPSBjdXJyZW50TGVuZ3RoIC0gMTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbGxDbGFzc0xpc3QgPSBjZWxsLmNsYXNzTGlzdDtcbiAgICAgIGNvbnN0IFssIHJvdywgY29sXSA9IGNlbGxDbGFzc0xpc3RbMV0uc3BsaXQoJy0nKS5tYXAoTnVtYmVyKTtcblxuICAgICAgY29uc3QgbWF4Q2VsbHNJblJvdyA9IDEwIC0gcm93ICsgMTtcbiAgICAgIGNvbnN0IG1heENlbGxzSW5Db2wgPSAxMCAtIGNvbCArIDE7XG5cbiAgICAgIGlmIChhY3RpdmVOdW1iZXIgPiBtYXhDZWxsc0luUm93ICYmIG9yaWVudGF0aW9uID09PSAnQVhJUzogWScpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkLXJlZCcpO1xuICAgICAgfSBlbHNlIGlmIChhY3RpdmVOdW1iZXIgPiBtYXhDZWxsc0luQ29sICYmIG9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkLXJlZCcpO1xuICAgICAgfSBlbHNlIGlmIChwbGF5ZXJHYW1lQm9hcmQuY2hlY2tPY2N1cGllZChyb3csIGNvbCwgb3JpZW50YXRpb24sIGFjdGl2ZU51bWJlcikpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkLXJlZCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhY3RpdmVOdW1iZXI7IGkrKykge1xuICAgICAgICAgIGNvbnN0IG5leHRSb3dDZWxsID0gZ3JpZENlbGxzW2luZGV4ICsgaV07XG4gICAgICAgICAgY29uc3QgbmV4dENvbENlbGwgPSBncmlkQ2VsbHNbaW5kZXggKyBpICogMTBdO1xuICAgICAgICAgIGlmIChuZXh0Um93Q2VsbCAmJiBvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICAgICAgICBuZXh0Um93Q2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuZXh0Q29sQ2VsbCAmJiBvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFknKSB7XG4gICAgICAgICAgICBuZXh0Q29sQ2VsbC5jbGFzc0xpc3QuYWRkKCdob3ZlcmVkJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBncmlkQ2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2hvdmVyZWQnLCAnaG92ZXJlZC1yZWQnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2NjdXBpZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuYm9tYmVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLmVtcHR5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICB1cGRhdGVDb29yZGluYXRlcyhvY2N1cGllZEl0ZW0pIHtcbiAgICB0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMucHVzaChvY2N1cGllZEl0ZW0pO1xuICB9XG5cbiAgY2hlY2tPY2N1cGllZChyb3csIGNvbCwgb3JpZW50YXRpb24sIGxlbmd0aCkge1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNwb3QgPSBgY2VsbC0ke3Jvd30tJHtjb2wgKyBpfWA7XG4gICAgICAgIGNvbnNvbGUubG9nKHNwb3QpO1xuICAgICAgICBpZiAodGhpcy5vY2N1cGllZENvb3JkaW5hdGVzLmluY2x1ZGVzKHNwb3QpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7IC8vIHJldHVybnMgdHJ1ZSBpZiBvbmUgb2YgdGhlIGNvb3JkaW5hdGlvbiBpcyBvY2N1cGllZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3BvdCA9IGBjZWxsLSR7cm93ICsgaX0tJHtjb2x9YDtcbiAgICAgICAgY29uc29sZS5sb2coc3BvdCk7XG4gICAgICAgIGlmICh0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMuaW5jbHVkZXMoc3BvdCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHRoaXMub2NjdXBpZWRDb29yZGluYXRlcyk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzaG93Qm9hcmQoY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcpO1xuICAgICAgICBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcblxuICAgICAgICBjb25zdCB1bmlxdWVDbGFzc05hbWUgPSBgY2VsbC0ke2kgKyAxfS0ke2ogKyAxfWA7XG4gICAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoc2hpcCkge1xuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgfVxuXG4gIHNob3dTaGlwcygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNoaXBzKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMpO1xuICB9XG5cbiAgc2hvd0N1cnJlbnRTaXplKCkge1xuICAgIGNvbnN0IGluZm9BcnIgPSBbdGhpcy5zaGlwc1t0aGlzLnNoaXBzLmxlbmd0aCAtIDFdLCB0aGlzLnNoaXBzW3RoaXMuc2hpcHMubGVuZ3RoIC0gMl1dO1xuICAgIHJldHVybiBpbmZvQXJyO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuXG4gIH1cblxuICBzdW5rQWxsU2hpcHMoKSB7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSW1hZ2Uob3JpZW50YXRpb24sIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgY29uc3QgZG9tU3BvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3Bvc2l0aW9ufWApO1xuICBjb25zdCBpbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbn1cbiIsImNvbnN0IHBsYXllciA9IHtcbiAgbmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7XG4iLCJpbXBvcnQgY2hlY2tTdGF0dXMgZnJvbSAnLi9hdmFpbGFiaWxpdHlWYWxpZGF0b3InO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVSYW5kb21GaWVsZCgpIHtcbiAgY29uc3QgYm90R2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICBjb25zdCBzaGlwU2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG4gIGNvbnN0IG9yaWVudGF0aW9uID0gWydBWElTOiBYJywgJ0FYSVM6IFknXTtcblxuICB3aGlsZSAoc2hpcFNpemVzLmxlbmd0aCA+IDApIHtcbiAgICBsZXQgeE51bTtcbiAgICBsZXQgeU51bTtcbiAgICBjb25zdCBjdXJyZW50U2l6ZSA9IHNoaXBTaXplcy5zaGlmdCgpO1xuICAgIGNvbnN0IG9yaWVudGF0aW9uUGljayA9IG9yaWVudGF0aW9uW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSldO1xuICAgIGNvbnN0IHJhbmRvbVBpY2sgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIGNvbnN0IHN0YXJ0UG9pbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAgLSBjdXJyZW50U2l6ZSkpICsgMTtcbiAgICBpZiAob3JpZW50YXRpb25QaWNrID09PSAnQVhJUzogWCcpIHtcbiAgICAgIHhOdW0gPSByYW5kb21QaWNrO1xuICAgICAgeU51bSA9IHN0YXJ0UG9pbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwid29ya2VkXCIpO1xuICAgICAgeE51bSA9IHN0YXJ0UG9pbnQ7XG4gICAgICB5TnVtID0gcmFuZG9tUGljaztcbiAgICB9XG4gICAgY29uc3QgY29ubmVjdGVkQ2xhc3MgPSBgY2VsbC0ke3hOdW19LSR7eU51bX1gO1xuICAgIGNvbnNvbGUubG9nKGNvbm5lY3RlZENsYXNzKTtcblxuICAgIGlmICghY2hlY2tTdGF0dXMoY29ubmVjdGVkQ2xhc3MsIGN1cnJlbnRTaXplLCBvcmllbnRhdGlvblBpY2ssIGJvdEdhbWVCb2FyZCkpIHtcbiAgICAgIHNoaXBTaXplcy51bnNoaWZ0KGN1cnJlbnRTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3U2hpcCA9IG5ldyBTaGlwKGN1cnJlbnRTaXplLCBvcmllbnRhdGlvblBpY2ssIGNvbm5lY3RlZENsYXNzKTtcbiAgICAgIGJvdEdhbWVCb2FyZC5wbGFjZVNoaXAobmV3U2hpcCk7XG4gICAgfVxuICB9XG5cbiAgYm90R2FtZUJvYXJkLnNob3dTaGlwcygpO1xuICByZXR1cm4gYm90R2FtZUJvYXJkO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlbGVzcy1yZXR1cm4gKi9cbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgY2hlY2tTaGlwVmFsaWRpdHkgZnJvbSAnLi9zcG90VmFsaWRhdG9yJztcbmltcG9ydCBjcmVhdGVJbWFnZSBmcm9tICcuL2ltYWdlQ3JlYXRvcic7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCBjaGVja1N0YXR1cyBmcm9tICcuL2F2YWlsYWJpbGl0eVZhbGlkYXRvcic7XG5pbXBvcnQgeyBjcmVhdGVNYWluR2FtZUZpZWxkLCBob3ZlckNvbG9ycyB9IGZyb20gJy4vZG9tJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpcExpc3RlbmVyKGNsYXNzTmFtZSwgcGxheWVyR2FtZUJvYXJkKSB7XG4gIGNvbnN0IHNoaXBTaXplcyA9IFs1LCA0LCAzLCAzLCAyXTtcbiAgY29uc3QgYWxsU2hpcHMgPSBbXTtcbiAgY29uc3QgZ2FtZUZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xuICBob3ZlckNvbG9ycygnQVhJUzogWCcsIDUpO1xuXG4gIC8vIERlZmluZSB0aGUgZXZlbnQgbGlzdGVuZXIgZnVuY3Rpb25cbiAgZnVuY3Rpb24gY2xpY2tIYW5kbGVyKGUpIHtcbiAgICBjb25zdCBjbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IHBvc2l0aW9uID0gY2xhc3Nlc1sxXTtcblxuICAgIGlmIChjbGFzc2VzLmxlbmd0aCA8IDMpIHtcbiAgICAgIC8vIGRvZXMgbm90IGNvdW50IGlmIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgZ2FwXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcExlbmd0aCA9IHNoaXBTaXplcy5zaGlmdCgpO1xuXG4gICAgY29uc3Qgc2hpcE9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJykudGV4dENvbnRlbnQ7XG5cbiAgICBob3ZlckNvbG9ycyhzaGlwT3JpZW50YXRpb24sIHNoaXBMZW5ndGgpO1xuXG4gICAgaWYgKGNoZWNrU2hpcFZhbGlkaXR5KHNoaXBPcmllbnRhdGlvbiwgc2hpcExlbmd0aCwgcG9zaXRpb24pICYmIGNoZWNrU3RhdHVzKHBvc2l0aW9uLCBzaGlwTGVuZ3RoLCBzaGlwT3JpZW50YXRpb24sIHBsYXllckdhbWVCb2FyZCkpIHtcbiAgICAgIC8vIGNyZWF0ZXMgaW1hZ2VcbiAgICAgIGNvbnNvbGUubG9nKCdjb21wbGV0ZWQnKTtcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuZ3RoLCBzaGlwT3JpZW50YXRpb24sIHBvc2l0aW9uKTtcbiAgICAgIHBsYXllckdhbWVCb2FyZC5wbGFjZVNoaXAoc2hpcCk7XG4gICAgICBpZiAoc2hpcFNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyIHdoZW4gdGhlIGNvbmRpdGlvbiBpcyBmdWxmaWxsZWRcbiAgICAgICAgZ2FtZUZpZWxkLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tIYW5kbGVyKTtcbiAgICAgICAgY3JlYXRlTWFpbkdhbWVGaWVsZChwbGF5ZXJHYW1lQm9hcmQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhzaGlwU2l6ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnb2NjdXBpZWQnKTtcbiAgICAgIHNoaXBTaXplcy51bnNoaWZ0KHNoaXBMZW5ndGgpO1xuICAgICAgY29uc29sZS5sb2coc2hpcFNpemVzKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIGV2ZW50IGxpc3RlbmVyXG4gIGdhbWVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrSGFuZGxlcik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBvcmllbnRhdGlvbiwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ZXIgPSAwO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudGVyKys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0Q291bnRlciA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTaGlwVmFsaWRpdHkoYXhpcywgbGVuZ3RoLCBwb3NpdGlvbikge1xuICBjb25zb2xlLmxvZyhwb3NpdGlvbik7XG4gIGNvbnN0IHJlYWxTaXplID0gbGVuZ3RoIC0gMTtcbiAgY29uc3QgYXhpc1BhcnRzID0gcG9zaXRpb24uc3BsaXQoJy0nKTtcbiAgY29uc3Qgcm93ID0gTnVtYmVyKGF4aXNQYXJ0c1sxXSk7XG4gIGNvbnN0IGNvbCA9IE51bWJlcihheGlzUGFydHNbMl0pO1xuICBpZiAoYXhpcyA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgY29uc29sZS5sb2cocm93KTtcbiAgICBjb25zb2xlLmxvZyhjb2wpO1xuICAgIGNvbnNvbGUubG9nKGNvbCAtIHJlYWxTaXplKTtcbiAgICBpZiAoKGNvbCArIHJlYWxTaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9IGlmIChheGlzID09PSAnQVhJUzogWScpIHtcbiAgICBpZiAoKHJvdyArIHJlYWxTaXplID4gMTApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVdlbGNvbWVTY3JlZW4gfSBmcm9tICcuL21vZHVsZXMvZG9tJztcblxuY3JlYXRlV2VsY29tZVNjcmVlbigpO1xuIl0sIm5hbWVzIjpbImNoZWNrU3RhdHVzIiwibmV3UG9zaXRpb24iLCJsZW5ndGgiLCJvcmllbnRhdGlvbiIsInBsYXlCb2FyZCIsImF4aXNQYXJ0cyIsInNwbGl0Iiwicm93IiwiTnVtYmVyIiwiY29sIiwiY2hlY2tPY2N1cGllZCIsImkiLCJ1cGRhdGVDb29yZGluYXRlcyIsInBsYXllciIsIkdhbWVib2FyZCIsInNoaXBMaXN0ZW5lciIsImNyZWF0ZVJhbmRvbUZpZWxkIiwiY29udGVudEZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWlkZGxlSGVhZGluZyIsImlucHV0RWxlbWVudCIsIm1haW5BcmVhIiwibG9nb0ltYWdlIiwieHlCdXR0b24iLCJjcmVhdGVFbGVtZW50Iiwid3JhcHBlciIsInN0YXJ0QnV0dG9uIiwiZ3JpZENvbnRhaW5lciIsImxlZnRTaWRlIiwicmlnaHRTaWRlIiwicGxheWVySGVhZGluZyIsImJvdEhlYWRpbmciLCJwbGF5ZXJGaWVsZCIsImJvdEZpZWxkIiwicGxheWVyR2FtZUJvYXJkIiwiY2hlY2tCdXR0b24iLCJheGlzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRleHRDb250ZW50IiwiYm9hcmRQaWNrZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsIndpZHRoIiwibmFtZSIsIm1hcmdpblRvcCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJnYXAiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwic2hvd0JvYXJkIiwiY3JlYXRlTWFpbkdhbWVGaWVsZCIsInJlbW92ZSIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJzaG93U2hpcHMiLCJib3RHYW1lQm9hcmQiLCJjcmVhdGVXZWxjb21lU2NyZWVuIiwibmFtZUlucHV0IiwiYWxlcnRUZXh0IiwidmFsdWUiLCJjb2xvciIsImhvdmVyQ29sb3JzIiwiYWN0aXZlTnVtYmVyIiwiZ3JpZENlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIm9yaWVudGF0aW9uQnV0dG9uIiwiZm9yRWFjaCIsImNlbGwiLCJpbmRleCIsIm5lZWRlZENvb3JkaW5hdGVzIiwic2hvd0N1cnJlbnRTaXplIiwiY3VycmVudExlbmd0aCIsInByZXZpb3VzTGVuZ3RoIiwiY29uc29sZSIsImxvZyIsImNlbGxDbGFzc0xpc3QiLCJtYXAiLCJtYXhDZWxsc0luUm93IiwibWF4Q2VsbHNJbkNvbCIsIm5leHRSb3dDZWxsIiwibmV4dENvbENlbGwiLCJTaGlwIiwiY29uc3RydWN0b3IiLCJvY2N1cGllZENvb3JkaW5hdGVzIiwiYm9tYmVkQ29vcmRpbmF0ZXMiLCJlbXB0eUNvb3JkaW5hdGVzIiwic2hpcHMiLCJvY2N1cGllZEl0ZW0iLCJwdXNoIiwic3BvdCIsImluY2x1ZGVzIiwiY2xhc3NOYW1lIiwiaiIsImdyaWRDZWxsIiwidW5pcXVlQ2xhc3NOYW1lIiwicGxhY2VTaGlwIiwic2hpcCIsImluZm9BcnIiLCJyZWNlaXZlQXR0YWNrIiwic3Vua0FsbFNoaXBzIiwiY3JlYXRlSW1hZ2UiLCJwb3NpdGlvbiIsImRvbVNwb3QiLCJpbWFnZUVsZW1lbnQiLCJzaGlwU2l6ZXMiLCJ4TnVtIiwieU51bSIsImN1cnJlbnRTaXplIiwic2hpZnQiLCJvcmllbnRhdGlvblBpY2siLCJNYXRoIiwicm91bmQiLCJyYW5kb20iLCJyYW5kb21QaWNrIiwiZmxvb3IiLCJzdGFydFBvaW50IiwiY29ubmVjdGVkQ2xhc3MiLCJ1bnNoaWZ0IiwibmV3U2hpcCIsImNoZWNrU2hpcFZhbGlkaXR5IiwiYWxsU2hpcHMiLCJnYW1lRmllbGQiLCJjbGlja0hhbmRsZXIiLCJlIiwiY2xhc3NlcyIsInRhcmdldCIsInNoaXBMZW5ndGgiLCJzaGlwT3JpZW50YXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGl0Q291bnRlciIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJyZWFsU2l6ZSJdLCJzb3VyY2VSb290IjoiIn0=