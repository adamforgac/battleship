import computer from './computer';
import player from './player';

export default function gameLoop(playerBoard, botBoard) {
  const domBotBoard = document.querySelector('.bot-field');

  domBotBoard.addEventListener('click', (e) => {
    if (player.playStatus) {
      const round = player.playPlayer(e, playerBoard, botBoard);

      if (round) {
        setTimeout(() => {
          computer.playComputer(playerBoard.occupiedCoordinates, playerBoard.bombedCoordinates, playerBoard);
        }, 1000);
      }
    }
  });
}
