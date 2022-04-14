import { showBigPicture } from './big-picture-modal.js';
import { getRandomPositiveInteger, debounce } from './utils.js';
import { RENDER_DELAY } from './constant.js';

const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const previewFilterElement = document.querySelector('.img-filters');
const previewFilterButtons = document.querySelectorAll('.img-filters__button');
const defaultPreviewFilter = document.querySelector('#filter-default');
const randomPreviewFilter = document.querySelector('#filter-random');
const discussedPreviewFilter = document.querySelector('#filter-discussed');
let photosFromServer = [];
let photos = [];

//Обрабатываем событие и ловим id, по нему ищем фотку и вызываем функцию открытия большого окна
const onGalleryPictureClick = (evt) =>{
  if (!evt.target.matches('.picture__img')) {
    return;
  }
  evt.preventDefault();
  showBigPicture(photos[photos.findIndex((photo) => photo.id === Number(evt.target.id))]);
};

//Создаем галерею и навешиваем обработчик через делегирование на открытиебольшой картинки
const createGallery = (pictures) => {
  photosFromServer = pictures.slice();
  photos = pictures.slice();
  pictures.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });
  picturesList.appendChild(picturesListFragment);
  picturesList.addEventListener('click', onGalleryPictureClick);
};

//Создаем фильтрованную галерею и навешиваем обработчик через делегирование на открытиебольшой картинки
const createFilteredGallery = (pictures) => {
  pictures.forEach(({id, url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });
  picturesList.appendChild(picturesListFragment);
};

//Показываем фотки с сервера в исходном виде
const showDefaultPreviews = (evt) => {
  evt.preventDefault();
  const defaultList = photosFromServer.slice();
  const oldPreviews = document.querySelectorAll('a.picture');

  oldPreviews.forEach((element) => element.remove());

  previewFilterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  photos = defaultList.slice();

  createFilteredGallery(defaultList);
};

//Показываем 10 случайных
const showRandomPreviews = (evt) => {
  evt.preventDefault();
  const rareList = photosFromServer.slice();
  const randomList = [];

  for (let i = 0; i < 10; i++) {
    const index = getRandomPositiveInteger(0, rareList.length - 1);
    randomList[i] = rareList[index];
    rareList.splice(index, 1);
  }

  const oldPreviews = document.querySelectorAll('a.picture');
  oldPreviews.forEach((element) => element.remove());

  previewFilterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  photos = randomList.slice();

  createFilteredGallery(randomList);
};

//Показываем самые обсуждаемые фотографии
const showDiscussedPreviews = (evt) => {
  evt.preventDefault();
  const discussedList = photosFromServer.slice();
  discussedList.sort((a, b) => {
    if (a.comments > b.comments) {
      return -1;
    }
    if (a.comments < b.comments) {
      return 1;
    }

    return 0;
  });

  const oldPreviews = document.querySelectorAll('a.picture');
  oldPreviews.forEach( (element) => element.remove() );

  previewFilterButtons.forEach((element) => element.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
  photos = discussedList.slice();

  createFilteredGallery(discussedList);
};

//Активируем фильтры
const showFilters = () => {
  previewFilterElement.classList.remove('img-filters--inactive');

  defaultPreviewFilter.addEventListener('click', debounce(
    showDefaultPreviews,
    RENDER_DELAY,
  ));
  randomPreviewFilter.addEventListener('click', debounce(
    showRandomPreviews,
    RENDER_DELAY,
  ));
  discussedPreviewFilter.addEventListener('click', debounce(
    showDiscussedPreviews,
    RENDER_DELAY,
  ));
};

export {createGallery, showFilters};
