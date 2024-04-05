import {getRandomIntegerFromArray} from './utils.js';


const COUNT_RANDOM_FOTO = 10;


//Выбор случайных фото
const randomizePhotos = (photos) => {
  const randomPhotos = [];
  const newIndexArray = getRandomIntegerFromArray(photos);
  let newIndex;
  //Отрисуем аватарки
  for(let i = 0; i < COUNT_RANDOM_FOTO; i++){
    newIndex = newIndexArray();
    if (newIndex >= 0){
      randomPhotos.push(photos[newIndex]);
    }
  }
  return randomPhotos;
};

//Сортировка фото по убыванию количества комментариев
const sortPhotos = (photos) => photos.sort((a,b) => (b.comments.length - a.comments.length));

export{randomizePhotos,sortPhotos};
