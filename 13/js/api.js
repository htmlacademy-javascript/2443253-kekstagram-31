//---------------------------------------------------------------------------------------------
//В данном модуле реализована отправка и получение данных с сервера
//---------------------------------------------------------------------------------------------
const GET_DATA_SOURCE = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const SEND_DATA_SOURCE = 'https://31.javascript.htmlacademy.pro/kekstagram';
//Максимальное количество загружаемых фото
const PHOTOS_MAX_COUNT = 25;

//Получение данных
const getData = (onSuccess,onFail) =>
  fetch(GET_DATA_SOURCE)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos.slice(0,PHOTOS_MAX_COUNT));
    })
    .catch(() => onFail());

//Отправка данных
const sendData = (onSuccess,onFail,body) =>
  fetch(
    SEND_DATA_SOURCE,
    {
      method: 'POST',
      body: body,
    },
  ).then((state) => {
    if (state.ok){
      onSuccess(true);
    } else{
      throw new Error('Неверные данные');
    }
  }
  )
    .catch(() => onFail('error'));

export{getData,sendData};


