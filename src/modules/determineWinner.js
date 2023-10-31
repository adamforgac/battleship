import { callWinner } from './dom';

function updateDom(winner) {
  const wrapper = document.querySelector('.wrapper');

  if (winner === 'player') {
    window.scrollTo(0, 0);
    wrapper.innerHTML = '';
    callWinner('player');
  } else if (winner === 'computer') {
    window.scrollTo(0, 0);
    wrapper.innerHTML = '';
    callWinner('computer');
  }
}

export default function showWinner(botBoard, playerBoard) {
  const playerWin = botBoard.occupiedCoordinates.every((item) => botBoard.bombedCoordinates.includes(item));
  const botWin = playerBoard.occupiedCoordinates.every((item) => playerBoard.bombedCoordinates.includes(item));

  if (playerWin) {
    updateDom('player');
    return 'player won';
  } if (botWin) {
    updateDom('computer');
    return 'computer won';
  }
  return 'No winner yet';
}
