function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function checkStringLength(stringCheck, maxLength) {
  return  stringCheck.length <= maxLength;
}

checkStringLength('Привет',5);

export {getRandomPositiveInteger, checkStringLength};
