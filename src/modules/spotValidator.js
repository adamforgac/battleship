export default function checkShipValidity(axis, length, position) {
  console.log(position);
  const realSize = length - 1;
  const axisParts = position.split('-');
  const row = Number(axisParts[1]);
  const col = Number(axisParts[2]);
  if (axis === 'AXIS: X') {
    console.log(row);
    console.log(col);
    console.log(col - realSize);
    if ((col + realSize > 10)) {
      return false;
    }
    return true;
  } if (axis === 'AXIS: Y') {
    if ((row + realSize > 10)) {
      return false;
    }
    return true;
  }
}