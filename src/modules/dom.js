import player from './player';
import boardPicker from './board-generator';

export default function createDom() {
  const startButton = document.querySelector('.start-button');
  const nameInput = document.querySelector('.name-input');
  const alertText = document.querySelector('.alert-text');

  startButton.addEventListener('click', () => {
    if (nameInput.value === '') {
      alertText.style.color = 'red';
    } else {
      player.name = `${nameInput.value}`;
      alertText.style.display = 'none';
      boardPicker();
    }
  });
}
