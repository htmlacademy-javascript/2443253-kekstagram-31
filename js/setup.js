import {createPhoto} from './data.js';
//Максимальное количество объектов фотографий
const PHOTOS_MAX_COUNT = 25;

//Создадим массив фото с описаниями
const createPhotoArray = ()=>{
  Array.from({length : PHOTOS_MAX_COUNT},createPhoto());
};
export {createPhotoArray};

