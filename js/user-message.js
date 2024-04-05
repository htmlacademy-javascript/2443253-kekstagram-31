import {onDocumentKeydown} from './utils.js';

//Блок фильтрации
const filterBlock = document.querySelector('.img-filters');
const imgFiltersForm = document.querySelector('.img-filters__form');
let messageBlock;


//Блок ошибки загрузки фото от других пользователей
const templateErrorGet = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

//Блок успешной отправки данных
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


  //Скроем блок фильтрации
  filterBlock.classList.add('img-filters--inactive');
  imgFiltersForm.classList.add('visually-hidden');

  document.body.append(error);
  setTimeout(() => {
    error.remove();
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
  //Сразу навесим закрытие по Esc
  document.addEventListener('keydown', messageHandler);

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


