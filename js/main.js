function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getStringLength(stringCheck, maxLength) {
  return  stringCheck.length <= maxLength;
}
getStringLength('Привет',5);
getRandomPositiveInteger(40,90);
