import {userImgLoad} from './popup.js';
import './form.js';
import {newImgLoad,setUserFormSubmit} from './form.js';
import {showGetError} from './user-message.js';
import {getData} from './api.js';

//Получение данных с сервера
getData(userImgLoad,showGetError);

//Создать событие отправки данных формы
setUserFormSubmit();

//Создать событие загрузки нового изображения для редактирования
//при открытия нового файла
newImgLoad();

