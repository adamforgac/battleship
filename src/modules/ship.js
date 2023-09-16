export default class Ship {
  constructor(length, orientation) {
    this.length = length;
    this.hitCounter = 0;
    this.sunk = false;
    this.orientation = orientation
  }

  hit() {
    this.hitCounter++;
  }

  isSunk() {
    if (this.hitCounter === this.length) {
      this.sunk = true;
    } else {
      this.sunk = false;
    }
  }
}
