import { createWelcomeScreen } from './modules/dom';

createWelcomeScreen();

function reloadPage() {
  location.reload();
}

window.addEventListener('orientationchange', () => {
  reloadPage();
});
