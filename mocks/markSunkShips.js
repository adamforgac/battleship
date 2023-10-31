export default function markSunkShips(ship) {
  const classes = [];
  const startPosition = ship.position;
  const givenLength = ship.length;
  const [prefix, row, col] = startPosition.split('-');

  if (ship.orientation === 'AXIS: X') {
    for (let i = 0; i < givenLength; i++) {
      classes.push(`${prefix}-${row}-${Number(col) + i}`);
    }
  } else {
    for (let i = 0; i < givenLength; i++) {
      classes.push(`${prefix}-${Number(row) + i}-${col}`);
    }
  }

  return classes;
}
