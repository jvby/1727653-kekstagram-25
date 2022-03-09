function getRandomIntInclusive(min, max) {
  if (min >= max || min < 0) {
    return 'Unexpected data!';
  } else {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function stringLength(stringCheck, maxLength) {
  return  stringCheck.length <= maxLength;
}
stringLength('Привет',5);
getRandomIntInclusive(40,90);
