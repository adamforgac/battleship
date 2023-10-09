import Ship from './ship';

export default class Gameboard {
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

  receiveAttack(row, col) {

  }

  sunkAllShips() {

  }
}
