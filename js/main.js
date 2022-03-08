function getRandomIntInclusive(min, max) {
  if (min >= max) {
    console.log("Неверные значения!");
  } else {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function stringLength(stringCheck, maxLength) {
  return  stringCheck.length <= maxLength;
}
console.log(stringLength("Привет",5));
console.log(getRandomIntInclusive(40,90));
