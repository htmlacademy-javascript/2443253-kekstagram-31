/* eslint-disable no-empty */
import {isEscapeKey,strDeleteLastSym} from './utils.js';

//Константы для наложения эффектов на изображения (CSS стили)
const GRAYSCALE = 'grayscale';
const SEPIA = 'sepia';
const INVERT = 'invert';
const BLUR = 'blur';
const BRIGHTNESS = 'brightness';
//--------------------------------------------------------------Переменные валидации-----------------------------------------------
//Форма для валидации
const formEdit = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
//Строка с хэштэгами
const textHashtags = document.querySelector('.text__hashtags');
//Поле с комментарием
const comment = document.querySelector('.text__description');

//Регулярные выражения для проверки хэштега
const regularHT = /^[a-zа-яё0-9]+$/i;

//Объект с формой
const newImageLoad = document.querySelector('.img-upload__input');

//Кнопка Submit
const submit = document.querySelector('.img-upload__submit');


//Кнопка закрытия нового изображения
const newPictureClose = formEdit.querySelector('.img-upload__cancel');


//Превью изображения
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

// --------------------------------------------------------------Переменные для масштаба------------------------------------------------
const buttonImgSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const buttonImgBigger = document.querySelector('.scale__control--bigger');


// --------------------------------------------------------------Переменные для наложения эффектов------------------------------------------------
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
let chrome = 0,
  sepia = 0,
  marvin = 0,
  phobos = 0,
  heat = 1,
  selectedEffect = '';

//Радиокнопки эффектов
const effects = document.querySelectorAll('input[name="effect"]');


//--------------------------------------------------------------Описания функций для валидации---------------------------
//Создание объекта валидации
const pristine = new Pristine(formEdit,{
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});


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
  if (value !== ''){
    let arrayHeshTags = value.split(' ');
    arrayHeshTags = arrayHeshTags.filter((hashTag) => hashTag.trim() !== '');
    check = arrayHeshTags.isUnique();
  }
  return check;
};

//Проверка длины комментария
const validateLengthComment = (value) => value.length <= 140;


//Вылидатор на хэшТэг по решетке и длине
pristine.addValidator(textHashtags,validateLengthHT,'Первый символ - #, за ним от 1 до 19 символов');
//Проверка отсутствия спецсимволов в хэш тэгах
pristine.addValidator(textHashtags,validateSymbolsHT,'Хэштэг должен состоять из букв и чисел и не может содержать пробелы и спецсимволы');
//Не более 5-ти хэштэгов
pristine.addValidator(textHashtags,validate5HT,'Не более 5-ти хэштэгов');
//Повторение хэштэгов
pristine.addValidator(textHashtags,validateDubHT,'Хэштэги повторяются');

//Длина комментария
pristine.addValidator(comment,validateLengthComment,'Длина комментария не должна превышать 140 символов');

//Валидация формы
formEdit.addEventListener('submit', (evt) => {


  const isValid = pristine.validate();

  if (isValid) {
  //   отправить форму
  } else {
    //   не отправлять форму
    evt.preventDefault();

  }
});

//Функция для события нажатия на клавишу Esc
const onDocumentKeydown2 = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeNewPicture();
  }
};

//Экспортируемая функция для инициализации события при выборе файла изображения
const newImgLoad = () =>{
  //Событие файл с изображением выбран - покажем форму редактирования
  newImageLoad.addEventListener('change',()=>{
    openNewPicture();
  });
};
//Событие по клику на закрытие
newPictureClose.addEventListener('click',()=>{
  closeNewPicture();
});


//Функция - что делаем при открытии нового изображения
function openNewPicture() {
  //Покажем форму
  formOverlay.classList.remove('hidden');

  //Изначально слайдер невидим
  effectLevelSlider.classList.add('hidden');
  //Сразу навесим закрытие по Esc
  document.addEventListener('keydown', onDocumentKeydown2);

  //заблокируем скролл контейнера
  document.querySelector('body').classList.add('modal-open');

  //Отмена закрытия форм по esc при фокусе на полях: хештэг и комментарий
  textHashtags.addEventListener('keydown', (evt) => evt.stopPropagation());
  comment.addEventListener('keydown', (evt) => evt.stopPropagation());


}

//Функция - что делаем при закрытии большого изображения
function closeNewPicture() {
  //Скроем форму
  formOverlay.classList.add('hidden');
  //Очистим события по документу
  document.removeEventListener('keydown',onDocumentKeydown2);
  //Вернем скролл контейнера
  document.querySelector('body').classList.remove('modal-open');
}

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Масштаб
// -------------------------------------------------------------------------------------------------------------------------------------------------
const refreshPreview = (currentValue) =>{

  scaleValue.value = `${currentValue}%`;

  imgPreview.style.cssText = `transform: scale(${currentValue / 100})`;

};

buttonImgSmaller.addEventListener('click',()=>{
  let currentValue = +strDeleteLastSym(scaleValue.value);
  currentValue = currentValue >= 50 ? currentValue - 25 : currentValue;
  refreshPreview(currentValue);

});

buttonImgBigger.addEventListener('click',()=>{
  let currentValue = +strDeleteLastSym(scaleValue.value);
  currentValue = currentValue <= 75 ? currentValue + 25 : currentValue;
  refreshPreview(currentValue);

});

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Наложения эффектов
// -------------------------------------------------------------------------------------------------------------------------------------------------
//Создадим слайдер с параметрами по умолчанию
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step:0.1,
  connect: 'lower'
});


//Обновить значение и эффект картинки при смене слайдера
const updateLevelValueImgStyle = (value,effect,unit = '') =>{
  effectLevelSlider.classList.remove('hidden');
  effectLevelValue.value = effect;
  effectLevelSlider.noUiSlider.set(value);
  imgPreview.style.filter = `${effect}(${effectLevelValue.value}${unit})`;
};

//update слайдера для Sepia и Chrome одинаковый
const updateSliderChromeSepia = (value = 0,minValue = 0,maxValue = 1,stepValue = 0.1) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: minValue,
      max: maxValue,
    },
    start: value,
    step:stepValue,
    connect: 'lower'
  });
};


//Слушатели на радиокнопки эффектов
effects.forEach((effect) => {
  effect.addEventListener('click', () => {
    if (effect.checked){
      // выберем эффект, переключим slider и наложим эффект c текущим значением соотв. слайдера
      switch (effect.id){
        case 'effect-none':
          effectLevelSlider.classList.add('hidden');
          imgPreview.style.cssText = 'filter: none'; break;
        case 'effect-chrome':
          selectedEffect = GRAYSCALE;
          updateSliderChromeSepia(chrome,0,1,0.1);
          updateLevelValueImgStyle(chrome,selectedEffect);
          break;
        case 'effect-sepia':
          selectedEffect = SEPIA;
          updateSliderChromeSepia(sepia,0,1,0.1);
          updateLevelValueImgStyle(sepia,selectedEffect);
          break;
        case 'effect-marvin':
          selectedEffect = INVERT;
          updateSliderChromeSepia(marvin,0,100,1);
          updateLevelValueImgStyle(marvin,selectedEffect,'%');
          break;
        case 'effect-phobos':
          selectedEffect = BLUR;
          updateSliderChromeSepia(phobos,0,3,0.1);
          updateLevelValueImgStyle(phobos,selectedEffect,'px');
          break;
        case 'effect-heat':
          selectedEffect = BRIGHTNESS;
          updateSliderChromeSepia(heat,1,3,0.1);
          updateLevelValueImgStyle(heat,selectedEffect);
          break;

      }
    }
  });
});

//Событие на изменение положения слайдера
effectLevelSlider.noUiSlider.on('update', () => {
  let unit = '';
  effectLevelValue.value = effectLevelSlider.noUiSlider.get();

  //обновим текущее значение фильтра
  switch (selectedEffect){
    case GRAYSCALE: chrome = +effectLevelValue.value;break;
    case SEPIA: sepia = +effectLevelValue.value;break;
    case INVERT: marvin = +effectLevelValue.value; unit = '%';break;
    case BLUR: phobos = +effectLevelValue.value; unit = 'px';break;
    case BRIGHTNESS: heat = +effectLevelValue.value;break;

  }
  //отрисуем
  imgPreview.style.filter = `${selectedEffect}(${effectLevelValue.value}${unit})`;
});

export {newImgLoad};
