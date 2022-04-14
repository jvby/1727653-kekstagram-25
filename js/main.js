import {ErrorMessage} from './constant.js';
import {createGallery, showFilters} from './gallery.js';
import {openUploadForm} from './upload-form.js';
import {getData} from './api.js';
import {showDownloadMessage} from './utils.js';

getData(
  (photos) => {
    createGallery(photos);
  },
  () => {
    showDownloadMessage(ErrorMessage.UPLOAD_ERROR);
  }
);

showFilters();

document.querySelector('#upload-file').addEventListener('change', openUploadForm);
