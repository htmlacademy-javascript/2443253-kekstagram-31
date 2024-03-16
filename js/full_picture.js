import {isEscapeKey} from './utils.js';


//количество добавляемых комментариев
const ADDED_COMMENTS = 5;
//количество показываемых комментариев
let shownComments = 0;
//Общее количество комментариев
let totalComments = 0;
//Сами комментарии
let photoComments = 0;

//Большое изображение
const bigPicture = document.querySelector('.big-picture');
//Кнопка закрытия большого изображения
const bigPictureCancel = document.querySelector('.big-picture__cancel');
//Контейнер комментарив под большим изображением
const bigPictureSocial = document.querySelector('.social__comments');
//новый комментарий
const socialComment = bigPictureSocial.querySelector('.social__comment');
//Склонируем из разметки в качестве шаблона
const templateSocialComment = socialComment.cloneNode(true);
const socialShownCountComm = bigPicture.querySelector('.social__comment-shown-count');
//кнопка загрузки дополнительных комментариев
const socialCommLoader = document.querySelector('.comments-loader');


//Функция для события нажатия на клавишу Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};


//Функция - обновим счетчик комментариев
const refreshShownCount = () =>{

  shownComments = totalComments <= (shownComments + ADDED_COMMENTS) ? totalComments : (shownComments + ADDED_COMMENTS);
  socialShownCountComm.textContent = shownComments;

  //Спрячем кнопку загрузки новых комментариев если общее кол-во меньше или равно показываемому
  if (shownComments >= totalComments){
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
  }

};

//Функция - что делаем при закрытии большого изображения
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  //Очистим события по документу
  document.removeEventListener('keydown',onDocumentKeydown);
  //Вернем скролл контейнера
  document.querySelector('body').classList.remove('modal-open');
  //Вернем кнопку загрузки новых комментариев
  bigPicture.querySelector('.comments-loader').classList.remove('hidden');
  shownComments = 0;
  totalComments = 0;
}

//Функция - добавление комментариев в блок bigPictureSocial большого изображения
//@image {DOM объект} - аватарка с описанием, лайками и комментариями
//countComments {integer} - количество отображаемых комментариев
//photoComments - {array} массив комментариев (объектов) для фотографии, которую рисуем на большом изображении

const insertSocialComments = () =>{
  //Удалим комментарии из контейнера
  bigPictureSocial.replaceChildren();

  //Заполняем новыми комментариями в цикле
  photoComments.slice(0,shownComments).forEach((photoComment) => {
    //Склонируем пример из шаблона
    const newSocialComment = templateSocialComment.cloneNode(true);
    newSocialComment.querySelector('img').src = photoComment.avatar;
    newSocialComment.querySelector('img').alt = photoComment.name;
    newSocialComment.querySelector('.social__text').textContent = photoComment.message;
    bigPictureSocial.append(newSocialComment);
  });


};


//Функция - что делаем при открытии большого изображения
function OpenBigPicture() {
  bigPicture.classList.remove('hidden');

  //Сразу навесим закрытие по Esc
  document.addEventListener('keydown', onDocumentKeydown);
  //И событие по клику на закрытие
  bigPictureCancel.addEventListener('click',()=>{
    closeBigPicture();
  });

}
//И событие по клику на загрузку дополинтельных комментариев
socialCommLoader.addEventListener('click',()=>{
  refreshShownCount();
  insertSocialComments();
});


//Функция - Составим и отрисуем большое изображение по аватарке из события
//@image {DOM объект} - аватарка с описанием, лайками и комментариями
//photo - {объект} одна фотография из массива фотографий с описаниями

const drawFullPicture = (evt,photos)=>{
  let photo;

  //Выберем нужный элемент в зависимости от того куда кликнул пользователь
  switch(evt.target.className){
    case 'picture__img': photo = evt.target; break;
    case 'picture__info': photo = evt.target.previousElementSibling; break;
    case 'picture__likes': photo = evt.target.closest('.picture__info').previousElementSibling; break;
    case 'picture__comments': photo = evt.target.closest('.picture__info').previousElementSibling; break;
    default: return null;
  }


  //Заполним блок большого изображения
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photos[+photo.dataset.id].url;
  bigPicture.querySelector('.likes-count').textContent = photos[+photo.dataset.id].likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = photos[+photo.dataset.id].comments.length;
  bigPicture.querySelector('.social__caption').textContent = photos[+photo.dataset.id].description;

  //Комментарии и их количество
  photoComments = photos[+photo.dataset.id].comments;
  totalComments = photos[+photo.dataset.id].comments.length;


  //Обновим счетчик комментариев
  refreshShownCount();


  //Вставим комментарии
  insertSocialComments();
  //Отрисуем большое изображение
  OpenBigPicture();
};

export {drawFullPicture};


