/* eslint-disable class-methods-use-this */
export default class Gameboard {
  constructor() {
    this.occupiedCoordinates = [];
    this.bombedCoordinates = [];
    this.ships = [];
  }

  updateBombed(bombedItem) {
    this.bombedCoordinates.push(bombedItem);
  }

  updateCoordinates(occupiedItem) {
    this.occupiedCoordinates.push(occupiedItem);
  }

  markSunkShips(ship, field) {
    const classes = [];
    const playField = document.querySelector(`.${field}`);
    const startPosition = ship.position;
    const givenLength = ship.length;
    const [prefix, row, col] = startPosition.split('-');
    if (ship.orientation === 'AXIS: X') {
      for (let i = 0; i < givenLength; i++) {
        classes.push(`${prefix}-${row}-${Number(col) + i}`);
      }
    } else {
      for (let i = 0; i < givenLength; i++) {
        classes.push(`${prefix}-${Number(row) + i}-${col}`);
      }
    }

    classes.forEach((cellString) => {
      const element = playField.querySelector(`.${cellString}`);
      element.classList.add('sank');
    });
  }

  checkOccupied(row, col, orientation, length) {
    if (orientation === 'AXIS: X') {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row}-${col + i}`;
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        const spot = `cell-${row + i}-${col}`;
        if (this.occupiedCoordinates.includes(spot)) {
          return true;
        }
      }
    }

    return false;
  }

  // CREATES THE GAME GRID IN DOM

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

  showCurrentSize() {
    const infoArr = [this.ships[this.ships.length - 1], this.ships[this.ships.length - 2]];
    return infoArr;
  }

  placeImage(ship, gameField, status, oldImage) {
    let gap = 4;
    if (window.innerWidth < 1070) gap = 2;
    const gridCell = document.querySelector('.grid-cell');
    const cellSize = gridCell.offsetWidth;
    const positionParts = ship.position.split('-');
    const row = Number(positionParts[1]);
    const col = Number(positionParts[2]);
    let leftMargin;
    let topMargin;
    const finalSize = ((cellSize + gap) * ship.length);
    const field = document.querySelector(`.${gameField}`);
    const startingPoint = field.querySelector(`.${ship.position}`);
    const imageToRemove = startingPoint.querySelector('img');
    const shipImage = document.createElement('img');
    if (ship.orientation === 'AXIS: X') {
      shipImage.classList.add('ship-image-x');
      topMargin = (gridCell.offsetWidth + gap) * (row - 1);
      leftMargin = (gridCell.offsetWidth + gap) * (col - 1);
    } else {
      shipImage.classList.add('ship-image-y');
      topMargin = (gridCell.offsetWidth + gap) * (row - 1);
      leftMargin = (gridCell.offsetWidth + gap) * (col - 1);
    }
    shipImage.style.width = `${finalSize}px`;
    shipImage.style.top = `${topMargin}px`;
    shipImage.style.left = `${leftMargin}px`;
    if (oldImage) {
      imageToRemove.remove();
    }
    if (status) {
      if (ship.length === 2) shipImage.classList.add(`length-${2}`);
      shipImage.src = `images/${ship.length}-ship-dead.png`;
    } else {
      if (ship.length === 2) shipImage.classList.add(`length-${2}`);
      shipImage.src = `images/${ship.length}-ship.png`;
    }
    startingPoint.appendChild(shipImage);
  }
}
