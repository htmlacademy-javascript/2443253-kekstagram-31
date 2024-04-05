import {loadUserImg} from './avatars.js';
//import './form.js';
import {loadNewImg,setUserFormSubmit} from './form.js';
import {showGetError} from './user-message.js';
import {getData} from './api.js';

//Максимальное количество загружаемых фото
const PHOTOS_MAX_COUNT = 25;


//Получение данных с сервера
getData(loadUserImg,showGetError)
  .then((photos) => {
    loadUserImg(photos.slice(0,PHOTOS_MAX_COUNT));
  })
  .catch(() => showGetError());

//Создать событие отправки данных формы
setUserFormSubmit();

//Создать событие загрузки нового изображения для редактирования
//при открытия нового файла
loadNewImg();

