import Ship from './ship';

export default class Gameboard {
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

  placeShip(row, col, orientation, ship) {

  }

  receiveAttack(row, col) {

  }

  sunkAllShips() {

  }
}
