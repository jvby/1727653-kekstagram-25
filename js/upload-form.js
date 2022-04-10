import {isEscapeKey} from './utils.js';
import {ErrorMessage, MAX_HASHTAG_COUNT, ZoomRange, DESCRIPTION_LENGTH_FIELD, ZoomControlButtonClass, HASHTAG_MASK} from './constant.js';
const scaleBlock = document.querySelector('.img-upload__scale');
const imgPreviewPhoto = document.querySelector('.img-upload__preview img');
const scaleValue = document.querySelector('.scale__control--value');
const uploadForm = document.querySelector('#upload-select-image');
const uploadFormOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');
const descriptionField = document.querySelector('.text__description');
const hashtagsField = document.querySelector('.text__hashtags');
const effectsList = document.querySelector('.effects__list');
const body = document.querySelector('body');

//Подключаем Pristine
const formValidation = new Pristine(uploadForm, {
  classTo: 'upload-image__validate', // Элемент, на который будут добавляться классы
  errorTextParent: 'upload-image__validate', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error-text',
});

//Предварительно подготавливаем массив с хештегами
const cleanText = (text) => {
  text = text.toLowerCase().trim();
  for (let i = 1; i < text.length; i++) {
    text = text.replace('  ',' ');
  }
  return text;
};

//Получаем элемент массива хештегов и проверяем его регуляркой
const validateHashtagByMask = (hashtagItem) => HASHTAG_MASK.test(hashtagItem);

//Пробегаемся по каждому элементу массива хештегов и отправляем элемент на проверку регулярным выражением
const validateRegExp = (hashtags) => hashtags.every(validateHashtagByMask);

//Проверяем количество шештегов
const validateHashtagsCount = (hashtags) => hashtags.length <= MAX_HASHTAG_COUNT;

//Проверяем массив хештегов на дубликаты
const validateNoDuplicateItem = (hashtags) => {
  const hashtagsList = hashtags.slice().sort();

  for (let i = 0; i < hashtagsList.length; i++) {
    if (hashtagsList[i] === hashtagsList[i + 1]) {
      return false;
    }
  }
  return true;
};

//Проверяем поле description на длинну
const validateDescriptionLength = () => {
  const description = descriptionField.value.length;
  if (description <= DESCRIPTION_LENGTH_FIELD) {
    return true;
  } else {
    return false;
  }
};

//Проверяем хештеги
const validateHashtags = () => {
  let hashtagsList = hashtagsField.value;

  hashtagsList = cleanText(hashtagsList);

  if (hashtagsList === '') {
    return true;
  }

  hashtagsList = hashtagsList.split(' ');

  const isHashtagsListLengthValid = validateHashtagsCount(hashtagsList);
  const isRegExpValid = validateRegExp(hashtagsList);
  const hasNoDuplicates = validateNoDuplicateItem(hashtagsList);
  const validationResult = isHashtagsListLengthValid && isRegExpValid && hasNoDuplicates;
  return validationResult;
};


//Управляем процентом увеличения картинки
const controlScale = (evt) => {
  evt.preventDefault();
  let scale = Number(scaleValue.value.split('%')[0]);
  if (evt.target.matches(ZoomControlButtonClass.REDUCE)&& scale > ZoomRange.MIN) {
    scale = scale - ZoomRange.STEP;
    scaleValue.value = `${scale}%`;
    imgPreviewPhoto.style.transform = `scale(${scale/100})`;
  } if (evt.target.matches(ZoomControlButtonClass.INCREASE)&& scale < ZoomRange.MAX) {
    scale = scale + ZoomRange.STEP;
    scaleValue.value = `${scale}%`;
    imgPreviewPhoto.style.transform = `scale(${scale/100})`;
  }
};

//Проверяем, что нажата кнопка Escape, и не в фокусе поле хештегов или описания
function closeFormKeydown (evt) {
  if (isEscapeKey(evt) && evt.target !== descriptionField && evt.target !== hashtagsField) {
    closeForm(evt);
  }
}

//Коллбек обработчика событий закрытия формы отправки кнопкой Escape
const onZoomControlButtonClick = (evt) => {
  controlScale(evt);
};

//Коллбек обработчика событий закрытия формы отправки кнопкой Escape
const onFormEscKeydown = (evt) => {
  closeFormKeydown(evt);
};

//Коллбек обработчика события отправки формы
const formSubmitHandler = (evt) => {
  submitForm(evt);
};

//Коллбек обработчика событий закрытия формы
const onCloseButtonClick = (evt) => {
  closeForm(evt);
};


//Закрываем форму загрузки фотографий
function closeForm (evt) {
  evt.preventDefault();
  uploadFormOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  descriptionField.value = '';
  hashtagsField.value = '';
  closeButton.removeEventListener('click', onCloseButtonClick);
  uploadForm.removeEventListener('submit', formSubmitHandler);
  document.removeEventListener('keydown', onFormEscKeydown);
  scaleBlock.removeEventListener('click', onZoomControlButtonClick);
  formValidation.reset();
}

// Отправляем форму и проводим валидацию
function submitForm (evt) {
  if(!formValidation.validate()) {
    evt.preventDefault();
    hashtagsField.value = '';
  } else {
    body.classList.remove('modal-open');
    closeButton.removeEventListener('click', onCloseButtonClick);
    uploadForm.removeEventListener('submit', formSubmitHandler);
    document.removeEventListener('keydown', onFormEscKeydown);
    scaleBlock.removeEventListener('click', onZoomControlButtonClick);
  }
}

//Ловим событие переключения чекбокса
const onEffectCheckboxChange = (evt) => {
  evt.preventDefault();
  if (evt.target.matches('input[type="radio"]')) {
    imgPreviewPhoto.className = '';
    imgPreviewPhoto.classList.add(`effects__preview--${evt.target.value}`);
  }
};

//Открываем форму загрузки изображения
const openUploadForm = () => {
  uploadFormOverlay.classList.remove('hidden');
  scaleValue.value = `${ZoomRange.DEFAULT}%`;
  imgPreviewPhoto.className = '';
  imgPreviewPhoto.style.transform = `scale(${ZoomRange.DEFAULT/100})`;
  closeButton.addEventListener('click', onCloseButtonClick);
  uploadForm.addEventListener('submit', formSubmitHandler);
  document.addEventListener('keydown', onFormEscKeydown);
  scaleBlock.addEventListener('click', onZoomControlButtonClick);
  effectsList.addEventListener('change', onEffectCheckboxChange);
  body.classList.add('modal-open');
  formValidation.addValidator(hashtagsField, validateHashtags, ErrorMessage.HASHTAG_VALIDATION);
  formValidation.addValidator(descriptionField, validateDescriptionLength, ErrorMessage.DESCRIPTION_LENGTH);
};

export {openUploadForm};
