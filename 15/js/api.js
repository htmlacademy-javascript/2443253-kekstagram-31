const GET_DATA_SOURCE = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const SEND_DATA_SOURCE = 'https://31.javascript.htmlacademy.pro/kekstagram';

//Получение данных

const getData = () =>
  fetch(GET_DATA_SOURCE)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json());


//Отправка данных
const sendData = (body) =>
  fetch(
    SEND_DATA_SOURCE,
    {
      method: 'POST',
      body: body,
    },
  );

export{getData,sendData};


