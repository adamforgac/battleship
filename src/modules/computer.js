/* eslint-disable no-continue */
import player from './player';
import showWinner from './determineWinner';

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
      left: { row: 0, col: -1 },
      right: { row: 0, col: 1 },
      up: { row: -1, col: 0 },
      down: { row: 1, col: 0 },
    };

    let currentRow = row;
    let currentCol = col;

    while (true) {
      const newRow = currentRow + directions[direction].row;
      const newCol = currentCol + directions[direction].col;

      const cellClassName = `cell-${newRow}-${newCol}`;
      const cell = grid.find((cell) => cell.classList.contains(cellClassName));

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
        const cell = grid.find((cell) => cell.classList.contains(cellClassName));
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
            } else if ((bombedArr.includes(`cell-${newRow}-${newColVerOne}`)) && (domPlayerBoard.querySelector(`.cell-${newRow}-${newColVerTwo}`))) {
              newCol = newColVerTwo;
            } else if ((bombedArr.includes(`cell-${newRow}-${newColVerTwo}`)) && (domPlayerBoard.querySelector(`.cell-${newRow}-${newColVerOne}`))) {
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
            } else if ((bombedArr.includes(`cell-${newRowVerOne}-${newCol}`)) && (domPlayerBoard.querySelector(`.cell-${newRowVerTwo}-${newCol}`))) {
              newRow = newRowVerTwo;
            } else if ((bombedArr.includes(`cell-${newRowVerTwo}-${newCol}`)) && (domPlayerBoard.querySelector(`.cell-${newRowVerOne}-${newCol}`))) {
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

      setTimeout(showWinner, 1000, botBoard, playerBoard);

      bombedArr.push(spot);
      player.playStatus = true;
    }
  },
};

export const generateRandomMove = computer.generateRandomMove;
export default computer;
