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

  placeShip(row, col, orientation, ship) {

  }

  receiveAttack(row, col) {

  }

  sunkAllShips() {

  }
}
