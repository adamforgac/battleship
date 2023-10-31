export default class Ship {
  constructor(length, orientation, position) {
    this.length = length;
    this.hitCounter = 0;
    this.orientation = orientation;
    this.position = position;
  }

  hit() {
    this.hitCounter++;
  }

  isSunk() {
    return this.hitCounter === this.length;
  }
}
