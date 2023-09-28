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
  checkOccupied(row, col, orientation, length) {
    if (orientation === 'AXIS: X') {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row}-${col + i}`;
        console.log(spot);
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
      return false;
    }
    for (let i = 0; i < length; i++) {
      const spot = `cell-${row + i}-${col}`;
      console.log(spot);
      if (this.occupiedCoordinates.includes(spot)) {
        return true;
      }
    }
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
    if ((0,_spotValidator__WEBPACK_IMPORTED_MODULE_1__["default"])(shipOrientation, shipLength, position) && checkStatus(position, shipLength, shipOrientation, playerGameBoard)) {
      // creates image
      const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
      allShips.push(ship);
      console.log(allShips);
    } else {
      shipSizes.unshift(shipLength);
    }
  });
}
function checkStatus(newPosition, length, orientation, playBoard) {
  console.log('works');
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

(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE4QjtBQUNNO0FBQ087QUFFM0MsU0FBU0csV0FBV0EsQ0FBQSxFQUFHO0VBQ3JCLE1BQU1DLFlBQVksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsVUFBVSxDQUFDO0VBQ3ZELE1BQU1DLGFBQWEsR0FBR0YsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUM7RUFDL0QsTUFBTUUsWUFBWSxHQUFHSCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDMUQsTUFBTUcsUUFBUSxHQUFHSixRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7RUFDL0MsTUFBTUksU0FBUyxHQUFHTCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxZQUFZLENBQUM7RUFDdEQsTUFBTUssUUFBUSxHQUFHTixRQUFRLENBQUNPLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDakQsTUFBTUMsT0FBTyxHQUFHUixRQUFRLENBQUNDLGFBQWEsQ0FBQyxVQUFVLENBQUM7RUFDbEQsTUFBTVEsV0FBVyxHQUFHVCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDM0QsTUFBTVMsYUFBYSxHQUFHVixRQUFRLENBQUNPLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDbkRHLGFBQWEsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7RUFFcERQLFNBQVMsQ0FBQ1EsS0FBSyxDQUFDQyxLQUFLLEdBQUcsT0FBTztFQUMvQlosYUFBYSxDQUFDYSxXQUFXLEdBQUksR0FBRXBCLCtDQUFNLENBQUNxQixJQUFLLG9CQUFtQjtFQUM5RGQsYUFBYSxDQUFDVyxLQUFLLENBQUNJLFNBQVMsR0FBRyxNQUFNO0VBQ3RDWCxRQUFRLENBQUNTLFdBQVcsR0FBRyxTQUFTO0VBQ2hDWixZQUFZLENBQUNlLFVBQVUsQ0FBQ0MsWUFBWSxDQUFDYixRQUFRLEVBQUVILFlBQVksQ0FBQztFQUM1REcsUUFBUSxDQUFDSyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7RUFDckNKLE9BQU8sQ0FBQ0ssS0FBSyxDQUFDTyxHQUFHLEdBQUcsTUFBTTtFQUMxQmhCLFFBQVEsQ0FBQ2lCLFdBQVcsQ0FBQ1osV0FBVyxDQUFDO0VBQ2pDTCxRQUFRLENBQUNrQixXQUFXLENBQUNaLGFBQWEsQ0FBQztFQUVuQ2EsV0FBVyxDQUFDLENBQUM7RUFFYixNQUFNQyxlQUFlLEdBQUcsSUFBSTVCLGtEQUFTLENBQUMsQ0FBQztFQUN2QzRCLGVBQWUsQ0FBQ0MsU0FBUyxDQUFDLHVCQUF1QixDQUFDO0VBQ2xENUIsMERBQVksQ0FBQyx1QkFBdUIsRUFBRTJCLGVBQWUsQ0FBQztBQUN4RDtBQUVlLFNBQVNFLFNBQVNBLENBQUEsRUFBRztFQUNsQyxNQUFNakIsV0FBVyxHQUFHVCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFDM0QsTUFBTTBCLFNBQVMsR0FBRzNCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUN2RCxNQUFNMkIsU0FBUyxHQUFHNUIsUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxDQUFDO0VBRXZEUSxXQUFXLENBQUNvQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTTtJQUMxQyxJQUFJRixTQUFTLENBQUNHLEtBQUssS0FBSyxFQUFFLEVBQUU7TUFDMUJGLFNBQVMsQ0FBQ2YsS0FBSyxDQUFDa0IsS0FBSyxHQUFHLEtBQUs7SUFDL0IsQ0FBQyxNQUFNO01BQ0xwQywrQ0FBTSxDQUFDcUIsSUFBSSxHQUFJLEdBQUVXLFNBQVMsQ0FBQ0csS0FBTSxFQUFDO01BQ2xDRixTQUFTLENBQUNmLEtBQUssQ0FBQ21CLE9BQU8sR0FBRyxNQUFNO01BQ2hDbEMsV0FBVyxDQUFDLENBQUM7SUFDZjtFQUNGLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBU3lCLFdBQVdBLENBQUEsRUFBRztFQUNyQixNQUFNVSxJQUFJLEdBQUdqQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFFbkRnQyxJQUFJLENBQUNKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQ25DLElBQUlJLElBQUksQ0FBQ2xCLFdBQVcsS0FBSyxTQUFTLEVBQUU7TUFDbENrQixJQUFJLENBQUNsQixXQUFXLEdBQUcsU0FBUztJQUM5QixDQUFDLE1BQU07TUFDTGtCLElBQUksQ0FBQ2xCLFdBQVcsR0FBRyxTQUFTO0lBQzlCO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQzNEMEI7QUFFWCxNQUFNbkIsU0FBUyxDQUFDO0VBQzdCdUMsV0FBV0EsQ0FBQSxFQUFHO0lBQ1osSUFBSSxDQUFDQyxtQkFBbUIsR0FBRyxFQUFFO0lBQzdCLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsRUFBRTtJQUMzQixJQUFJLENBQUNDLGdCQUFnQixHQUFHLEVBQUU7SUFDMUIsSUFBSSxDQUFDQyxLQUFLLEdBQUcsRUFBRTtFQUNqQjtFQUVBQyxpQkFBaUJBLENBQUNDLFlBQVksRUFBRTtJQUM5QixJQUFJLENBQUNMLG1CQUFtQixDQUFDTSxJQUFJLENBQUNELFlBQVksQ0FBQztFQUM3QztFQUVBRSxhQUFhQSxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsV0FBVyxFQUFFQyxNQUFNLEVBQUU7SUFDM0MsSUFBSUQsV0FBVyxLQUFLLFNBQVMsRUFBRTtNQUM3QixLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0QsTUFBTSxFQUFFQyxDQUFDLEVBQUUsRUFBRTtRQUMvQixNQUFNQyxJQUFJLEdBQUksUUFBT0wsR0FBSSxJQUFHQyxHQUFHLEdBQUdHLENBQUUsRUFBQztRQUNyQ0UsT0FBTyxDQUFDQyxHQUFHLENBQUNGLElBQUksQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQ2IsbUJBQW1CLENBQUNnQixRQUFRLENBQUNILElBQUksQ0FBQyxFQUFFO1VBQzNDLE9BQU8sSUFBSTtRQUNiO01BQ0Y7TUFFQSxPQUFPLEtBQUs7SUFDZDtJQUNBLEtBQUssSUFBSUQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRCxNQUFNLEVBQUVDLENBQUMsRUFBRSxFQUFFO01BQy9CLE1BQU1DLElBQUksR0FBSSxRQUFPTCxHQUFHLEdBQUdJLENBQUUsSUFBR0gsR0FBSSxFQUFDO01BQ3JDSyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsSUFBSSxDQUFDO01BQ2pCLElBQUksSUFBSSxDQUFDYixtQkFBbUIsQ0FBQ2dCLFFBQVEsQ0FBQ0gsSUFBSSxDQUFDLEVBQUU7UUFDM0MsT0FBTyxJQUFJO01BQ2I7SUFDRjtJQUVBLE9BQU8sS0FBSztFQUNkO0VBRUF4QixTQUFTQSxDQUFDNEIsU0FBUyxFQUFFO0lBQ25CLE1BQU0zQyxhQUFhLEdBQUdWLFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLElBQUdvRCxTQUFVLEVBQUMsQ0FBQztJQUU3RCxLQUFLLElBQUlMLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxFQUFFLEVBQUVBLENBQUMsRUFBRSxFQUFFO01BQzNCLEtBQUssSUFBSU0sQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLEVBQUUsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7UUFDM0IsTUFBTUMsUUFBUSxHQUFHdkQsUUFBUSxDQUFDTyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQzlDZ0QsUUFBUSxDQUFDNUMsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQ25DRixhQUFhLENBQUNZLFdBQVcsQ0FBQ2lDLFFBQVEsQ0FBQztRQUVuQyxNQUFNQyxlQUFlLEdBQUksUUFBT1IsQ0FBQyxHQUFHLENBQUUsSUFBR00sQ0FBQyxHQUFHLENBQUUsRUFBQztRQUNoREMsUUFBUSxDQUFDNUMsU0FBUyxDQUFDQyxHQUFHLENBQUM0QyxlQUFlLENBQUM7TUFDekM7SUFDRjtFQUNGO0VBRUFDLFNBQVNBLENBQUNiLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxXQUFXLEVBQUVZLElBQUksRUFBRSxDQUV2QztFQUVBQyxhQUFhQSxDQUFDZixHQUFHLEVBQUVDLEdBQUcsRUFBRSxDQUV4QjtFQUVBZSxZQUFZQSxDQUFBLEVBQUcsQ0FFZjtBQUNGOzs7Ozs7Ozs7Ozs7OztBQy9EZSxTQUFTQyxXQUFXQSxDQUFDZixXQUFXLEVBQUVDLE1BQU0sRUFBRWUsUUFBUSxFQUFFO0VBQ2pFLE1BQU1DLE9BQU8sR0FBRy9ELFFBQVEsQ0FBQ0MsYUFBYSxDQUFFLElBQUc2RCxRQUFTLEVBQUMsQ0FBQztFQUN0RCxNQUFNRSxZQUFZLEdBQUdoRSxRQUFRLENBQUNPLGFBQWEsQ0FBQyxLQUFLLENBQUM7QUFDcEQ7Ozs7Ozs7Ozs7Ozs7O0FDSEEsTUFBTVosTUFBTSxHQUFHO0VBQ2JxQixJQUFJLEVBQUU7QUFDUixDQUFDO0FBRUQsaUVBQWVyQixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKSztBQUNzQjtBQUNQO0FBQ0w7QUFFckIsU0FBU0UsWUFBWUEsQ0FBQ3dELFNBQVMsRUFBRTdCLGVBQWUsRUFBRTtFQUMvRCxNQUFNMEMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNqQyxNQUFNQyxRQUFRLEdBQUcsRUFBRTtFQUNuQixNQUFNQyxTQUFTLEdBQUdwRSxRQUFRLENBQUNDLGFBQWEsQ0FBRSxJQUFHb0QsU0FBVSxFQUFDLENBQUM7RUFDekRlLFNBQVMsQ0FBQ3ZDLGdCQUFnQixDQUFDLE9BQU8sRUFBR3dDLENBQUMsSUFBSztJQUN6QyxNQUFNQyxPQUFPLEdBQUdELENBQUMsQ0FBQ0UsTUFBTSxDQUFDNUQsU0FBUztJQUNsQyxNQUFNbUQsUUFBUSxHQUFHUSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTNCLElBQUlKLFNBQVMsQ0FBQ25CLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDMUI7TUFDQTtJQUNGO0lBQ0EsTUFBTXlCLFVBQVUsR0FBR04sU0FBUyxDQUFDTyxLQUFLLENBQUMsQ0FBQztJQUNwQyxNQUFNQyxlQUFlLEdBQUcxRSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQ2MsV0FBVztJQUUxRSxJQUFJa0QsMERBQWlCLENBQUNTLGVBQWUsRUFBRUYsVUFBVSxFQUFFVixRQUFRLENBQUMsSUFBSWEsV0FBVyxDQUFDYixRQUFRLEVBQUVVLFVBQVUsRUFBRUUsZUFBZSxFQUFFbEQsZUFBZSxDQUFDLEVBQUU7TUFDbkk7TUFDQSxNQUFNa0MsSUFBSSxHQUFHLElBQUl4Qiw2Q0FBSSxDQUFDc0MsVUFBVSxFQUFFRSxlQUFlLEVBQUVaLFFBQVEsQ0FBQztNQUM1REssUUFBUSxDQUFDekIsSUFBSSxDQUFDZ0IsSUFBSSxDQUFDO01BQ25CUixPQUFPLENBQUNDLEdBQUcsQ0FBQ2dCLFFBQVEsQ0FBQztJQUN2QixDQUFDLE1BQU07TUFDTEQsU0FBUyxDQUFDVSxPQUFPLENBQUNKLFVBQVUsQ0FBQztJQUMvQjtFQUNGLENBQUMsQ0FBQztBQUNKO0FBRUEsU0FBU0csV0FBV0EsQ0FDbEJFLFdBQVcsRUFDWDlCLE1BQU0sRUFDTkQsV0FBVyxFQUNYZ0MsU0FBUyxFQUNUO0VBQ0E1QixPQUFPLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7RUFDcEIsTUFBTTRCLFNBQVMsR0FBR0YsV0FBVyxDQUFDRyxLQUFLLENBQUMsR0FBRyxDQUFDO0VBQ3hDLE1BQU1wQyxHQUFHLEdBQUdxQyxNQUFNLENBQUNGLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoQyxNQUFNbEMsR0FBRyxHQUFHb0MsTUFBTSxDQUFDRixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsSUFBSSxDQUFDRCxTQUFTLENBQUNuQyxhQUFhLENBQUNDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxXQUFXLEVBQUVDLE1BQU0sQ0FBQyxFQUFFO0lBQzNELElBQUlELFdBQVcsS0FBSyxTQUFTLEVBQUU7TUFDN0IsS0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdELE1BQU0sRUFBRUMsQ0FBQyxFQUFFLEVBQUU7UUFDL0I4QixTQUFTLENBQUN0QyxpQkFBaUIsQ0FBRSxRQUFPSSxHQUFJLElBQUdDLEdBQUcsR0FBR0csQ0FBRSxFQUFDLENBQUM7TUFDdkQ7SUFDRixDQUFDLE1BQU0sSUFBSUYsV0FBVyxLQUFLLFNBQVMsRUFBRTtNQUNwQyxLQUFLLElBQUlFLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0QsTUFBTSxFQUFFQyxDQUFDLEVBQUUsRUFBRTtRQUMvQjhCLFNBQVMsQ0FBQ3RDLGlCQUFpQixDQUFFLFFBQU9JLEdBQUcsR0FBR0ksQ0FBRSxJQUFHSCxHQUFJLEVBQUMsQ0FBQztNQUN2RDtJQUNGO0lBQ0FpQyxTQUFTLENBQUNuQyxhQUFhLENBQUMsQ0FBQztJQUN6QixPQUFPLElBQUk7RUFDYjtFQUVBLE9BQU8sS0FBSztBQUNkOzs7Ozs7Ozs7Ozs7OztBQ3hEZSxNQUFNVCxJQUFJLENBQUM7RUFDeEJDLFdBQVdBLENBQUNZLE1BQU0sRUFBRUQsV0FBVyxFQUFFZ0IsUUFBUSxFQUFFO0lBQ3pDLElBQUksQ0FBQ2YsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ21DLFVBQVUsR0FBRyxDQUFDO0lBQ25CLElBQUksQ0FBQ0MsSUFBSSxHQUFHLEtBQUs7SUFDakIsSUFBSSxDQUFDckMsV0FBVyxHQUFHQSxXQUFXO0lBQzlCLElBQUksQ0FBQ2dCLFFBQVEsR0FBR0EsUUFBUTtFQUMxQjtFQUVBc0IsR0FBR0EsQ0FBQSxFQUFHO0lBQ0osSUFBSSxDQUFDRixVQUFVLEVBQUU7RUFDbkI7RUFFQUcsTUFBTUEsQ0FBQSxFQUFHO0lBQ1AsSUFBSSxJQUFJLENBQUNILFVBQVUsS0FBSyxJQUFJLENBQUNuQyxNQUFNLEVBQUU7TUFDbkMsSUFBSSxDQUFDb0MsSUFBSSxHQUFHLElBQUk7SUFDbEIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDQSxJQUFJLEdBQUcsS0FBSztJQUNuQjtFQUNGO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7O0FDcEJlLFNBQVNsQixpQkFBaUJBLENBQUNoQyxJQUFJLEVBQUVjLE1BQU0sRUFBRWUsUUFBUSxFQUFFO0VBQ2hFLE1BQU13QixRQUFRLEdBQUd2QyxNQUFNLEdBQUcsQ0FBQztFQUMzQixNQUFNZ0MsU0FBUyxHQUFHakIsUUFBUSxDQUFDa0IsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUNyQyxNQUFNcEMsR0FBRyxHQUFHcUMsTUFBTSxDQUFDRixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsTUFBTWxDLEdBQUcsR0FBR29DLE1BQU0sQ0FBQ0YsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hDLElBQUk5QyxJQUFJLEtBQUssU0FBUyxFQUFFO0lBQ3RCaUIsT0FBTyxDQUFDQyxHQUFHLENBQUNQLEdBQUcsQ0FBQztJQUNoQk0sT0FBTyxDQUFDQyxHQUFHLENBQUNOLEdBQUcsQ0FBQztJQUNoQkssT0FBTyxDQUFDQyxHQUFHLENBQUNOLEdBQUcsR0FBR3lDLFFBQVEsQ0FBQztJQUMzQixJQUFLekMsR0FBRyxHQUFHeUMsUUFBUSxHQUFHLEVBQUUsRUFBRztNQUN6QixPQUFPLEtBQUs7SUFDZDtJQUNBLE9BQU8sSUFBSTtFQUNiO0VBQUUsSUFBSXJELElBQUksS0FBSyxTQUFTLEVBQUU7SUFDeEIsSUFBS1csR0FBRyxHQUFHMEMsUUFBUSxHQUFHLEVBQUUsRUFBRztNQUN6QixPQUFPLEtBQUs7SUFDZDtJQUNBLE9BQU8sSUFBSTtFQUNiO0FBQ0Y7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnNDO0FBRXRDNUQsd0RBQVMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2ltYWdlQ3JlYXRvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLWxpc3RlbmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zcG90VmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgc2hpcExpc3RlbmVyIGZyb20gJy4vc2hpcC1saXN0ZW5lcic7XG5cbmZ1bmN0aW9uIGJvYXJkUGlja2VyKCkge1xuICBjb25zdCBjb250ZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICBjb25zdCBtaWRkbGVIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZS1oZWFkaW5nJyk7XG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG4gIGNvbnN0IG1haW5BcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBsb2dvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgaW1nJyk7XG4gIGNvbnN0IHh5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbiAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBncmlkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicpO1xuXG4gIGxvZ29JbWFnZS5zdHlsZS53aWR0aCA9ICczMDBweCc7XG4gIG1pZGRsZUhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIubmFtZX0sIFBMQUNFIFlPVVIgU0hJUFNgO1xuICBtaWRkbGVIZWFkaW5nLnN0eWxlLm1hcmdpblRvcCA9ICc0MHB4JztcbiAgeHlCdXR0b24udGV4dENvbnRlbnQgPSAnQVhJUzogWCc7XG4gIGlucHV0RWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh4eUJ1dHRvbiwgaW5wdXRFbGVtZW50KTtcbiAgeHlCdXR0b24uY2xhc3NMaXN0LmFkZCgnYXhpcy1idXR0b24nKTtcbiAgd3JhcHBlci5zdHlsZS5nYXAgPSAnMTBweCc7XG4gIG1haW5BcmVhLnJlbW92ZUNoaWxkKHN0YXJ0QnV0dG9uKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQoZ3JpZENvbnRhaW5lcik7XG5cbiAgY2hlY2tCdXR0b24oKTtcblxuICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIHBsYXllckdhbWVCb2FyZC5zaG93Qm9hcmQoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicpO1xuICBzaGlwTGlzdGVuZXIoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicsIHBsYXllckdhbWVCb2FyZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZURvbSgpIHtcbiAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnQtYnV0dG9uJyk7XG4gIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG4gIGNvbnN0IGFsZXJ0VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC10ZXh0Jyk7XG5cbiAgc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gJycpIHtcbiAgICAgIGFsZXJ0VGV4dC5zdHlsZS5jb2xvciA9ICdyZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXIubmFtZSA9IGAke25hbWVJbnB1dC52YWx1ZX1gO1xuICAgICAgYWxlcnRUZXh0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBib2FyZFBpY2tlcigpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQnV0dG9uKCkge1xuICBjb25zdCBheGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJyk7XG5cbiAgYXhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAoYXhpcy50ZXh0Q29udGVudCA9PT0gJ0FYSVM6IFgnKSB7XG4gICAgICBheGlzLnRleHRDb250ZW50ID0gJ0FYSVM6IFknO1xuICAgIH0gZWxzZSB7XG4gICAgICBheGlzLnRleHRDb250ZW50ID0gJ0FYSVM6IFgnO1xuICAgIH1cbiAgfSk7XG59XG4iLCJpbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9jY3VwaWVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLmJvbWJlZENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5lbXB0eUNvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgdXBkYXRlQ29vcmRpbmF0ZXMob2NjdXBpZWRJdGVtKSB7XG4gICAgdGhpcy5vY2N1cGllZENvb3JkaW5hdGVzLnB1c2gob2NjdXBpZWRJdGVtKTtcbiAgfVxuXG4gIGNoZWNrT2NjdXBpZWQocm93LCBjb2wsIG9yaWVudGF0aW9uLCBsZW5ndGgpIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcG90ID0gYGNlbGwtJHtyb3d9LSR7Y29sICsgaX1gO1xuICAgICAgICBjb25zb2xlLmxvZyhzcG90KTtcbiAgICAgICAgaWYgKHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3BvdCA9IGBjZWxsLSR7cm93ICsgaX0tJHtjb2x9YDtcbiAgICAgIGNvbnNvbGUubG9nKHNwb3QpO1xuICAgICAgaWYgKHRoaXMub2NjdXBpZWRDb29yZGluYXRlcy5pbmNsdWRlcyhzcG90KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzaG93Qm9hcmQoY2xhc3NOYW1lKSB7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcpO1xuICAgICAgICBncmlkQ29udGFpbmVyLmFwcGVuZENoaWxkKGdyaWRDZWxsKTtcblxuICAgICAgICBjb25zdCB1bmlxdWVDbGFzc05hbWUgPSBgY2VsbC0ke2kgKyAxfS0ke2ogKyAxfWA7XG4gICAgICAgIGdyaWRDZWxsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAocm93LCBjb2wsIG9yaWVudGF0aW9uLCBzaGlwKSB7XG5cbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2socm93LCBjb2wpIHtcblxuICB9XG5cbiAgc3Vua0FsbFNoaXBzKCkge1xuXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUltYWdlKG9yaWVudGF0aW9uLCBsZW5ndGgsIHBvc2l0aW9uKSB7XG4gIGNvbnN0IGRvbVNwb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwb3NpdGlvbn1gKTtcbiAgY29uc3QgaW1hZ2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG59XG4iLCJjb25zdCBwbGF5ZXIgPSB7XG4gIG5hbWU6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxheWVyO1xuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcbmltcG9ydCBjaGVja1NoaXBWYWxpZGl0eSBmcm9tICcuL3Nwb3RWYWxpZGF0b3InO1xuaW1wb3J0IGNyZWF0ZUltYWdlIGZyb20gJy4vaW1hZ2VDcmVhdG9yJztcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlwTGlzdGVuZXIoY2xhc3NOYW1lLCBwbGF5ZXJHYW1lQm9hcmQpIHtcbiAgY29uc3Qgc2hpcFNpemVzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBjb25zdCBhbGxTaGlwcyA9IFtdO1xuICBjb25zdCBnYW1lRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG4gIGdhbWVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGNsYXNzZXNbMV07XG5cbiAgICBpZiAoc2hpcFNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gY2FsbHMgZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgdGhlIG1haW4gZ2FtZSBmaWVsZFxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcFNpemVzLnNoaWZ0KCk7XG4gICAgY29uc3Qgc2hpcE9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJykudGV4dENvbnRlbnQ7XG5cbiAgICBpZiAoY2hlY2tTaGlwVmFsaWRpdHkoc2hpcE9yaWVudGF0aW9uLCBzaGlwTGVuZ3RoLCBwb3NpdGlvbikgJiYgY2hlY2tTdGF0dXMocG9zaXRpb24sIHNoaXBMZW5ndGgsIHNoaXBPcmllbnRhdGlvbiwgcGxheWVyR2FtZUJvYXJkKSkge1xuICAgICAgLy8gY3JlYXRlcyBpbWFnZVxuICAgICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW5ndGgsIHNoaXBPcmllbnRhdGlvbiwgcG9zaXRpb24pO1xuICAgICAgYWxsU2hpcHMucHVzaChzaGlwKTtcbiAgICAgIGNvbnNvbGUubG9nKGFsbFNoaXBzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hpcFNpemVzLnVuc2hpZnQoc2hpcExlbmd0aCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tTdGF0dXMoXG4gIG5ld1Bvc2l0aW9uLFxuICBsZW5ndGgsXG4gIG9yaWVudGF0aW9uLFxuICBwbGF5Qm9hcmQsXG4pIHtcbiAgY29uc29sZS5sb2coJ3dvcmtzJyk7XG4gIGNvbnN0IGF4aXNQYXJ0cyA9IG5ld1Bvc2l0aW9uLnNwbGl0KCctJyk7XG4gIGNvbnN0IHJvdyA9IE51bWJlcihheGlzUGFydHNbMV0pO1xuICBjb25zdCBjb2wgPSBOdW1iZXIoYXhpc1BhcnRzWzJdKTtcbiAgaWYgKCFwbGF5Qm9hcmQuY2hlY2tPY2N1cGllZChyb3csIGNvbCwgb3JpZW50YXRpb24sIGxlbmd0aCkpIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICdBWElTOiBYJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBwbGF5Qm9hcmQudXBkYXRlQ29vcmRpbmF0ZXMoYGNlbGwtJHtyb3d9LSR7Y29sICsgaX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9yaWVudGF0aW9uID09PSAnQVhJUzogWScpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxheUJvYXJkLnVwZGF0ZUNvb3JkaW5hdGVzKGBjZWxsLSR7cm93ICsgaX0tJHtjb2x9YCk7XG4gICAgICB9XG4gICAgfVxuICAgIHBsYXlCb2FyZC5jaGVja09jY3VwaWVkKCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobGVuZ3RoLCBvcmllbnRhdGlvbiwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ZXIgPSAwO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRDb3VudGVyKys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0Q291bnRlciA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hlY2tTaGlwVmFsaWRpdHkoYXhpcywgbGVuZ3RoLCBwb3NpdGlvbikge1xuICBjb25zdCByZWFsU2l6ZSA9IGxlbmd0aCAtIDE7XG4gIGNvbnN0IGF4aXNQYXJ0cyA9IHBvc2l0aW9uLnNwbGl0KCctJyk7XG4gIGNvbnN0IHJvdyA9IE51bWJlcihheGlzUGFydHNbMV0pO1xuICBjb25zdCBjb2wgPSBOdW1iZXIoYXhpc1BhcnRzWzJdKTtcbiAgaWYgKGF4aXMgPT09ICdBWElTOiBYJykge1xuICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgY29uc29sZS5sb2coY29sKTtcbiAgICBjb25zb2xlLmxvZyhjb2wgLSByZWFsU2l6ZSk7XG4gICAgaWYgKChjb2wgKyByZWFsU2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBpZiAoYXhpcyA9PT0gJ0FYSVM6IFknKSB7XG4gICAgaWYgKChyb3cgKyByZWFsU2l6ZSA+IDEwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgY3JlYXRlRG9tIGZyb20gJy4vbW9kdWxlcy9kb20nO1xuXG5jcmVhdGVEb20oKTtcbiJdLCJuYW1lcyI6WyJwbGF5ZXIiLCJHYW1lYm9hcmQiLCJzaGlwTGlzdGVuZXIiLCJib2FyZFBpY2tlciIsImNvbnRlbnRGaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm1pZGRsZUhlYWRpbmciLCJpbnB1dEVsZW1lbnQiLCJtYWluQXJlYSIsImxvZ29JbWFnZSIsInh5QnV0dG9uIiwiY3JlYXRlRWxlbWVudCIsIndyYXBwZXIiLCJzdGFydEJ1dHRvbiIsImdyaWRDb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHlsZSIsIndpZHRoIiwidGV4dENvbnRlbnQiLCJuYW1lIiwibWFyZ2luVG9wIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsImdhcCIsInJlbW92ZUNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJjaGVja0J1dHRvbiIsInBsYXllckdhbWVCb2FyZCIsInNob3dCb2FyZCIsImNyZWF0ZURvbSIsIm5hbWVJbnB1dCIsImFsZXJ0VGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ2YWx1ZSIsImNvbG9yIiwiZGlzcGxheSIsImF4aXMiLCJTaGlwIiwiY29uc3RydWN0b3IiLCJvY2N1cGllZENvb3JkaW5hdGVzIiwiYm9tYmVkQ29vcmRpbmF0ZXMiLCJlbXB0eUNvb3JkaW5hdGVzIiwic2hpcHMiLCJ1cGRhdGVDb29yZGluYXRlcyIsIm9jY3VwaWVkSXRlbSIsInB1c2giLCJjaGVja09jY3VwaWVkIiwicm93IiwiY29sIiwib3JpZW50YXRpb24iLCJsZW5ndGgiLCJpIiwic3BvdCIsImNvbnNvbGUiLCJsb2ciLCJpbmNsdWRlcyIsImNsYXNzTmFtZSIsImoiLCJncmlkQ2VsbCIsInVuaXF1ZUNsYXNzTmFtZSIsInBsYWNlU2hpcCIsInNoaXAiLCJyZWNlaXZlQXR0YWNrIiwic3Vua0FsbFNoaXBzIiwiY3JlYXRlSW1hZ2UiLCJwb3NpdGlvbiIsImRvbVNwb3QiLCJpbWFnZUVsZW1lbnQiLCJjaGVja1NoaXBWYWxpZGl0eSIsInNoaXBTaXplcyIsImFsbFNoaXBzIiwiZ2FtZUZpZWxkIiwiZSIsImNsYXNzZXMiLCJ0YXJnZXQiLCJzaGlwTGVuZ3RoIiwic2hpZnQiLCJzaGlwT3JpZW50YXRpb24iLCJjaGVja1N0YXR1cyIsInVuc2hpZnQiLCJuZXdQb3NpdGlvbiIsInBsYXlCb2FyZCIsImF4aXNQYXJ0cyIsInNwbGl0IiwiTnVtYmVyIiwiaGl0Q291bnRlciIsInN1bmsiLCJoaXQiLCJpc1N1bmsiLCJyZWFsU2l6ZSJdLCJzb3VyY2VSb290IjoiIn0=