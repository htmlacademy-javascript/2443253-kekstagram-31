//-----------------------------------------------------------------------------------------
//В данном модуле осуществляется работа с формой при открытии нового изображения
//Открытие формы, масштабирование изображения, эффекты, проверка и закрытие формы
//-----------------------------------------------------------------------------------------
import {onDocumentKeydown,strDeleteLastSym} from './utils.js';
import {showPostResult} from './user-message.js';
import {createPristine,clearPristine} from './validate.js';
import {sendData} from './api.js';

//import noUiSlider from '../vendor/nouislider/nouislider.js';

//Константы для наложения эффектов на изображения (CSS стили)
const NONE = '';
const GRAYSCALE = 'grayscale';
const SEPIA = 'sepia';
const INVERT = 'invert';
const BLUR = 'blur';
const BRIGHTNESS = 'brightness';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

//Форма
const formEdit = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
//Кнопка отправки
const submitButton = document.querySelector('.img-upload__submit');

//Переменная для валидации
let pristine;

//Объект с формой
const newImageLoad = document.querySelector('.img-upload__input');

//Кнопка закрытия нового изображения
const newPictureClose = document.querySelector('.img-upload__cancel');


//Превью изображения
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');

// --------------------------------------------------------------Переменные для масштаба------------------------------------------------
const buttonImgSmaller = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const buttonImgBigger = document.querySelector('.scale__control--bigger');


// --------------------------------------------------------------Переменные для наложения эффектов------------------------------------------------
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
let chrome = 1,
  sepia = 1,
  marvin = 100,
  phobos = 3,
  heat = 3,
  selectedEffect = '';

//Радиокнопки эффектов
const effects = document.querySelectorAll('input[name="effect"]');


const formHandler = onDocumentKeydown(closeNewPicture);

//Привести все данные формы в исходное состояние
const initFormData = (open = true) =>{
  chrome = 1;
  sepia = 1;
  marvin = 100;
  phobos = 3;
  heat = 3;

  selectedEffect = NONE;
  //масштаб картики
  scaleValue.value = '100%';
  refreshPreview(100);
  //имя картинки
  if (!open){
    newImageLoad.value = '';
  }
  effects[0].checked = true;
  switchEffect(effects[0]);
  clearPristine();
  pristine.validate();
};

//инициализации события при выборе файла изображения
//экспортируемая функция
const newImgLoad = () =>{
  //Событие файл с изображением выбран - покажем форму редактирования
  newImageLoad.addEventListener('change',()=>{
    openNewPicture(newImageLoad.value);
  });
};
//Событие по клику на закрытие
newPictureClose.addEventListener('click',()=>{
  closeNewPicture(false);
});


//Функция - что делаем при открытии нового изображения
//@imageLoaded - изображение выбрано
function openNewPicture(imageLoaded = true) {
  if(imageLoaded) {
    pristine = createPristine(formEdit);
    initFormData();
    //Покажем форму
    formOverlay.classList.remove('hidden');

    //Изначально слайдер невидим
    effectLevelSlider.classList.add('hidden');
    //Сразу навесим закрытие по Esc
    document.addEventListener('keydown', formHandler);

    //заблокируем скролл контейнера
    document.querySelector('body').classList.add('modal-open');
  }

}

//Функция - что делаем при закрытии большого изображения
//post - true изображение отправлено
function closeNewPicture(post = false) {
  //Скроем форму
  formOverlay.classList.add('hidden');
  //Очистим события по документу
  document.removeEventListener('keydown',formHandler);
  //Вернем скролл контейнера
  document.querySelector('body').classList.remove('modal-open');
  //Очистим данные формы
  if (post){
    //Покажем сообщение об успешной отправке
    showPostResult('success');
  }
  initFormData(true);

}

// -------------------------------------------------------------------------------------------------------------------------------------------------
// Масштаб
// -------------------------------------------------------------------------------------------------------------------------------------------------
function refreshPreview (currentValue) {

  scaleValue.value = `${currentValue}%`;

  imgPreview.style.cssText = `transform: scale(${currentValue / 100})`;

}

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

//Обновить параметры слайдера
const updateSlider = (value = 0,minValue = 0,maxValue = 1,stepValue = 0.1) => {
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

// выберем эффект, переключим slider и наложим эффект c текущим значением соотв. слайдера
function switchEffect (effect){
  switch (effect.id){
    case 'effect-none':
      effectLevelSlider.classList.add('hidden');
      selectedEffect = NONE;
      imgPreview.style.filter = 'none';
      break;
    case 'effect-chrome':
      selectedEffect = GRAYSCALE;
      updateSlider(chrome,0,1,0.1);
      updateLevelValueImgStyle(chrome,selectedEffect);
      break;
    case 'effect-sepia':
      selectedEffect = SEPIA;
      updateSlider(sepia,0,1,0.1);
      updateLevelValueImgStyle(sepia,selectedEffect);
      break;
    case 'effect-marvin':
      selectedEffect = INVERT;
      updateSlider(marvin,0,100,1);
      updateLevelValueImgStyle(marvin,selectedEffect,'%');
      break;
    case 'effect-phobos':
      selectedEffect = BLUR;
      updateSlider(phobos,0,3,0.1);
      updateLevelValueImgStyle(phobos,selectedEffect,'px');
      break;
    case 'effect-heat':
      selectedEffect = BRIGHTNESS;
      updateSlider(heat,1,3,0.1);
      updateLevelValueImgStyle(heat,selectedEffect);
      break;
  }
}
//Слушатели на радиокнопки эффектов
effects.forEach((effect) => {
  effect.addEventListener('click', () => {
    if (effect.checked){
      // выберем эффект, переключим slider и наложим эффект c текущим значением соотв. слайдера
      switchEffect(effect);

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
    default: break;
  }
  //отрисуем
  imgPreview.style.filter = `${selectedEffect}(${effectLevelValue.value}${unit})`;
});

//Блокируем кнопку отправить
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

//Разблокируем кнопку отправить
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};
//Проверка и отправка формы-----------------------------------------------------------------------------------------------------------------------
const setUserFormSubmit = () => {
  formEdit.addEventListener('submit', (evt) => {
    evt.preventDefault();


    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      //   Собрать данные и отправить форму
      const formData = new FormData(evt.target);
      sendData(closeNewPicture,showPostResult,formData)
        .finally(unblockSubmitButton);
    }
  });
};


export {newImgLoad,setUserFormSubmit,closeNewPicture};
