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

  function clickHandler(e) {
    const classes = e.target.classList;
    const position = classes[1];

    if (classes.length < 3) {
      return;
    }

    const shipLength = shipSizes.shift();

    const shipOrientation = document.querySelector('.axis-button').textContent;

    hoverColors(shipOrientation, shipLength);

    if (checkShipValidity(shipOrientation, shipLength, position) && checkStatus(position, shipLength, shipOrientation, playerGameBoard)) {
      const ship = new Ship(shipLength, shipOrientation, position);
      playerGameBoard.ships.push(ship);
      playerGameBoard.placeImage(ship, 'grid-container-picker');
      if (shipSizes.length === 0) {
        gameField.removeEventListener('click', clickHandler);
        const backgroundAnimation = document.querySelector('.background-animation-space');
        backgroundAnimation.classList.add('background-animation');
        window.scrollTo(0, 0);
        setTimeout(() => {
          createMainGameField(playerGameBoard);
        }, 800);
        return;
      }
    } else {
      shipSizes.unshift(shipLength);
    }
  }

  // Add the event listener
  gameField.addEventListener('click', clickHandler);
}
