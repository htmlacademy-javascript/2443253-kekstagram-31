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
  document.body.append(error);
  setTimeout(() => {
    document.body.error.remove();
  }, 5000);
};

const messageHandler = onDocumentKeydown(closePostResult);

function closePostResult(){
  messageBlock.remove();
  document.body.removeEventListener('keydown', messageHandler);

}


//Показать сообщение при успешной отправке или ошибке отправки
const showPostResult = (state) =>{

  switch (state){
    case 'success': messageBlock = templateSuccessPost.cloneNode(true); break;
    case 'error': messageBlock = templateErrorPost.cloneNode(true); break;
  }
  document.body.append(messageBlock);
  //Сразу навесим закрытие по Esc и кнопке
  document.addEventListener('keydown', messageHandler);
  //window.addEventListener('keydown', (evt) => evt.stopPropagation());
  //Клик на кнопке
  messageBlock.querySelector('div').querySelector('button').addEventListener('click',() =>
    messageBlock.remove());

  //Клик вне окна
  document.addEventListener('click', (evt)=>{
    if ((evt.target.className === 'success') || (evt.target.className === 'error')) {
      closePostResult();
    }

  });
};


export {showGetError,showPostResult};


