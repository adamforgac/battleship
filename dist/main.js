/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDom)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _ship_listener__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship-listener */ "./src/modules/ship-listener.js");



function boardPicker() {
  const contentField = document.querySelector('.content');
  const middleHeading = document.querySelector('.middle-heading');
  const inputElement = document.querySelector('.name-input');
  const mainArea = document.querySelector('main');
  const logoImage = document.querySelector('header img');
  const xyButton = document.createElement('button');
  const wrapper = document.querySelector('.wrapper');
  const startButton = document.querySelector('.start-button');
  const gridContainer = document.createElement('div');
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
  const playerGameBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
  playerGameBoard.showBoard('grid-container-picker');
  (0,_ship_listener__WEBPACK_IMPORTED_MODULE_2__["default"])('grid-container-picker', playerGameBoard);
}
function createDom() {
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
  checkOccupied(position) {
    console.log(this.occupiedCoordinates);
    return this.occupiedCoordinates.includes(position);
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
  placeShip(row, col, orientation, ship) {}
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




function shipListener(className, playerGameBoard) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  gameField.addEventListener('click', e => {
    const classes = e.target.classList;
    const position = classes[1];
    if (shipSizes.length === 0) {
      // calls function that generates the main game field
      return;
    }
    const shipLength = shipSizes.shift();
    const shipOrientation = document.querySelector('.axis-button').textContent;
    if ((0,_spotValidator__WEBPACK_IMPORTED_MODULE_1__["default"])(shipOrientation, shipLength, position) && checkOccupied(position, shipLength, shipOrientation, playerGameBoard)) {
      // creates image
      const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
      allShips.push(ship);
      console.log('true');
    } else {
      shipSizes.unshift(shipLength);
      console.log('false');
    }
  });
}
function checkOccupied(newPosition, length, orientation, playBoard) {
  const occupiedSpots = [];
  const axisParts = newPosition.split('-');
  const row = Number(axisParts[1]);
  const col = Number(axisParts[2]);
  if (!playBoard.checkOccupied(newPosition)) {
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
    console.log(occupiedSpots);
    return true;
  }
  return false;
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
  const realSize = length - 1;
  const axisParts = position.split('-');
  const row = Number(axisParts[1]);
  const col = Number(axisParts[2]);
  if (axis === 'AXIS: X') {
    console.log(row);
    console.log(col);
    console.log(col - realSize);
    if (col + realSize > 10 || col - realSize <= 0) {
      return false;
    }
    return true;
  }
  if (axis === 'AXIS: Y') {
    if (row + realSize > 10 || row - realSize <= 0) {
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

(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUIsR0FBRyxHQUFHK0IsUUFBUSxHQUFHLEVBQUUsSUFBTS9CLEdBQUcsR0FBRytCLFFBQVEsSUFBSSxDQUFFLEVBQUU7TUFDbEQsT0FBTyxLQUFLO0lBQ2Q7SUFDQSxPQUFPLElBQUk7RUFDYjtBQUNGOzs7Ozs7VUNuQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ05zQztBQUV0QzNELHdEQUFTLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9pbWFnZUNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC1saXN0ZW5lci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvc3BvdFZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGxheWVyIGZyb20gJy4vcGxheWVyJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHNoaXBMaXN0ZW5lciBmcm9tICcuL3NoaXAtbGlzdGVuZXInO1xuXG5mdW5jdGlvbiBib2FyZFBpY2tlcigpIHtcbiAgY29uc3QgY29udGVudEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcbiAgY29uc3QgbWlkZGxlSGVhZGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taWRkbGUtaGVhZGluZycpO1xuICBjb25zdCBpbnB1dEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZS1pbnB1dCcpO1xuICBjb25zdCBtYWluQXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgbG9nb0ltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyIGltZycpO1xuICBjb25zdCB4eUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtYnV0dG9uJyk7XG4gIGNvbnN0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZ3JpZENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdncmlkLWNvbnRhaW5lci1waWNrZXInKTtcblxuICBsb2dvSW1hZ2Uuc3R5bGUud2lkdGggPSAnMzAwcHgnO1xuICBtaWRkbGVIZWFkaW5nLnRleHRDb250ZW50ID0gYCR7cGxheWVyLm5hbWV9LCBQTEFDRSBZT1VSIFNISVBTYDtcbiAgbWlkZGxlSGVhZGluZy5zdHlsZS5tYXJnaW5Ub3AgPSAnNDBweCc7XG4gIHh5QnV0dG9uLnRleHRDb250ZW50ID0gJ0FYSVM6IFgnO1xuICBpbnB1dEVsZW1lbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoeHlCdXR0b24sIGlucHV0RWxlbWVudCk7XG4gIHh5QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2F4aXMtYnV0dG9uJyk7XG4gIHdyYXBwZXIuc3R5bGUuZ2FwID0gJzEwcHgnO1xuICBtYWluQXJlYS5yZW1vdmVDaGlsZChzdGFydEJ1dHRvbik7XG4gIG1haW5BcmVhLmFwcGVuZENoaWxkKGdyaWRDb250YWluZXIpO1xuXG4gIGNoZWNrQnV0dG9uKCk7XG5cbiAgY29uc3QgcGxheWVyR2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICBwbGF5ZXJHYW1lQm9hcmQuc2hvd0JvYXJkKCdncmlkLWNvbnRhaW5lci1waWNrZXInKTtcbiAgc2hpcExpc3RlbmVyKCdncmlkLWNvbnRhaW5lci1waWNrZXInLCBwbGF5ZXJHYW1lQm9hcmQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEb20oKSB7XG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpO1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZS1pbnB1dCcpO1xuICBjb25zdCBhbGVydFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtdGV4dCcpO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICBhbGVydFRleHQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVyLm5hbWUgPSBgJHtuYW1lSW5wdXQudmFsdWV9YDtcbiAgICAgIGFsZXJ0VGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgYm9hcmRQaWNrZXIoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0J1dHRvbigpIHtcbiAgY29uc3QgYXhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpO1xuXG4gIGF4aXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKGF4aXMudGV4dENvbnRlbnQgPT09ICdBWElTOiBYJykge1xuICAgICAgYXhpcy50ZXh0Q29udGVudCA9ICdBWElTOiBZJztcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpcy50ZXh0Q29udGVudCA9ICdBWElTOiBYJztcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vY2N1cGllZENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5ib21iZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuZW1wdHlDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHVwZGF0ZUNvb3JkaW5hdGVzKG9jY3VwaWVkSXRlbSkge1xuICAgIHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5wdXNoKG9jY3VwaWVkSXRlbSk7XG4gIH1cblxuICBjaGVja09jY3VwaWVkKHBvc2l0aW9uKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5vY2N1cGllZENvb3JkaW5hdGVzKTtcbiAgICByZXR1cm4gdGhpcy5vY2N1cGllZENvb3JkaW5hdGVzLmluY2x1ZGVzKHBvc2l0aW9uKTtcbiAgfVxuXG4gIHNob3dCb2FyZChjbGFzc05hbWUpIHtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICAgIGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuXG4gICAgICAgIGNvbnN0IHVuaXF1ZUNsYXNzTmFtZSA9IGBjZWxsLSR7aSArIDF9LSR7aiArIDF9YDtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcChyb3csIGNvbCwgb3JpZW50YXRpb24sIHNoaXApIHtcblxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuXG4gIH1cblxuICBzdW5rQWxsU2hpcHMoKSB7XG5cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlSW1hZ2Uob3JpZW50YXRpb24sIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgY29uc3QgZG9tU3BvdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3Bvc2l0aW9ufWApO1xuICBjb25zdCBpbWFnZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbn1cbiIsImNvbnN0IHBsYXllciA9IHtcbiAgbmFtZTogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IGNoZWNrU2hpcFZhbGlkaXR5IGZyb20gJy4vc3BvdFZhbGlkYXRvcic7XG5pbXBvcnQgY3JlYXRlSW1hZ2UgZnJvbSAnLi9pbWFnZUNyZWF0b3InO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBMaXN0ZW5lcihjbGFzc05hbWUsIHBsYXllckdhbWVCb2FyZCkge1xuICBjb25zdCBzaGlwU2l6ZXMgPSBbNSwgNCwgMywgMywgMl07XG4gIGNvbnN0IGFsbFNoaXBzID0gW107XG4gIGNvbnN0IGdhbWVGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcbiAgZ2FtZUZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCBjbGFzc2VzID0gZS50YXJnZXQuY2xhc3NMaXN0O1xuICAgIGNvbnN0IHBvc2l0aW9uID0gY2xhc3Nlc1sxXTtcblxuICAgIGlmIChzaGlwU2l6ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAvLyBjYWxscyBmdW5jdGlvbiB0aGF0IGdlbmVyYXRlcyB0aGUgbWFpbiBnYW1lIGZpZWxkXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwU2l6ZXMuc2hpZnQoKTtcbiAgICBjb25zdCBzaGlwT3JpZW50YXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXhpcy1idXR0b24nKS50ZXh0Q29udGVudDtcblxuICAgIGlmIChjaGVja1NoaXBWYWxpZGl0eShzaGlwT3JpZW50YXRpb24sIHNoaXBMZW5ndGgsIHBvc2l0aW9uKSAmJiBjaGVja09jY3VwaWVkKHBvc2l0aW9uLCBzaGlwTGVuZ3RoLCBzaGlwT3JpZW50YXRpb24sIHBsYXllckdhbWVCb2FyZCkpIHtcbiAgICAgIC8vIGNyZWF0ZXMgaW1hZ2VcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuZ3RoLCBzaGlwT3JpZW50YXRpb24sIHBvc2l0aW9uKTtcbiAgICAgIGFsbFNoaXBzLnB1c2goc2hpcCk7XG4gICAgICBjb25zb2xlLmxvZygndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGlwU2l6ZXMudW5zaGlmdChzaGlwTGVuZ3RoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdmYWxzZScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrT2NjdXBpZWQoXG4gIG5ld1Bvc2l0aW9uLFxuICBsZW5ndGgsXG4gIG9yaWVudGF0aW9uLFxuICBwbGF5Qm9hcmQsXG4pIHtcbiAgY29uc3Qgb2NjdXBpZWRTcG90cyA9IFtdO1xuICBjb25zdCBheGlzUGFydHMgPSBuZXdQb3NpdGlvbi5zcGxpdCgnLScpO1xuICBjb25zdCByb3cgPSBOdW1iZXIoYXhpc1BhcnRzWzFdKTtcbiAgY29uc3QgY29sID0gTnVtYmVyKGF4aXNQYXJ0c1syXSk7XG4gIGlmICghcGxheUJvYXJkLmNoZWNrT2NjdXBpZWQobmV3UG9zaXRpb24pKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnQVhJUzogWCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxheUJvYXJkLnVwZGF0ZUNvb3JkaW5hdGVzKGBjZWxsLSR7cm93fS0ke2NvbCArIGl9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcmllbnRhdGlvbiA9PT0gJ0FYSVM6IFknKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBsYXlCb2FyZC51cGRhdGVDb29yZGluYXRlcyhgY2VsbC0ke3JvdyArIGl9LSR7Y29sfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBsYXlCb2FyZC5jaGVja09jY3VwaWVkKClcbiAgICBjb25zb2xlLmxvZyhvY2N1cGllZFNwb3RzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBvcmllbnRhdGlvbiwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ZXIgPSAwO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudGVyKys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0Q291bnRlciA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTaGlwVmFsaWRpdHkoYXhpcywgbGVuZ3RoLCBwb3NpdGlvbikge1xuICBjb25zdCByZWFsU2l6ZSA9IGxlbmd0aCAtIDE7XG4gIGNvbnN0IGF4aXNQYXJ0cyA9IHBvc2l0aW9uLnNwbGl0KCctJyk7XG4gIGNvbnN0IHJvdyA9IE51bWJlcihheGlzUGFydHNbMV0pO1xuICBjb25zdCBjb2wgPSBOdW1iZXIoYXhpc1BhcnRzWzJdKTtcbiAgaWYgKGF4aXMgPT09ICdBWElTOiBYJykge1xuICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgY29uc29sZS5sb2coY29sKTtcbiAgICBjb25zb2xlLmxvZyhjb2wgLSByZWFsU2l6ZSk7XG4gICAgaWYgKChjb2wgKyByZWFsU2l6ZSA+IDEwKSB8fCAoY29sIC0gcmVhbFNpemUgPD0gMCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gaWYgKGF4aXMgPT09ICdBWElTOiBZJykge1xuICAgIGlmICgocm93ICsgcmVhbFNpemUgPiAxMCkgfHwgKHJvdyAtIHJlYWxTaXplIDw9IDApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBjcmVhdGVEb20gZnJvbSAnLi9tb2R1bGVzL2RvbSc7XG5cbmNyZWF0ZURvbSgpO1xuIl0sIm5hbWVzIjpbInBsYXllciIsIkdhbWVib2FyZCIsInNoaXBMaXN0ZW5lciIsImJvYXJkUGlja2VyIiwiY29udGVudEZpZWxkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWlkZGxlSGVhZGluZyIsImlucHV0RWxlbWVudCIsIm1haW5BcmVhIiwibG9nb0ltYWdlIiwieHlCdXR0b24iLCJjcmVhdGVFbGVtZW50Iiwid3JhcHBlciIsInN0YXJ0QnV0dG9uIiwiZ3JpZENvbnRhaW5lciIsImNsYXNzTGlzdCIsImFkZCIsInN0eWxlIiwid2lkdGgiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJtYXJnaW5Ub3AiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwiZ2FwIiwicmVtb3ZlQ2hpbGQiLCJhcHBlbmRDaGlsZCIsImNoZWNrQnV0dG9uIiwicGxheWVyR2FtZUJvYXJkIiwic2hvd0JvYXJkIiwiY3JlYXRlRG9tIiwibmFtZUlucHV0IiwiYWxlcnRUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwiY29sb3IiLCJkaXNwbGF5IiwiYXhpcyIsIlNoaXAiLCJjb25zdHJ1Y3RvciIsIm9jY3VwaWVkQ29vcmRpbmF0ZXMiLCJib21iZWRDb29yZGluYXRlcyIsImVtcHR5Q29vcmRpbmF0ZXMiLCJzaGlwcyIsInVwZGF0ZUNvb3JkaW5hdGVzIiwib2NjdXBpZWRJdGVtIiwicHVzaCIsImNoZWNrT2NjdXBpZWQiLCJwb3NpdGlvbiIsImNvbnNvbGUiLCJsb2ciLCJpbmNsdWRlcyIsImNsYXNzTmFtZSIsImkiLCJqIiwiZ3JpZENlbGwiLCJ1bmlxdWVDbGFzc05hbWUiLCJwbGFjZVNoaXAiLCJyb3ciLCJjb2wiLCJvcmllbnRhdGlvbiIsInNoaXAiLCJyZWNlaXZlQXR0YWNrIiwic3Vua0FsbFNoaXBzIiwiY3JlYXRlSW1hZ2UiLCJsZW5ndGgiLCJkb21TcG90IiwiaW1hZ2VFbGVtZW50IiwiY2hlY2tTaGlwVmFsaWRpdHkiLCJzaGlwU2l6ZXMiLCJhbGxTaGlwcyIsImdhbWVGaWVsZCIsImUiLCJjbGFzc2VzIiwidGFyZ2V0Iiwic2hpcExlbmd0aCIsInNoaWZ0Iiwic2hpcE9yaWVudGF0aW9uIiwidW5zaGlmdCIsIm5ld1Bvc2l0aW9uIiwicGxheUJvYXJkIiwib2NjdXBpZWRTcG90cyIsImF4aXNQYXJ0cyIsInNwbGl0IiwiTnVtYmVyIiwiaGl0Q291bnRlciIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJyZWFsU2l6ZSJdLCJzb3VyY2VSb290IjoiIn0=