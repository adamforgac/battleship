/* eslint-disable no-useless-return */
import Ship from './ship';
import checkShipValidity from './spotValidator';
import createImage from './imageCreator';
import Gameboard from './gameboard';
import checkStatus from './availabilityValidator';
import { createMainGameField, hoverColors } from './dom';

export default function shipListener(className, playerGameBoard) {
  const shipSizes = [5, 4, 3, 3, 2];
  const allShips = [];
  const gameField = document.querySelector(`.${className}`);
  hoverColors('AXIS: X', 5);

  // Define the event listener function
  function clickHandler(e) {
    const classes = e.target.classList;
    const position = classes[1];

    if (classes.length < 3) {
      // does not count if the user clicks on the gap
      return;
    }

    const shipLength = shipSizes.shift();

    const shipOrientation = document.querySelector('.axis-button').textContent;

    hoverColors(shipOrientation, shipLength);

    if (checkShipValidity(shipOrientation, shipLength, position) && checkStatus(position, shipLength, shipOrientation, playerGameBoard)) {
      // creates image
      console.log('completed');
      const ship = new Ship(shipLength, shipOrientation, position);
      playerGameBoard.placeShip(ship);
      if (shipSizes.length === 0) {
        // Remove the event listener when the condition is fulfilled
        gameField.removeEventListener('click', clickHandler);
        createMainGameField(playerGameBoard);
        return;
      }
      console.log(shipSizes);
    } else {
      console.log('occupied');
      shipSizes.unshift(shipLength);
      console.log(shipSizes);
    }
  }

  // Add the event listener
  gameField.addEventListener('click', clickHandler);
}
