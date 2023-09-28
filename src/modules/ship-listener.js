import Ship from './ship';
import checkShipValidity from './spotValidator';
import createImage from './imageCreator';
import Gameboard from './gameboard';

export default function shipListener(className, playerGameBoard) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  gameField.addEventListener('click', (e) => {
    const classes = e.target.classList;
    const position = classes[1];

    if (shipSizes.length === 0) {
      // calls function that generates the main game field
      return;
    }
    const shipLength = shipSizes.shift();
    const shipOrientation = document.querySelector('.axis-button').textContent;

    if (checkShipValidity(shipOrientation, shipLength, position) && checkStatus(position, shipLength, shipOrientation, playerGameBoard)) {
      // creates image
      const ship = new Ship(shipLength, shipOrientation, position);
      allShips.push(ship);
      console.log(allShips);
    } else {
      shipSizes.unshift(shipLength);
    }
  });
}

function checkStatus(
  newPosition,
  length,
  orientation,
  playBoard,
) {
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
