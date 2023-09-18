import player from './player';
import Gameboard from './gameboard';

export default function boardPicker() {
  const contentField = document.querySelector('.content');
  const middleHeading = document.querySelector('.middle-heading');
  const inputElement = document.querySelector('.name-input');
  const mainArea = document.querySelector('main');
  const logoImage = document.querySelector('header img');
  const xyButton = document.createElement('button');
  const wrapper = document.querySelector('.wrapper');
  const startButton = document.querySelector('.start-button');
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('grid-container');

  logoImage.style.width = '300px';
  middleHeading.textContent = `${player.name}, PLACE YOUR SHIPS`;
  middleHeading.style.marginTop = '40px';
  xyButton.textContent = 'AXIS: X';
  inputElement.parentNode.replaceChild(xyButton, inputElement);
  xyButton.classList.add('axis-button');
  wrapper.style.gap = '10px';
  mainArea.removeChild(startButton);
  mainArea.appendChild(gridContainer);

  const playerGameBoard = new Gameboard();
  playerGameBoard.showBoard();
}
