//----------------------------------------------------------------------------------------
//В данном модуле реализована отрисовка аватарок пользовательских изображений
//на главной странице после загрузки пользовательских данных
//----------------------------------------------------------------------------------------


import {drawFullPicture} from './full_picture.js';

//Шаблон фотографии
const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Блок для отрисовки
const drawingContainer = document.querySelector('.pictures');


//Создаем массив случайных фото с описанием от пользователей
//const randomUserPhotos = createPhotoArray();


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

  });
  //Вставка фрагмента для отрисовки
  return insertFragment;
};


//Отрисовка большого изображения по событию клика
const userImgLoad = (photos) =>{
  //drawingContainer.append(drawPhotos(randomUserPhotos));
  drawingContainer.append(drawPhotos(photos));
  //Навесим события на веcь контейнер с аватарками
  drawingContainer.addEventListener('click',(evt) =>{

    drawFullPicture(evt,photos);

    //Уберем скролл контейнера позади открывшейся картинки
    document.querySelector('body').classList.add('modal-open');


  });
};

export{userImgLoad};
