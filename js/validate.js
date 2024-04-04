//-----------------------------------------------------------------------------------------
//В данном модуле реализована работа с объектом Pristine для валидации полей формы
//Включает создание самого объекта и добавление функций проверки
//-----------------------------------------------------------------------------------------


//Кнопка Submit
const submit = document.querySelector('.img-upload__submit');

//Строка с хэштэгами - проверяемое значение
const textHashtags = document.querySelector('.text__hashtags');
//Поле с комментарием - проверяемое значение
const comment = document.querySelector('.text__description');

//Регулярные выражения для проверки хэштега
const regularHT = /^[a-zа-яё0-9]+$/i;


//--------------------------------------------------------------Описания функций для валидации---------------------------

//Проверка длины хэш тэгов и решетки
const validateLengthHT = (value) =>{
  let check = false;
  if (value !== ''){
    const arrayHeshTags = value.split(' ');
    check = arrayHeshTags.some((heshTag) => {
      if (heshTag === ''){
        return false;
      }else{
        return !(heshTag[0] === '#' && heshTag.length > 1 && heshTag.length <= 20);
      }

    });
  }
  return !check;
};

//Проверка отсутствия спецсимволов в хэш тэгах
const validateSymbolsHT = (value) =>{
  let check = false;
  if (value !== ''){
    const arrayHeshTags = value.split(' ');
    check = arrayHeshTags.some((heshTag) => {
      heshTag.trim();
      if ((heshTag === '#') || (heshTag === '')){
        return false;
      } else if (heshTag.length === 1){
        return !regularHT.test(heshTag.substring(0));
      } else {
        return !regularHT.test(heshTag.substring(1));
      }
    });
  }
  submit.disabled = check;
  return !check;
};

//Не более 5-ти хэштэгов
const validate5HT = (value) =>{
  let check = true;
  if (value !== ''){
    let arrayHeshTags = value.split(' ');
    arrayHeshTags = arrayHeshTags.filter((hashTag) => hashTag.trim() !== '');
    check = !(arrayHeshTags.length > 5);
  }
  return check;
};

//Проверка повторения хэштэгов
const validateDubHT = (value) =>{
  let check = true;
  value = value.toLowerCase();
  if (value !== ''){
    let arrayHeshTags = value.split(' ');
    arrayHeshTags = arrayHeshTags.filter((hashTag) => hashTag.trim() !== '');
    check = arrayHeshTags.isUnique();
  }
  return check;
};

//Проверка длины комментария
const validateLengthComment = (value) => value.length <= 140;
//----------------------------------------------------------------------------------------------------------

//Функция createPristine создает объект Pristine и добавляет функции проверок
//@validateForm  - объект <form>
//@return (объект Pristine)
const createPristine = (validateForm) => {
  const newPristine = new Pristine(validateForm,{
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error',
  });

  //Добавление проверок при вводе
  //Вылидатор на хэшТэг по решетке и длине
  newPristine.addValidator(textHashtags,validateLengthHT,'Первый символ - #, за ним от 1 до 19 символов');
  //Проверка отсутствия спецсимволов в хэш тэгах
  newPristine.addValidator(textHashtags,validateSymbolsHT,'Хэштэг должен состоять из букв и чисел и не может содержать пробелы и спецсимволы');
  //Не более 5-ти хэштэгов
  newPristine.addValidator(textHashtags,validate5HT,'Не более 5-ти хэштэгов');
  //Повторение хэштэгов
  newPristine.addValidator(textHashtags,validateDubHT,'Хэштэги повторяются');

  //Длина комментария
  newPristine.addValidator(comment,validateLengthComment,'Длина комментария не должна превышать 140 символов');

  //Отмена закрытия форм по esc при фокусе на полях: хештэг и комментарий
  textHashtags.addEventListener('keydown', (evt) => evt.stopPropagation());
  comment.addEventListener('keydown', (evt) => evt.stopPropagation());

  return newPristine;
};

//Очистка проверяемых полей
const clearPristine = () =>{
  textHashtags.value = '';
  comment.value = '';
};

export {createPristine, clearPristine};
