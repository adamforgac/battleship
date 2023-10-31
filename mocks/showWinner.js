export default function showWinner(botOccupied, playerOccupied, botBombed, playerBombed) {
  // Mocking occupied and bombed coordinates for bot and player
  const botOccupiedCoordinates = botOccupied;
  const botBombedCoordinates = botBombed;
  const playerOccupiedCoordinates = playerOccupied;
  const playerBombedCoordinates = playerBombed;

  const playerWin = botOccupiedCoordinates.every((item) => botBombedCoordinates.includes(item));
  const botWin = playerOccupiedCoordinates.every((item) => playerBombedCoordinates.includes(item));

  if (playerWin) {
    return 'player won';
  } if (botWin) {
    return 'computer won';
  }
  return 'no winner yet';
}
