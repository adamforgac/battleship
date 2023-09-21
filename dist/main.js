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
  (0,_ship_listener__WEBPACK_IMPORTED_MODULE_2__["default"])('grid-container-picker');
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

function shipListener(className) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  gameField.addEventListener('click', e => {
    const classes = e.target.classList;
    const position = classes[1];
    if (shipSizes.length === 0) {
      return;
    }
    const shipLength = shipSizes.shift();
    const shipOrientation = document.querySelector('.axis-button').textContent;
    if (checkShipValidity(shipOrientation, shipLength, position)) {
      const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength, shipOrientation, position);
      allShips.push(ship);
      console.log('true');
    } else {
      shipSizes.unshift(shipLength);
      console.log('false');
    }
  });
}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZDtJQUNBLE9BQU8sSUFBSTtFQUNiO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7O0FDOUNlLE1BQU1sQyxJQUFJLENBQUM7RUFDeEJDLFdBQVdBLENBQUN3QixNQUFNLEVBQUVYLFdBQVcsRUFBRVUsUUFBUSxFQUFFO0lBQ3pDLElBQUksQ0FBQ0MsTUFBTSxHQUFHQSxNQUFNO0lBQ3BCLElBQUksQ0FBQ2EsVUFBVSxHQUFHLENBQUM7SUFDbkIsSUFBSSxDQUFDQyxJQUFJLEdBQUcsS0FBSztJQUNqQixJQUFJLENBQUN6QixXQUFXLEdBQUdBLFdBQVc7SUFDOUIsSUFBSSxDQUFDVSxRQUFRLEdBQUdBLFFBQVE7RUFDMUI7RUFFQWdCLEdBQUdBLENBQUEsRUFBRztJQUNKLElBQUksQ0FBQ0YsVUFBVSxFQUFFO0VBQ25CO0VBRUFHLE1BQU1BLENBQUEsRUFBRztJQUNQLElBQUksSUFBSSxDQUFDSCxVQUFVLEtBQUssSUFBSSxDQUFDYixNQUFNLEVBQUU7TUFDbkMsSUFBSSxDQUFDYyxJQUFJLEdBQUcsSUFBSTtJQUNsQixDQUFDLE1BQU07TUFDTCxJQUFJLENBQUNBLElBQUksR0FBRyxLQUFLO0lBQ25CO0VBQ0Y7QUFDRjs7Ozs7O1VDcEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOc0M7QUFFdEMvQyx3REFBUyxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLWxpc3RlbmVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgc2hpcExpc3RlbmVyIGZyb20gJy4vc2hpcC1saXN0ZW5lcic7XG5cbmZ1bmN0aW9uIGJvYXJkUGlja2VyKCkge1xuICBjb25zdCBjb250ZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICBjb25zdCBtaWRkbGVIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZS1oZWFkaW5nJyk7XG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG4gIGNvbnN0IG1haW5BcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBsb2dvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgaW1nJyk7XG4gIGNvbnN0IHh5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbiAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBncmlkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicpO1xuXG4gIGxvZ29JbWFnZS5zdHlsZS53aWR0aCA9ICczMDBweCc7XG4gIG1pZGRsZUhlYWRpbmcudGV4dENvbnRlbnQgPSBgJHtwbGF5ZXIubmFtZX0sIFBMQUNFIFlPVVIgU0hJUFNgO1xuICBtaWRkbGVIZWFkaW5nLnN0eWxlLm1hcmdpblRvcCA9ICc0MHB4JztcbiAgeHlCdXR0b24udGV4dENvbnRlbnQgPSAnQVhJUzogWCc7XG4gIGlucHV0RWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh4eUJ1dHRvbiwgaW5wdXRFbGVtZW50KTtcbiAgeHlCdXR0b24uY2xhc3NMaXN0LmFkZCgnYXhpcy1idXR0b24nKTtcbiAgd3JhcHBlci5zdHlsZS5nYXAgPSAnMTBweCc7XG4gIG1haW5BcmVhLnJlbW92ZUNoaWxkKHN0YXJ0QnV0dG9uKTtcbiAgbWFpbkFyZWEuYXBwZW5kQ2hpbGQoZ3JpZENvbnRhaW5lcik7XG5cbiAgY2hlY2tCdXR0b24oKTtcblxuICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIHBsYXllckdhbWVCb2FyZC5zaG93Qm9hcmQoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicpO1xuICBzaGlwTGlzdGVuZXIoJ2dyaWQtY29udGFpbmVyLXBpY2tlcicpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEb20oKSB7XG4gIGNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ1dHRvbicpO1xuICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmFtZS1pbnB1dCcpO1xuICBjb25zdCBhbGVydFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtdGV4dCcpO1xuXG4gIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09ICcnKSB7XG4gICAgICBhbGVydFRleHQuc3R5bGUuY29sb3IgPSAncmVkJztcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheWVyLm5hbWUgPSBgJHtuYW1lSW5wdXQudmFsdWV9YDtcbiAgICAgIGFsZXJ0VGV4dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgYm9hcmRQaWNrZXIoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja0J1dHRvbigpIHtcbiAgY29uc3QgYXhpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5heGlzLWJ1dHRvbicpO1xuXG4gIGF4aXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgaWYgKGF4aXMudGV4dENvbnRlbnQgPT09ICdBWElTOiBYJykge1xuICAgICAgYXhpcy50ZXh0Q29udGVudCA9ICdBWElTOiBZJztcbiAgICB9IGVsc2Uge1xuICAgICAgYXhpcy50ZXh0Q29udGVudCA9ICdBWElTOiBYJztcbiAgICB9XG4gIH0pO1xufVxuIiwiaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vY2N1cGllZENvb3JkaW5hdGVzID0gW107XG4gICAgdGhpcy5ib21iZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuZW1wdHlDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHNob3dCb2FyZChjbGFzc05hbWUpIHtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICAgIGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuXG4gICAgICAgIGNvbnN0IHVuaXF1ZUNsYXNzTmFtZSA9IGBjZWxsLSR7aSArIDF9LSR7aiArIDF9YDtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDbGFzc05hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcChyb3csIGNvbCwgb3JpZW50YXRpb24sIHNoaXApIHtcblxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuXG4gIH1cblxuICBzdW5rQWxsU2hpcHMoKSB7XG5cbiAgfVxufVxuIiwiY29uc3QgcGxheWVyID0ge1xuICBuYW1lOiAnJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHBsYXllcjtcbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXBMaXN0ZW5lcihjbGFzc05hbWUpIHtcbiAgY29uc3Qgc2hpcFNpemVzID0gWzUsIDQsIDMsIDMsIDJdO1xuICBjb25zdCBhbGxTaGlwcyA9IFtdO1xuICBjb25zdCBnYW1lRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YCk7XG4gIGdhbWVGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGNsYXNzZXNbMV07XG5cbiAgICBpZiAoc2hpcFNpemVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzaGlwTGVuZ3RoID0gc2hpcFNpemVzLnNoaWZ0KCk7XG4gICAgY29uc3Qgc2hpcE9yaWVudGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF4aXMtYnV0dG9uJykudGV4dENvbnRlbnQ7XG5cbiAgICBpZiAoY2hlY2tTaGlwVmFsaWRpdHkoc2hpcE9yaWVudGF0aW9uLCBzaGlwTGVuZ3RoLCBwb3NpdGlvbikpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuZ3RoLCBzaGlwT3JpZW50YXRpb24sIHBvc2l0aW9uKTtcbiAgICAgIGFsbFNoaXBzLnB1c2goc2hpcCk7XG4gICAgICBjb25zb2xlLmxvZygndHJ1ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaGlwU2l6ZXMudW5zaGlmdChzaGlwTGVuZ3RoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdmYWxzZScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrU2hpcFZhbGlkaXR5KGF4aXMsIGxlbmd0aCwgcG9zaXRpb24pIHtcbiAgY29uc3QgcmVhbFNpemUgPSBsZW5ndGggLSAxO1xuICBjb25zdCBheGlzUGFydHMgPSBwb3NpdGlvbi5zcGxpdCgnLScpO1xuICBjb25zdCByb3cgPSBOdW1iZXIoYXhpc1BhcnRzWzFdKTtcbiAgY29uc3QgY29sID0gTnVtYmVyKGF4aXNQYXJ0c1syXSk7XG4gIGlmIChheGlzID09PSAnQVhJUzogWCcpIHtcbiAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgIGNvbnNvbGUubG9nKGNvbCk7XG4gICAgY29uc29sZS5sb2coY29sIC0gcmVhbFNpemUpO1xuICAgIGlmICgoY29sICsgcmVhbFNpemUgPiAxMCkgfHwgKGNvbCAtIHJlYWxTaXplIDw9IDApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9IGlmIChheGlzID09PSAnQVhJUzogWScpIHtcbiAgICBpZiAoKHJvdyArIHJlYWxTaXplID4gMTApIHx8IChyb3cgLSByZWFsU2l6ZSA8PSAwKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgb3JpZW50YXRpb24sIHBvc2l0aW9uKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRDb3VudGVyID0gMDtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnRlcisrO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdENvdW50ZXIgPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZURvbSBmcm9tICcuL21vZHVsZXMvZG9tJztcblxuY3JlYXRlRG9tKCk7XG4iXSwibmFtZXMiOlsicGxheWVyIiwiR2FtZWJvYXJkIiwic2hpcExpc3RlbmVyIiwiYm9hcmRQaWNrZXIiLCJjb250ZW50RmllbGQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtaWRkbGVIZWFkaW5nIiwiaW5wdXRFbGVtZW50IiwibWFpbkFyZWEiLCJsb2dvSW1hZ2UiLCJ4eUJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJ3cmFwcGVyIiwic3RhcnRCdXR0b24iLCJncmlkQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJ3aWR0aCIsInRleHRDb250ZW50IiwibmFtZSIsIm1hcmdpblRvcCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJnYXAiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwiY2hlY2tCdXR0b24iLCJwbGF5ZXJHYW1lQm9hcmQiLCJzaG93Qm9hcmQiLCJjcmVhdGVEb20iLCJuYW1lSW5wdXQiLCJhbGVydFRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwidmFsdWUiLCJjb2xvciIsImRpc3BsYXkiLCJheGlzIiwiU2hpcCIsImNvbnN0cnVjdG9yIiwib2NjdXBpZWRDb29yZGluYXRlcyIsImJvbWJlZENvb3JkaW5hdGVzIiwiZW1wdHlDb29yZGluYXRlcyIsInNoaXBzIiwiY2xhc3NOYW1lIiwiaSIsImoiLCJncmlkQ2VsbCIsInVuaXF1ZUNsYXNzTmFtZSIsInBsYWNlU2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwic2hpcCIsInJlY2VpdmVBdHRhY2siLCJzdW5rQWxsU2hpcHMiLCJzaGlwU2l6ZXMiLCJhbGxTaGlwcyIsImdhbWVGaWVsZCIsImUiLCJjbGFzc2VzIiwidGFyZ2V0IiwicG9zaXRpb24iLCJsZW5ndGgiLCJzaGlwTGVuZ3RoIiwic2hpZnQiLCJzaGlwT3JpZW50YXRpb24iLCJjaGVja1NoaXBWYWxpZGl0eSIsInB1c2giLCJjb25zb2xlIiwibG9nIiwidW5zaGlmdCIsInJlYWxTaXplIiwiYXhpc1BhcnRzIiwic3BsaXQiLCJOdW1iZXIiLCJoaXRDb3VudGVyIiwic3VuayIsImhpdCIsImlzU3VuayJdLCJzb3VyY2VSb290IjoiIn0=