const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Гуляю',
  'На море',
  'Сижу дома',
  'Отдыхаю',
  'Хорошая погода',
  'С друзьями',
  'С новой прической',
];

const PHOTO_ARRAY_COUNT = 25;

const START_ID = 0;

function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function checkStringLength(stringCheck, maxLength) {
  return  stringCheck.length <= maxLength;
}

checkStringLength('Привет',5);

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomPositiveInteger(0, elements.length - 1)];
  return element;
};

const createComment = (id) => {
  const comment = {
    id: id,
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES),
  };
  return comment;
};

function createCommentsArray(count, id) {
  const comments = Array.from({length: count}, () => {
    id++;
    return createComment(id);
  });
  return comments;
}

const createPhoto = (id) => {
  const photo = {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(15, 200),
    comments: createCommentsArray(getRandomPositiveInteger(1, 10), START_ID),
  };
  return photo;
};

const createPhotoArray = (count, id) => Array.from({length: count}, () => {
  id++;
  return createPhoto(id);
});

createPhotoArray(PHOTO_ARRAY_COUNT, START_ID);
