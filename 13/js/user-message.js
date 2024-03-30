//--------------------------------------------------------------------
//В данном модуле реализована работа с сообщениями
//об ошибках загрузки и отправки данных на сервер
//--------------------------------------------------------------------


import {onDocumentKeydown} from './utils.js';
let messageBlock;

//Блок ошибки загрузки фото от других пользователей
const templateErrorGet = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

//Блок успешной   отправка данных
const templateSuccessPost = document.querySelector('#success')
  .content
  .querySelector('.success');
//Блок ошибки при отправке данных
const templateErrorPost = document.querySelector('#error')
  .content
  .querySelector('.error');

//Показать сообщение об ошибке загрузки
const showGetError = () =>{
  const error = templateErrorGet.cloneNode(true);
  document.body.appendChild(error);
  setTimeout(() => {
    document.body.removeChild(error);
  }, 5000);
};

const closePostResult = () => {
  document.body.removeChild(messageBlock);
  document.removeEventListener('keydown', onDocumentKeydown(closePostResult));

};
//Показать сообщение при успешной отправке или ошибке отправки
const showPostResult = (state) =>{

  switch (state){
    case 'success': messageBlock = templateSuccessPost.cloneNode(true); break;
    case 'error': messageBlock = templateErrorPost.cloneNode(true); break;
  }
  document.body.appendChild(messageBlock);
  //Сразу навесим закрытие по Esc и кнопке
  document.addEventListener('keydown', onDocumentKeydown(closePostResult));
  //messageBlock.addEventListener('keydown', (evt) => evt.stopPropagation());
  //Клик на кнопке
  messageBlock.querySelector('div').querySelector('button').addEventListener('click',() =>
    document.body.removeChild(messageBlock));

  //Клик вне окна
  document.addEventListener('click', (evt)=>{
    if (!messageBlock.querySelector('div').classList.contains(evt.target.className)){
      closePostResult();
    }

  });
};


export {showGetError,showPostResult};


