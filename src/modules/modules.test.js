import Ship from './ship';
import Gameboard from './gameboard';
import checkStatus from './availabilityValidator';
import showWinner from '../../mocks/showWinner';
import markSunkShips from '../../mocks/markSunkShips';
import checkShipValidity from './spotValidator';

const { JSDOM } = require('jsdom');

const { document } = new JSDOM('<!doctype html><html><body></body></html>').window;

global.document = document;

global.window = {
  innerWidth: 1024, // Set the width to your desired value.
};

jest.mock('./determineWinner', () => ({
  __esModule: true,
  default: (botBoard, playerBoard) => 'player won', // Mock the function's return value
}));

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
    expect(ship.isSunk()).toBe(false);
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

    expect(ship.isSunk()).toBe(true);
  });
});

describe('Gameboard', () => {
  let gameboard;
  let ship1;
  let ship2;
  let ship3;
  let ship4;

  beforeEach(() => {
    gameboard = new Gameboard();
    gameboard.updateCoordinates('cell-2-3');

    const ship1 = new Ship(2, 'AXIS: X', 'cell-4-2');
    gameboard.ships.push(ship1);

    const ship2 = new Ship(3, 'AXIS: Y', 'cell-2-5');
    gameboard.ships.push(ship2);

    const ship3 = new Ship(4, 'AXIS: X', 'cell-7-3');
    gameboard.ships.push(ship3);

    const ship4 = new Ship(3, 'AXIS: X', 'cell-1-3');
    gameboard.ships.push(ship4);
  });

  it('Adds the occupied items to the array', () => {
    expect(gameboard.occupiedCoordinates).toEqual(['cell-2-3']);
  });

  it('Checks if the location is occupied or not', () => {
    expect(gameboard.checkOccupied(2, 3, 'AXIS: X', 3)).toBe(true);
    expect(gameboard.checkOccupied(2, 10, 'AXIS: Y', 2)).toBe(false);
  });

  it('Generates the game board in the DOM', () => {
    const fieldElement = document.createElement('div');

    const querySelectorMock = jest.fn((selector) => {
      if (selector === '.game-field') {
        return fieldElement;
      }
    });
    document.querySelector = querySelectorMock;

    gameboard.showBoard('game-field');

    expect(fieldElement.querySelectorAll('.grid-cell').length).toBe(100);
  });

  it('Returns the last two ships in the "ships" array', () => {
    const ship1 = new Ship(2, 'AXIS: X', 'cell-4-2');
    gameboard.ships.push(ship1);

    const ship2 = new Ship(3, 'AXIS: Y', 'cell-2-5');
    gameboard.ships.push(ship2);

    const ship3 = new Ship(4, 'AXIS: X', 'cell-7-3');
    gameboard.ships.push(ship3);

    const result = gameboard.showCurrentSize();

    expect(result).not.toContain(ship1);
    expect(result).toContain(ship2);
    expect(result).toContain(ship3);
  });

  it('Returns true if the provided position is unoccupied and updates the occupied coordinates', () => {
    const gameboard = new Gameboard();

    const newPosition = 'cell-2-3';
    const length = 3;
    const orientation = 'AXIS: X';

    const result = checkStatus(newPosition, length, orientation, gameboard);

    expect(result).toBe(true);

    expect(gameboard.occupiedCoordinates).toEqual(['cell-2-3', 'cell-2-4', 'cell-2-5']);
  });

  it('Returns false if the provided position is already occupied', () => {
    const gameboard = new Gameboard();
    gameboard.updateCoordinates('cell-2-3');

    const newPosition = 'cell-2-3';
    const length = 3;
    const orientation = 'AXIS: X';

    const result = checkStatus(newPosition, length, orientation, gameboard);

    expect(result).toBe(false);
  });

  it('return array of elements with sank class', () => {
    const ship4 = new Ship(3, 'AXIS: X', 'cell-1-3');
    gameboard.ships.push(ship4);

    const result = markSunkShips(ship4);

    expect(result).toEqual(['cell-1-3', 'cell-1-4', 'cell-1-5']);
  });

  it('checks if the ship fits inside the game board', () => {
    gameboard.ships.push(ship4);
    const result = checkShipValidity("AXIS: X", 3, "cell-2-4");
    const result2 = checkShipValidity("AXIS: X", 5, "cell-5-7");
    expect(result).toEqual(true);
    expect(result2).toEqual(false);
  });
  
});

describe('showWinner', () => {
  it('should return "player won" when occupied positions and bot positions from bot are the same', () => {
    const resultPlayer = showWinner([1, 2, 3, 4, 5], [3, 4, 1, 5, 8], [1, 2, 3, 4, 5], [3, 1, 4]);

    expect(resultPlayer).toBe('player won');
  });

  it('should return "computer won" when occupied positions and bombed positions from player are the same', () => {
    const resultComputer = showWinner([1, 5, 8, 4, 9], [1, 2, 3, 4, 5], [1, 4, 5], [1, 2, 3, 4, 5]);

    expect(resultComputer).toBe('computer won');
  });

  it('should return "no winner yet" both bombed positions from computer and player are different to their occupied positions', () => {
    const resultComputer = showWinner([1, 2, 3], [3, 8, 5], [1, 2], [8, 5]);

    expect(resultComputer).toBe('no winner yet');
  });
});
