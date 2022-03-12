function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function stringLength(stringCheck, maxLength) {
  return  stringCheck.length <= maxLength;
}
stringLength('Привет',5);

const NAME = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Гуляю',
  'На море',
  'Сижу дома',
  'Отдыхаю',
  'Хорошая погода',
  'С друзьями',
  'С новой прической',
];

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomPositiveInteger(0, elements.length - 1)];
  return element;
};

const createComment = (idNumber) => {
  const comment = {
    id: idNumber,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENT),
    name: getRandomArrayElement(NAME),
  };
  return comment;
};

const createPhoto = (idNumber) => {
  const photo = {
    id: idNumber,
    url: `photos/${idNumber}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomPositiveInteger(15, 200),
    comments: Array.from({length: getRandomPositiveInteger(1, 10)}, (v,i) => createComment(i+1)),
  };
  return photo;
};

const photoArrayCount = 25;

const photoArray = () => Array.from({length: photoArrayCount}, (v,i) => createPhoto(i+1));
photoArray();
