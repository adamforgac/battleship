/* eslint-disable no-useless-return */
import Ship from './ship';
import checkShipValidity from './spotValidator';
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
      console.log('completed');
      const ship = new Ship(shipLength, shipOrientation, position);
      playerGameBoard.ships.push(ship);
      playerGameBoard.placeImage(ship, 'grid-container-picker');
      if (shipSizes.length === 0) {
        // Remove the event listener when the condition is fulfilled
        gameField.removeEventListener('click', clickHandler);
        const backgroundAnimation = document.querySelector('.background-animation-space');
        backgroundAnimation.classList.add('background-animation');
        setTimeout(() => {
          createMainGameField(playerGameBoard);
        }, 800);
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
