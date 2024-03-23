//Ошибка загрузки фото от других пользователей
const templateErrorGet = document.querySelector('#data-error')
  .content
  .querySelector('.data-error');

//Успешная отправка данных
const templateSuccessPost = document.querySelector('#success')
  .content
  .querySelector('.success');
//Ошибка при отправке данных
const templateErrorPost = document.querySelector('#error')
  .content
  .querySelector('.error');

//Показать сообщение об ошибке или
const showErrorGet = () =>{
  const error = templateErrorGet.cloneNode(true);
  document.body.appendChild(error);
  setTimeout(() => {
    document.body.removeChild(error);
  }, 5000);
};

//Показать сообщение при успешной отпрвке
const showPost = (state) =>{

  switch (state){
    case 'success': state = templateSuccessPost.cloneNode(true); break;
    case 'error': state = templateErrorPost.cloneNode(true); break;
  }
  document.body.appendChild(state);
  state.querySelector('div').querySelector('button').addEventListener('click',() => document.body.removeChild(state));
};
export {showErrorGet,showPost};


