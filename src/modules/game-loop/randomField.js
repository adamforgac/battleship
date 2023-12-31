import checkStatus from '../checkers/availabilityValidator';
import Gameboard from '../game-objects/gameboard';
import Ship from '../game-objects/ship';

export default function createRandomField() {
  const botGameBoard = new Gameboard();
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

    if (!checkStatus(connectedClass, currentSize, orientationPick, botGameBoard)) {
      shipSizes.unshift(currentSize);
    } else {
      const newShip = new Ship(currentSize, orientationPick, connectedClass);
      botGameBoard.ships.push(newShip);
    }
  }
  return botGameBoard;
}
