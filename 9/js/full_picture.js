import {isEscapeKey} from './utils.js';


//количество добавляемых комментариев
const ADDED_COMMENTS = 5;

//Большое изображение
const bigPicture = document.querySelector('.big-picture');
//Кнопка закрытия большго изображения
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
const refreshShownCount = (totalComments,shownComments) =>{
  socialShownCountComm.textContent = totalComments <= shownComments ? totalComments : shownComments;

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
  socialShownCountComm.textContent = 0;
}

//Функция - добавление комментариев в блок bigPictureSocial большого изображения
//@image {DOM объект} - аватарка с описанием, лайками и комментариями
//countComments {integer} - количество отображаемых комментариев
//photoComments - {array} массив комментариев (объектов) для фотографии, которую рисуем на большом изображении

const insertSocialComments = (photoComments, countComments) =>{
  //Удалим комментарии из контейнера
  bigPictureSocial.replaceChildren();

  //Заполняем новыми комментариями в цикле
  photoComments.slice(0,countComments).forEach((photoComment) => {
    //Склонируем пример из шаблона
    const newSocialComment = templateSocialComment.cloneNode(true);
    newSocialComment.querySelector('img').src = photoComment.avatar;
    newSocialComment.querySelector('img').alt = photoComment.name;
    newSocialComment.querySelector('.social__text').textContent = photoComment.message;
    bigPictureSocial.append(newSocialComment);
  });


};


//Функция - что делаем при открытии большого изображения
function OpenBigPicture(photo,shownComments) {
  bigPicture.classList.remove('hidden');

  //Сразу навесим закрытие по Esc
  document.addEventListener('keydown', onDocumentKeydown);
  //И событие по клику на закрытие
  bigPictureCancel.addEventListener('click',()=>{
    closeBigPicture();
  });

  //И событие по клику на загрузку дополинтельных комментариев
  socialCommLoader.addEventListener('click',()=>{
    shownComments = shownComments + ADDED_COMMENTS;

    //if (shownComments >= photo.comments.length){
    //      shownComments = photo.comments.length;
    //}
    refreshShownCount(photo.comments.length,shownComments);
    insertSocialComments(photo.comments,shownComments);

  });
}


//Функция - Составим и отрисуем большое изображение по аватарке из события
//@image {DOM объект} - аватарка с описанием, лайками и комментариями
//photo - {объект} одна фотография из массива фотографий с описаниями

const drawFullPicture = (photo)=>{

  //if (image.matches('.picture')){
  //Общее количество комментариев

  //Заполним блок большого изображения
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  //Количество отображемых комментариев
  socialShownCountComm.textContent = ADDED_COMMENTS;

  //Обновим счетчик комментариев
  refreshShownCount(photo.comments.length,ADDED_COMMENTS);


  //Вставим комментарии
  insertSocialComments(photo.comments,ADDED_COMMENTS);
  //Отрисуем большое изображение
  OpenBigPicture(photo,ADDED_COMMENTS);
  //  }

};

export {drawFullPicture};


