import {createPhotoArray} from './data.js';

//Шаблон фото
const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Массив случайных фото с описанием от пользователей
const randomUserPhotos = createPhotoArray();
//Блок для отрисовки
const drawContainer = document.querySelector('.pictures');
//Фрагмент для вставки в блок
const insertFragment = document.createDocumentFragment();

// Заполнение новых элементов DOM случайными данными из массива
randomUserPhotos.forEach((photo)=>{
  const newPhoto = templatePicture.cloneNode(true);
  newPhoto.querySelector('.picture__img').src = photo.url;
  newPhoto.querySelector('.picture__img').alt = photo.description;
  newPhoto.querySelector('.picture__likes').textContent = photo.likes;
  newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
  insertFragment.append(newPhoto);
});
//Вставка фрагмента для отрисовки
drawContainer.append(insertFragment);
