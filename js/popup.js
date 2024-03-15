import {createPhotoArray} from './data.js';

import {drawFullPicture} from './full_picture.js';

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

  photos.forEach((photo,index)=>{

    const newPhoto = templatePicture.cloneNode(true);
    newPhoto.querySelector('.picture__img').src = photo.url;
    newPhoto.querySelector('.picture__img').alt = photo.description;
    newPhoto.querySelector('.picture__likes').textContent = photo.likes;
    newPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    newPhoto.querySelector('.picture__img').setAttribute('data-id', index);

    insertFragment.append(newPhoto);

    // //Сразу навесим событие клика на аватарку
    // newPhoto.addEventListener('click',()=>{
    //   //Перенесем данные и покажем большое изображение
    //   drawFullPicture(photo);
    //   //Уберем скролл контейнера
    //   document.querySelector('body').classList.add('modal-open');
    // });

  });
  //Вставка фрагмента для отрисовки
  return insertFragment;
};
drawingContainer.append(drawPhotos(randomUserPhotos));

//События - попытка навесить события на контейнер с дальнейшей проверкой по matches
// Но в evt события клика передается только img, а не весь DOM объект фото

drawingContainer.addEventListener('click',(evt) =>{

  drawFullPicture(evt,randomUserPhotos);

  //Уберем скролл контейнера позади открывшейся картинки
  document.querySelector('body').classList.add('modal-open');


});
