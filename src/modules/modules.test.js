import Ship from './ship';
import Gameboard from './gameboard';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  it('should have a length property', () => {
    expect(ship.length).toBe(3);
  });

  it('should has no hit', () => {
    expect(ship.hitCounter).toBe(0);
  });

  it('should not be sunk', () => {
    expect(ship.sunk).toBe(false);
  });

  it('should increase the hitCounter', () => {
    ship.hit();
    ship.hit();
    expect(ship.hitCounter).toBe(2);
  });

  it('should be sunk if hitCounter equals to length', () => {
    ship.hit();
    ship.hit();
    ship.hit();

    ship.isSunk();

    expect(ship.sunk).toBe(true);
  });
});

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it('gives the ship the coordinates', () => {
    expect(gameboard.occupiedCoordinates).toEqual([]);
  });
});
