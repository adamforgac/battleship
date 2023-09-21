import Ship from './ship';

export default function shipListener(className) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  gameField.addEventListener('click', (e) => {
    const classes = e.target.classList;
    const position = classes[1];

    if (shipSizes.length === 0) {
      return;
    }
    const shipLength = shipSizes.shift();
    const shipOrientation = document.querySelector('.axis-button').textContent;

    if (checkShipValidity(shipOrientation, shipLength, position)) {
      const ship = new Ship(shipLength, shipOrientation, position);
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
    if ((col + realSize > 10) || (col - realSize <= 0)) {
      return false;
    }
    return true;
  } if (axis === 'AXIS: Y') {
    if ((row + realSize > 10) || (row - realSize <= 0)) {
      return false;
    }
    return true;
  }
}
