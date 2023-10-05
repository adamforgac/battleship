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

  receiveAttack(row, col) {

  }

  sunkAllShips() {

  }
}
