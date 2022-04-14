import {ServerAddress} from './constant.js';

//Получаем данные с сервера
const getData = (onSuccess, onFail) => {
  fetch(ServerAddress.GET)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
    });
};

//Отправляем данные на сервер
const sendData = (onSuccess, onFail, body) => {
  fetch(
    ServerAddress.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then(() => onSuccess())
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
