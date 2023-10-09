const player = {
  playPlayer(event, playerBoard, botBoard) {
    const domBotBoard = document.querySelector('.bot-field');
    const clickedElement = event.target;
    const classes = clickedElement.classList;
    const classesArray = Array.from(classes);
    if (classesArray.includes('grid-cell') && !botBoard.bombedCoordinates.includes(classesArray[1])) {
      const chosenSpot = classesArray[1];
      if (botBoard.occupiedCoordinates.includes(chosenSpot)) {
        const spotIndex = botBoard.occupiedCoordinates.indexOf(chosenSpot);
        botBoard.occupiedCoordinates.splice(spotIndex, 1);

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
      this.playStatus = false;
      return true;
    } else {
      return false;
    }
  },

  playStatus: true,
};

export default player;
