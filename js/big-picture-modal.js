import {isEscapeKey} from './utils.js';
import {ONE_TIME_BIG_PICTURE_COMMENTS} from './constant.js';


const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const urlBigPicture = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentList = bigPicture.querySelector('.social__comments');
const description = bigPicture.querySelector('.social__caption');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const picturesContainer = document.querySelector('.pictures');
const body = document.querySelector('body');
const commentsNumberView = document.querySelector('.social__comment-count');
const commentsLoaderButton = document.querySelector('.comments-loader');
let commentsNumber = 0;
//let commentsContent = [];

//Закрываем большое окно
function closeBigPicture (evt)  {
  evt.preventDefault();
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click',  closeBigPicture);
  document.removeEventListener('keydown', closeBigPictureEscKeydown);
  body.classList.remove('modal-open');
}

//Проверяем, что нажали Escape для закрытия окна, и вызываем функцию закрытия окна
function closeBigPictureEscKeydown (evt)  {
  if (isEscapeKey(evt)) {
    closeBigPicture(evt);
  }
}

//Показываем коментарии к большой картинке
const showComments = (comments, number) => {
  //const finishIndex = commentsNumber + number - 1;
  for (let i = commentsNumber; number >= 1 ; i++) {
    if (i >= comments.length) {
      commentsLoaderButton.classList.add('hidden');
      break;
    }
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('img').src = comments[i].avatar;
    commentElement.querySelector('img').alt = comments[i].name;
    commentElement.querySelector('p').textContent = comments[i].message;
    commentList.appendChild(commentElement);
    number--;
    commentsNumber++;
  }
  //commentsNumberView.textContent = commentsNumber;
};


//Добавляем атрибуты для окна с большой картинкой
const addBigPictureAttributes = (photo) =>{
  urlBigPicture.src = photo.url;
  urlBigPicture.alt = photo.description;
  likesCount.textContent = photo.likes;
  description.textContent = photo.description;
  commentsCount.textContent = photo.comments.length;
  commentList.innerHTML = '';
  commentsLoaderButton.classList.remove('hidden');
  commentsNumber = 0;
  showComments(photo.comments, ONE_TIME_BIG_PICTURE_COMMENTS);
  commentsLoaderButton.addEventListener('click',  showComments(photo.comments, ONE_TIME_BIG_PICTURE_COMMENTS));
};


// Добаввляем обработчик событий на галерею для открытия большой картинки
const openBigPicture = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      evt.preventDefault();
      const id = evt.target.id;
      const index = id - 1;
      addBigPictureAttributes(photos[index]);
      bigPicture.classList.remove('hidden');
      bigPictureCancel.addEventListener('click',  closeBigPicture);
      document.addEventListener('keydown', closeBigPictureEscKeydown);
      //commentsLoaderButton.addEventListener('click',  showComments(commentsContent, ONE_TIME_BIG_PICTURE_COMMENTS));
      body.classList.add('modal-open');
    }
  });
};


export {openBigPicture};
