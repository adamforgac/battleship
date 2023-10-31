import computer from './computer';
import player from './player';
import { callWinner } from './dom';

// MANAGES THE FLOW OF THE GAME

export default function gameLoop(playerBoard, botBoard) {
  const domBotBoard = document.querySelector('.bot-field');

  domBotBoard.addEventListener('click', (e) => {
    if (player.playStatus) {
      const round = player.playerAttack(e, playerBoard, botBoard);

      if (round) {
        setTimeout(() => {
          computer.playComputer(
            playerBoard.occupiedCoordinates,
            playerBoard.bombedCoordinates,
            playerBoard,
            botBoard,
          );
        }, 1000);
      }
    }
  });
}
