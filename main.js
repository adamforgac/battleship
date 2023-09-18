/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/board-generator.js":
/*!****************************************!*\
  !*** ./src/modules/board-generator.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ boardPicker)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");


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
  gridContainer.classList.add('grid-container');
  logoImage.style.width = '300px';
  middleHeading.textContent = `${_player__WEBPACK_IMPORTED_MODULE_0__["default"].name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '40px';
  xyButton.textContent = 'AXIS: X';
  inputElement.parentNode.replaceChild(xyButton, inputElement);
  xyButton.classList.add('axis-button');
  wrapper.style.gap = '10px';
  mainArea.removeChild(startButton);
  mainArea.appendChild(gridContainer);
  const playerGameBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__["default"]();
  playerGameBoard.showBoard();
}

/***/ }),

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
/* harmony import */ var _board_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./board-generator */ "./src/modules/board-generator.js");


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
      (0,_board_generator__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
  showBoard() {
    const gridContainer = document.querySelector('.grid-container');
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.textContent = `${i + 1},${j + 1}`;
        gridContainer.appendChild(gridCell);
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
  name: ""
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (player);

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
  constructor(length, orientation) {
    this.length = length;
    this.hitCounter = 0;
    this.sunk = false;
    this.orientation = orientation;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bkIsSUFBSSxDQUFDQyxJQUFJLEdBQUcsS0FBSztJQUNqQixJQUFJLENBQUNOLFdBQVcsR0FBR0EsV0FBVztFQUNoQztFQUVBTyxHQUFHQSxDQUFBLEVBQUc7SUFDSixJQUFJLENBQUNGLFVBQVUsRUFBRTtFQUNuQjtFQUVBRyxNQUFNQSxDQUFBLEVBQUc7SUFDUCxJQUFJLElBQUksQ0FBQ0gsVUFBVSxLQUFLLElBQUksQ0FBQ0QsTUFBTSxFQUFFO01BQ25DLElBQUksQ0FBQ0UsSUFBSSxHQUFHLElBQUk7SUFDbEIsQ0FBQyxNQUFNO01BQ0wsSUFBSSxDQUFDQSxJQUFJLEdBQUcsS0FBSztJQUNuQjtFQUNGO0FBQ0Y7Ozs7OztVQ25CQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnNDO0FBRXRDekIsd0RBQVMsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvYm9hcmQtZ2VuZXJhdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL2dhbWVib2FyZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJvYXJkUGlja2VyKCkge1xuICBjb25zdCBjb250ZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpO1xuICBjb25zdCBtaWRkbGVIZWFkaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pZGRsZS1oZWFkaW5nJyk7XG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYW1lLWlucHV0Jyk7XG4gIGNvbnN0IG1haW5BcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBsb2dvSW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgaW1nJyk7XG4gIGNvbnN0IHh5QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3JhcHBlcicpO1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbiAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBncmlkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY29udGFpbmVyJyk7XG5cbiAgbG9nb0ltYWdlLnN0eWxlLndpZHRoID0gJzMwMHB4JztcbiAgbWlkZGxlSGVhZGluZy50ZXh0Q29udGVudCA9IGAke3BsYXllci5uYW1lfSwgUExBQ0UgWU9VUiBTSElQU2A7XG4gIG1pZGRsZUhlYWRpbmcuc3R5bGUubWFyZ2luVG9wID0gJzQwcHgnO1xuICB4eUJ1dHRvbi50ZXh0Q29udGVudCA9ICdBWElTOiBYJztcbiAgaW5wdXRFbGVtZW50LnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHh5QnV0dG9uLCBpbnB1dEVsZW1lbnQpO1xuICB4eUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdheGlzLWJ1dHRvbicpO1xuICB3cmFwcGVyLnN0eWxlLmdhcCA9ICcxMHB4JztcbiAgbWFpbkFyZWEucmVtb3ZlQ2hpbGQoc3RhcnRCdXR0b24pO1xuICBtYWluQXJlYS5hcHBlbmRDaGlsZChncmlkQ29udGFpbmVyKTtcblxuICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIHBsYXllckdhbWVCb2FyZC5zaG93Qm9hcmQoKTtcbn1cbiIsImltcG9ydCBwbGF5ZXIgZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IGJvYXJkUGlja2VyIGZyb20gJy4vYm9hcmQtZ2VuZXJhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRG9tKCkge1xuICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydC1idXR0b24nKTtcbiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hbWUtaW5wdXQnKTtcbiAgY29uc3QgYWxlcnRUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFsZXJ0LXRleHQnKTtcblxuICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSAnJykge1xuICAgICAgYWxlcnRUZXh0LnN0eWxlLmNvbG9yID0gJ3JlZCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllci5uYW1lID0gYCR7bmFtZUlucHV0LnZhbHVlfWA7XG4gICAgICBhbGVydFRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGJvYXJkUGlja2VyKCk7XG4gICAgfVxuICB9KTtcbn1cbiIsImltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub2NjdXBpZWRDb29yZGluYXRlcyA9IFtdO1xuICAgIHRoaXMuYm9tYmVkQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLmVtcHR5Q29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBzaG93Qm9hcmQoKSB7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLWNvbnRhaW5lcicpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZ3JpZENlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICAgIGdyaWRDZWxsLnRleHRDb250ZW50ID0gYCR7aSArIDF9LCR7aiArIDF9YDsgXG4gICAgICAgIGdyaWRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZENlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcChyb3csIGNvbCwgb3JpZW50YXRpb24sIHNoaXApIHtcblxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuXG4gIH1cblxuICBzdW5rQWxsU2hpcHMoKSB7XG5cbiAgfVxufVxuIiwiY29uc3QgcGxheWVyID0ge1xuICAgIG5hbWU6IFwiXCIsIFxufVxuXG5leHBvcnQgZGVmYXVsdCBwbGF5ZXI7IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCwgb3JpZW50YXRpb24pIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdENvdW50ZXIgPSAwO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvblxuICB9XG5cbiAgaGl0KCkge1xuICAgIHRoaXMuaGl0Q291bnRlcisrO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdENvdW50ZXIgPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGNyZWF0ZURvbSBmcm9tICcuL21vZHVsZXMvZG9tJztcblxuY3JlYXRlRG9tKCk7XG4iXSwibmFtZXMiOlsicGxheWVyIiwiR2FtZWJvYXJkIiwiYm9hcmRQaWNrZXIiLCJjb250ZW50RmllbGQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtaWRkbGVIZWFkaW5nIiwiaW5wdXRFbGVtZW50IiwibWFpbkFyZWEiLCJsb2dvSW1hZ2UiLCJ4eUJ1dHRvbiIsImNyZWF0ZUVsZW1lbnQiLCJ3cmFwcGVyIiwic3RhcnRCdXR0b24iLCJncmlkQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJ3aWR0aCIsInRleHRDb250ZW50IiwibmFtZSIsIm1hcmdpblRvcCIsInBhcmVudE5vZGUiLCJyZXBsYWNlQ2hpbGQiLCJnYXAiLCJyZW1vdmVDaGlsZCIsImFwcGVuZENoaWxkIiwicGxheWVyR2FtZUJvYXJkIiwic2hvd0JvYXJkIiwiY3JlYXRlRG9tIiwibmFtZUlucHV0IiwiYWxlcnRUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsInZhbHVlIiwiY29sb3IiLCJkaXNwbGF5IiwiU2hpcCIsImNvbnN0cnVjdG9yIiwib2NjdXBpZWRDb29yZGluYXRlcyIsImJvbWJlZENvb3JkaW5hdGVzIiwiZW1wdHlDb29yZGluYXRlcyIsInNoaXBzIiwiaSIsImoiLCJncmlkQ2VsbCIsInBsYWNlU2hpcCIsInJvdyIsImNvbCIsIm9yaWVudGF0aW9uIiwic2hpcCIsInJlY2VpdmVBdHRhY2siLCJzdW5rQWxsU2hpcHMiLCJsZW5ndGgiLCJoaXRDb3VudGVyIiwic3VuayIsImhpdCIsImlzU3VuayJdLCJzb3VyY2VSb290IjoiIn0=