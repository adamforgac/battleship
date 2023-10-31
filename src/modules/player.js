import showWinner from './determineWinner';

const player = {
  playerAttack(event, playerBoard, botBoard) {
    const domBotBoard = document.querySelector('.bot-field');
    const clickedElement = event.target;
    const classes = clickedElement.classList;
    const classesArray = Array.from(classes);
    if (classesArray.includes('grid-cell') && !botBoard.bombedCoordinates.includes(classesArray[1])) {
      const chosenSpot = classesArray[1];
      if (botBoard.occupiedCoordinates.includes(chosenSpot)) {
        const spotIndex = botBoard.occupiedCoordinates.indexOf(chosenSpot);
        let shipHit;

        if (spotIndex >= 0 && spotIndex < 5) {
          shipHit = botBoard.ships[0];
        } else if (spotIndex < 9) {
          shipHit = botBoard.ships[1];
        } else if (spotIndex < 12) {
          shipHit = botBoard.ships[2];
        } else if (spotIndex < 15) {
          shipHit = botBoard.ships[3];
        } else {
          shipHit = botBoard.ships[4];
        }

        shipHit.hit();

        if (shipHit.isSunk()) {
          botBoard.placeImage(shipHit, 'bot-field', true);
        }

        const domChosenSpot = domBotBoard.querySelector(`.${chosenSpot}`);
        const hit = document.createElement('div');
        hit.classList.add('hit');
        domChosenSpot.appendChild(hit);
      } else {
        const domChosenSpot = domBotBoard.querySelector(`.${chosenSpot}`);
        const noHit = document.createElement('div');
        noHit.classList.add('no-hit');
        domChosenSpot.appendChild(noHit);
      }
      botBoard.bombedCoordinates.push(chosenSpot);

      setTimeout(showWinner, 1000, botBoard, playerBoard);

      this.playStatus = false;

      return true;
    }
    return false;
  },

  playStatus: true,
};

export default player;
