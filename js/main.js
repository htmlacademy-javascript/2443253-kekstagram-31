import {userImgLoad} from './popup.js';
import {newImgLoad,setUserFormSubmit,closeNewPicture} from './form.js';
import {showErrorGet} from './user-modal.js';

const PHOTOS_MAX_COUNT = 25;

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((photos) => {
    //console.log(photos);
    userImgLoad(photos.slice(0,PHOTOS_MAX_COUNT));
  })
  .catch(() => showErrorGet());


//Событие закрытия формы загрузки
setUserFormSubmit(closeNewPicture);

//Загрузка нового изображения для редактирования (по  событию открытия нового файла)
newImgLoad();

