import {openBigPicture} from './big-picture-modal.js';
const picturesList = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createGallery = (pictures) => {
  pictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__comments').textContent = likes;
    pictureElement.querySelector('.picture__likes').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });
  picturesList.appendChild(picturesListFragment);
  const picture = document.querySelectorAll('.picture');
  openBigPicture (picture);
};

export {createGallery, picturesList};
