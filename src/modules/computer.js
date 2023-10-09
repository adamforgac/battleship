import player from './player';

const computer = {
  generateMove(bombedArr) {
    let num1; let
      num2;
    let coordinate;

    do {
      num1 = Math.floor(Math.random() * 10) + 1;
      num2 = Math.floor(Math.random() * 10) + 1;
      coordinate = `cell-${num1}-${num2}`;
    } while (bombedArr.includes(coordinate));

    return coordinate;
  },

  playComputer(occupiedArr, bombedArr, playerBoard) {
    const domPlayerBoard = document.querySelector('.player-field');
    const coordinate = this.generateMove(bombedArr);
    console.log(coordinate);
    const domChosenSpot = domPlayerBoard.querySelector(`.${coordinate}`);

    if (occupiedArr.includes(coordinate)) {
      const hit = document.createElement('div');
      hit.classList.add('hit');
      domChosenSpot.appendChild(hit);
    } else {
      const noHit = document.createElement('div');
      noHit.classList.add('no-hit');
      domChosenSpot.appendChild(noHit);
    }

    bombedArr.push(coordinate);
    player.playStatus = true;
  },
};

export default computer;
