export default function checkStatus(
    newPosition,
    length,
    orientation,
    playBoard,
  ) {
    const axisParts = newPosition.split('-');
    const row = Number(axisParts[1]);
    const col = Number(axisParts[2]);
    const checkOccupiedMock = jest.fn();
    const updateCoordinatesMock = jest.fn();
  
    playBoard.checkOccupied = checkOccupiedMock;
    playBoard.updateCoordinates = updateCoordinatesMock;
  
    if (!playBoard.checkOccupied(row, col, orientation, length)) {
      if (orientation === 'AXIS: X') {
        for (let i = 0; i < length; i++) {
          playBoard.updateCoordinates(`cell-${row}-${col + i}`);
        }
      } else if (orientation === 'AXIS: Y') {
        for (let i = 0; i < length; i++) {
          playBoard.updateCoordinates(`cell-${row + i}-${col}`);
        }
      }
      playBoard.checkOccupied();
      return true;
    }
  
    return false;
  }