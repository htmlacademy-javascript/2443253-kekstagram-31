import {drawFullPicture} from './full_picture.js';
import {randomizePhotos,sortPhotos} from './filter_picture.js';
import {debounce} from './utils.js';

const RERENDER_DELAY = 500;

//Блок фильтрации imgFiltersForm
const filterBlock = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');

//Кнопка фильтрации  - случайные
const randomFilter = document.querySelector('#filter-random');
const defaultFilter = document.querySelector('#filter-default');
const sortFilter = document.querySelector('#filter-discussed');

//Блок для отрисовки
const drawingContainer = document.querySelector('.pictures');


//Шаблон фотографии
const templatePicture = document.querySelector('#picture')
  .content
  .querySelector('.picture');


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
  return insertFragment;
};

const reDrawPhotos = (photos) => drawingContainer.append(drawPhotos(photos));

//Очистить аватарки с главной страницы
const clearPhotosContainer = () => {
  const oldPhotos = drawingContainer.querySelectorAll('.picture');
  oldPhotos.forEach((photo)=>drawingContainer.removeChild(photo));
};

//Дезактивировать фильтры
const inactivateFilters = (filters) => {
  filters.forEach((filter) => filter.classList.remove('img-filters__button--active'));
};

//Установка событий на выбор фильтра
const setFilter = (cb,filterElement) => {

  filterElement.addEventListener('click', () => {
    inactivateFilters([defaultFilter,randomFilter,sortFilter]);
    clearPhotosContainer();
    filterElement.classList.add('img-filters__button--active');
    cb();
  });

};

//Установка событий для элементов фильтрации
const setFilters = (photos) =>{

  setFilter(debounce(() => reDrawPhotos(photos),RERENDER_DELAY),defaultFilter);
  setFilter(debounce(() => reDrawPhotos(randomizePhotos(photos)),RERENDER_DELAY),randomFilter);
  setFilter(debounce(() => reDrawPhotos(sortPhotos(photos)),RERENDER_DELAY),sortFilter);
};

//Отрисовка большого изображения по событию клика
const loadUserImg = (photos) =>{

  //Покажем блок фильтрации
  imgFiltersForm.classList.remove('visually-hidden');
  filterBlock.classList.remove('img-filters--inactive');
  //Отрисуем аватарки
  drawingContainer.append(drawPhotos(photos));
  setFilters(photos);

  //Навесим события на веcь контейнер с аватарками
  drawingContainer.addEventListener('click',(evt) =>{
  //Навесим события по фильтрации

    drawFullPicture(evt,photos);

    //Уберем скролл контейнера позади открывшейся картинки
    document.querySelector('body').classList.add('modal-open');


  });
};

export{loadUserImg};
