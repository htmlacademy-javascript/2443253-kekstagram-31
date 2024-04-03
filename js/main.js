import {loadUserImg} from './avatars.js';
//import './form.js';
import {loadNewImg,setUserFormSubmit} from './form.js';
import {showGetError} from './user-message.js';
import {getData} from './api.js';

//Получение данных с сервера
getData(loadUserImg,showGetError);

//Создать событие отправки данных формы
setUserFormSubmit();

//Создать событие загрузки нового изображения для редактирования
//при открытия нового файла
loadNewImg();

