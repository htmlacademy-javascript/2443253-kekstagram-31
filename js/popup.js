import {createPhotoArray} from './data.js';

//Шаблон фотографии
const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Блок для отрисовки
const drawingContainer = document.querySelector('.pictures');


//Создаем массив случайных фото с описанием от пользователей
const randomUserPhotos = createPhotoArray();


// Заполнение новых элементов DOM случайными данными из массива
//@photos {array} - массив фотографий с описаниями
//return {DOM fragment} - заполненный фрагмент для отрисовки
const drawPhotos = (photos) =>{
//Фрагмент для вставки в блок
  const insertFragment = document.createDocumentFragment();

  photos.forEach((photo)=>{
    const newPhoto = templatePicture.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photo.url;
    newPhoto.querySelector('.picture__img').alt = photo.description;
    newPhoto.querySelector('.picture__likes').textContent = photo.likes;
    newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    insertFragment.append(newPhoto);
  });
  //Вставка фрагмента для отрисовки
  return insertFragment;
};


drawingContainer.append(drawPhotos(randomUserPhotos));
