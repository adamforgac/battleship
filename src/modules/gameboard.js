import Ship from './ship';

export default class Gameboard {
  constructor(rows, cols) {
    this.allCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.allRows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.occupiedCoordinates = [];
    this.bombedCoordinates = [];
    this.emptyCoordinates = [];
    this.ships = [];
  }

  placeShip(row, col, orientation, ship) {

  }

  receiveAttack(row, col) {

  }

  sunkAllShips() {

  }
}
