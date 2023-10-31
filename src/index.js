import { createWelcomeScreen } from './modules/dom/dom';

createWelcomeScreen();

function reloadPage() {
  location.reload();
}

window.addEventListener('orientationchange', () => {
  reloadPage();
});
